import JSZip from 'jszip';
import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const FileHandlerCompoenent: React.FC<Props> = (props: Props) => {
  let file: File;
  const { children } = props;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const formElement = React.useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        zip.files[filename].async('string').then((fileData) => {
          console.log(fileData);
        })
      })
    })
  };

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !formElement.current) {
      return;
    }
    const [files] = event.target.files;
    file = files;
    formElement.current.requestSubmit();
  };

  const addButtonClick = () => {
    hiddenFileInput.current?.click();
  }

  return (
    <div className='App-header'>
      <button onClick={addButtonClick}> + </button>
      <form
        name="document"
        encType="multipart/form-data"
        method="post"
        onSubmit={onSubmit}
        ref={formElement}
      >
        <input
          type="file"
          name="document"
          ref={hiddenFileInput}
          onChange={onFileSelected}
          accept=".zip"
          hidden
        />
      </form>
      {children}
    </div>
  );
};
export default FileHandlerCompoenent;
