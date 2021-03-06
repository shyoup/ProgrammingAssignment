import { boundMethod } from "autobind-decorator";
import * as monaco from 'monaco-editor';

export enum FILE_TYPE {
  IMAGE = 'img',
  TEXT = 'txt',
}

export interface IZipFolder {
  [key: string]: any
}

export interface IFolder {
  id: string;
  name: string;
  children: Array<IFolder | PFile | FileModel | PImage>;
}

export interface PFile {
  id: string;
  name: string;
  type: monaco.languages.ILanguageExtensionPoint[];
  content: string;
}

export interface PImage {
  id: string;
  name: string;
  type: string;
  content: Blob;
}

export interface IFile extends PFile{
  model: monaco.editor.IEditorModel;
}

export class FileModel implements IFile {
  id: string;
  name: string;
  content: string;
  type: monaco.languages.ILanguageExtensionPoint[];
  model: monaco.editor.ITextModel;

  constructor(item: PFile) {
    this.id = item.id;
    this.name = item.name;
    this.content = item.content;
    this.type = monaco.languages.getLanguages();
    this.model = monaco.editor.createModel(this.content, 'javascript');
  }

  @boundMethod
  public getModel(): monaco.editor.ITextModel {
    return this.model;
  }
}

export class ImageModel implements PImage {
  id: string;
  name: string;
  type: string;
  content: Blob;

  constructor(item: PImage) {
    this.id = item.id;
    this.name = item.name;
    this.content = item.content;
    this.type = item.type;
  }

  @boundMethod
  public getContent(): Blob {
    return this.content;
  }
}