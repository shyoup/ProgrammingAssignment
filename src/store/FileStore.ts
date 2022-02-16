import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';
import * as monaco from 'monaco-editor';
import { v4 as uuid } from 'uuid';
import { PFile, IFile, FileModel, IFolder, IZipFolder, PImage, FILE_TYPE, ImageModel } from "./File";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import React from "react";
import { STRING_RES } from 'common/string/StringResource';

export interface TreeInfo {
  id: string;
  name: string;
  children?: TreeInfo[];
}

class FileStore {
  @observable
  private files: Array<FileModel | ImageModel>;

  @observable
  private folders: IFolder[];

  @observable
  private folderList: IFolder[];

  @observable
  private openedFileType: FILE_TYPE;

  private originName: string;

  private editor: null | monaco.editor.IStandaloneCodeEditor;

  public constructor() {
    makeObservable(this);
    this.files = [];
    this.folders = [];
    this.folderList = [];
    this.editor = null;
    this.originName = '';
    this.openedFileType = FILE_TYPE.TEXT;
  }

  @action
  public setOpenedFileType(type: FILE_TYPE) {
    this.openedFileType = type;
  }

  @boundMethod
  public getOpenedFileType() {
    return this.openedFileType;
  }

  @action
  public dispose(): void {
    this.editor?.dispose();
  }

  @action
  public setEditor(el: monaco.editor.IStandaloneCodeEditor) {
    this.editor = el;
  }

  @action
  public setFileList(fileList: Array<FileModel | ImageModel>): void {
    this.files = fileList;
  }

  @boundMethod
  public getFilesList(): Array<FileModel | ImageModel> {
    return this.files;
  }

  @action
  public setFoldersList(folderList: IFolder[]): void {
    this.folders = folderList;
  }

  @boundMethod
  public getFoldersList(): IFolder[] | PImage[] {
    return this.folders;
  }

  @action
  public setJFoldersList(folderList: IFolder[]): void {
    this.folderList = folderList;
  }

  @boundMethod
  public getJFoldersList(): IFolder[] {
    return this.folderList;
  }

  public getFirstFile(): IFile | PImage {
    return this.files[0];
  }

  public getFileById(id: string): FileModel | ImageModel | null {
    const ret = [...this.files].find(file => file.id === id);
    if (ret) return ret;
    else return null;
  }

  public getFileNameById(id: string): string {
    const file = this.getFileById(id);
    const nameArr = file?.name.split('/');
    if (nameArr) return nameArr[nameArr.length -1];
    else return '';
  }

  @action
  public addFile(file: PFile): void {
    runInAction(() => {
      const newFile = new FileModel({
        id: file.id,
        name: file.name,
        type: file.type,
        content: file.content,
      });
      this.setFileList([...this.files, newFile]);
    });
  }

  @action
  public addImage(image: PImage): void {
    runInAction(() => {
      const newFile = new ImageModel({
        id: image.id,
        name: image.name,
        type: image.type,
        content: image.content,
      });
      this.setFileList([...this.files, newFile]);
    });
  }

  @action
  public addFolder(folder: IFolder): void {
    runInAction(() => {
      const newFolder: IFolder = {
        id: folder.id,
        name: folder.name,
        children: folder.children,
      };
      this.setFoldersList([...this.folders, newFolder]);
    });
  }

  @action
  public addFolderList(folder: IFolder): void {
    runInAction(() => {
      const newFolder: IFolder = {
        id: folder.id,
        name: folder.name,
        children: folder.children,
      };
      this.setJFoldersList([...this.folderList, newFolder]);
    });
  }

  @boundMethod
  public async onSubmit(file: File, event: React.FormEvent<HTMLFormElement>, callback?: (id: string) => void): Promise<void> {
    if (this.folderList.length > 0) {
      let ret = window.confirm(STRING_RES.ADD_FILE_EXCEPTION);
      if (ret) this.setFoldersList([]);
      else return;
    }
    event.preventDefault();
    this.originName = file.name;
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        const uid = uuid();
        const fileType = this.checkType(filename);
        if(zip.files[filename].dir) {
          const newFolder: IFolder = {
            id: uid,
            name: filename,
            children: [],
          }
          this.addFolderList(newFolder);
          const parentFolder = this.findParentFolder(filename);
          runInAction(() => {
            if (parentFolder) parentFolder.children.push(newFolder);
            else this.addFolder(newFolder);
          })
        } else if(fileType === FILE_TYPE.IMAGE) {
          zip.files[filename].async('arraybuffer').then((fileData) => {
            var buffer = new Uint8Array(fileData);
            var blob = new Blob([buffer.buffer]);
            const newFile: PImage = {
              id: uid,
              name: filename,
              type: fileType,
              content: blob,
            }
            const parentFolder = this.findParentFolder(filename);
            runInAction(() => {
              parentFolder?.children.push(newFile);
              this.addImage(newFile);
              if (callback) callback(newFile.id);
            });
          })
        } else {
          zip.files[filename].async('string').then((fileData) => {
            const newFile: PFile = {
              id: uid,
              name: filename,
              type: fileType,
              content: fileData,
            }
            const parentFolder = this.findParentFolder(filename);
            runInAction(() => {
              parentFolder?.children.push(newFile);
              this.addFile(newFile);
              if (callback) callback(newFile.id);
            });
          })
        }
      })
    })
  };

  @boundMethod
  public openFile(id: string): void {  // side click
    const file = this.getFileById(id);
    if (file) {
      if (file instanceof FileModel) {
        this.setOpenedFileType(FILE_TYPE.TEXT);
        const model = file.getModel();
        this.editor?.setModel(model);
        document.getElementsByClassName("Editor")[0].classList.remove("hide");
      } else {
        this.setOpenedFileType(FILE_TYPE.IMAGE);
        document.getElementsByClassName("Editor")[0].classList.add("hide");
      }
    }
  }

  @boundMethod
  public saveFile(id: string): void {
    const file = this.getFileById(id);
    if (file) {
      if (file instanceof FileModel) {
        if (this.editor) file.content = this.editor.getValue();
      }
    }
  }

  @boundMethod
  public closeFile(): void {
    if (this.openedFileType === FILE_TYPE.IMAGE) document.getElementsByClassName("Editor")[0].classList.remove("hide");
    else document.getElementsByClassName("Editor")[0].classList.add("hide");

    const model = monaco.editor.createModel('', 'javascript');
    this.editor?.setModel(model);
  }

  checkType(filename: string): FILE_TYPE {
    const ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    const filter = ['jpg', 'png', 'gif', 'ps', 'jpeg'];
    if (filter.includes(ext)) return FILE_TYPE.IMAGE;
    return FILE_TYPE.TEXT;
  }

  findParentFolder(filename: string): null | IFolder {
    const firstSlash = filename.indexOf('/') + 1;
    const temp = filename.substring(0, firstSlash);
    const next = filename.substring(firstSlash);
    const ret = [...this.folders].find(folder => folder.name === temp);
    if ((temp.match(/\//g) || []).length < 2) return ret ? ret : null;
    return this.findParentFolder(next);
  }

  @boundMethod
  public downloadZipFile(): void {
    const zip = new JSZip();
    let folderObj: IZipFolder = {};
    if (this.folderList.length === 0) {
      alert(STRING_RES.DOWNLOAD_EXCEPTION);
      return;
    }
    this.folderList.map(folder => {
      folderObj[folder.name] = zip.folder(folder.name);
    })
    this.files.map(file => {
      const foldername = file.name.substring(0, file.name.lastIndexOf('/')+1);
      const filename = file.name.substring(file.name.lastIndexOf('/')+1);
      folderObj[foldername].file(filename, file.content);
    })
    const origin = this.originName;
    zip.generateAsync({type: 'blob'}).then(function(content) {
        saveAs(content, origin);
    });
  }
}

export default FileStore;