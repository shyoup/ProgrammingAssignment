import { boundMethod } from "autobind-decorator";
import { observable } from "mobx";
import * as monaco from 'monaco-editor';

export enum FILE_TYPE {
  IMAGE = 'img',
  TEXT = 'txt',
}

export interface PFile {
  id: string
  name: string
  type: FILE_TYPE
  content: string
}

export interface IFile extends PFile{
  model: monaco.editor.IEditorModel;
}

export class FileModel implements IFile {
  @observable id: string;
  @observable name: string;
  @observable content: string;
  type: FILE_TYPE;
  model: monaco.editor.ITextModel;

  constructor(item: PFile) {
    this.id = item.id;
    this.name = item.name;
    this.content = item.content;
    this.type = item.type;
    this.model = monaco.editor.createModel(this.content, 'html');
  }

  @boundMethod
  public getModel(): monaco.editor.ITextModel {
    return this.model;
  }
}