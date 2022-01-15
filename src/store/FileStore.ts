import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';
import * as monaco from 'monaco-editor';
import { v4 as uuid } from 'uuid';
import { PFile, IFile, FileModel, FILE_TYPE, IFolder, IZipFolder } from "./File";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import React from "react";

export interface TreeInfo {
  id: string;
  name: string;
  children?: TreeInfo[];
}

class FileStore {
  @observable
  private files: FileModel[];

  @observable
  private folders: IFolder[];

  @observable
  private folderList: IFolder[];

  private originName: string;

  private editor: null | monaco.editor.IStandaloneCodeEditor;

  public constructor() {
    makeObservable(this);
    this.files = [];
    this.folders = [];
    this.folderList = [];
    this.editor = null;
    this.originName = '';
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
  public setFileList(fileList: FileModel[]): void {
    this.files = fileList;
  }

  @boundMethod
  public getFilesList(): IFile[] {
    return this.files;
  }

  @action
  public setFoldersList(folderList: IFolder[]): void {
    this.folders = folderList;
  }

  @boundMethod
  public getFoldersList(): IFolder[] {
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

  public getFirstFile(): IFile {
    return this.files[0];
  }

  public getFileById(id: string): FileModel | null {
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
    event.preventDefault();
    this.originName = file.name;
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        const uid = uuid();
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
        } else {
          zip.files[filename].async('string').then((fileData) => {
            const newFile: PFile = {
              id: uid,
              name: filename,
              type: this.checkType(filename),
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
    const model = this.getFileById(id)?.getModel();
    if (model) this.editor?.setModel(model);
  }

  @boundMethod
  public closeFile(): void {
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