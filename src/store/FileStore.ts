import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';
import * as monaco from 'monaco-editor';
import { v4 as uuid } from 'uuid';
import { PFile, IFile, FileModel, FILE_TYPE } from "./File";
import JSZip from 'jszip';
import React from "react";

class FileStore {
  @observable
  private files: FileModel[];

  private editor: null | monaco.editor.IStandaloneCodeEditor;

  public constructor() {
    makeObservable(this);
    this.files = [];
    this.editor = null;
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
    if (file) return file.name;
    else return '';
  }

  @action
  public createFile(file: PFile): void {
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

  @boundMethod
  public async onSubmit(file: File, event: React.FormEvent<HTMLFormElement>, callback?: (id: string) => void): Promise<void> {
    event.preventDefault();
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        zip.files[filename].async('string').then((fileData) => {
          const newFile: PFile = {
            id: uuid(),
            name: filename,
            type: FILE_TYPE.TEXT,
            content: fileData,
          }
          runInAction(() => {
            this.createFile(newFile);
            if (callback) callback(newFile.id);
          });
        })
      })
    })
  };

  @boundMethod
  public openFile(id: string): void {  // side click
    const model = this.getFileById(id)?.getModel();
    if (model) this.editor?.setModel(model);
  }
}

export default FileStore;