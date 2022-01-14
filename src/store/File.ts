import { observable } from "mobx";

export enum FILE_TYPE {
  IMAGE = 'img',
  TEXT = 'txt',
}

export interface IFile {
  id: number
  name: string
  type: FILE_TYPE
  content: string
}

export class File implements IFile {
  @observable id: number;
  @observable name: string;
  @observable content: string;
  type: FILE_TYPE;

  constructor(item: IFile) {
    this.id = item.id;
    this.name = item.name;
    this.content = item.content;
    this.type = item.type;
  }
}