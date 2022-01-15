import { boundMethod } from "autobind-decorator";
import { observable } from "mobx";
import * as monaco from 'monaco-editor';

export enum FILE_TYPE {
  IMAGE = 'img',
  TEXT = 'txt',
}

export interface PFile {
  name: string
  type: FILE_TYPE
  content: string
}

export interface IFile extends PFile{
  id: string
  model: monaco.editor.IEditorModel | null;
}

export class FileModel implements IFile {
  @observable id: string;
  @observable name: string;
  @observable content: string;
  type: FILE_TYPE;
  model: monaco.editor.ITextModel | null;

  constructor(item: IFile) {
    this.id = item.id;
    this.name = item.name;
    this.content = item.content;
    this.type = item.type;
    this.model = monaco.editor.createModel(this.content, 'html');
  }

  @boundMethod
  public getModel(): monaco.editor.ITextModel | null {
    return this.model;
  }
}