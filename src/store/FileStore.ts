import { action, observable } from "mobx";
import { v4 as uuid } from 'uuid';
import { autobind } from "core-decorators";
import { File, IFile } from "./File";

@autobind
class FileStore {
  @observable files: IFile[] = [];

  @action
  public createFile(file: IFile): void {
    const newFile = new File({
      id: uuid(),
      name: file.name,
      type: file.type,
      content: file.content,
    });
    this.files.push(newFile);
  }
}

export default FileStore;