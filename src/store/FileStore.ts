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

  public getFileById(id: string): monaco.editor.ITextModel | null {
    return [...this.files].find(file => file.id === id);
  }

  @action
  public createFile(file: PFile): void {
    runInAction(() => {
      const newFile = new FileModel({
        id: uuid(),
        name: file.name,
        type: file.type,
        content: file.content,
        model: null,
      });
      this.setFileList([...this.files, newFile]);
    });
  }

  @boundMethod
  public onSubmit(file: File, event: React.FormEvent<HTMLFormElement>): React.FormEvent<HTMLFormElement> {
    event.preventDefault();
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        zip.files[filename].async('string').then((fileData) => {
          const newFile: PFile = {
            name: filename,
            type: FILE_TYPE.TEXT,
            content: fileData,
          }
          runInAction(() => {
            this.createFile(newFile);
          });
        })
      })
    })
    return event;
  };

  @boundMethod
  public changeFile(id: string): void {
    if(!this.getFileById(id)) return;
    else {
      this.editor?.setModel(this.getFileById(id).getModel());
    }
  }
}

export default FileStore;