import React from 'react';
import useStore from 'hooks/util/useStore';

interface Props {
  children?: React.ReactNode;
}

const FileHandlerCompoenent: React.FC<Props> = (prop: Props) => {
  const { fileStore, tabStore } = useStore();
  const { children } = prop;
  let file: File;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const formElement = React.useRef<HTMLFormElement>(null);

  const downloadClick = () => {
    fileStore.downloadZipFile();
  };

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !formElement.current) {
      return;
    }
    const [files]: FileList = event.target.files;
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
        onSubmit={(event) => {
          fileStore.onSubmit(file, event, tabStore.addList);
        }}
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
      <button onClick={downloadClick}> Download</button>
      {children}
    </div>
  );
};
export default FileHandlerCompoenent;
