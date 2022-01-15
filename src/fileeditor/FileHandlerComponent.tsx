import React from 'react';
import useStore from 'hooks/util/useStore';

const FileHandlerCompoenent: React.FC = () => {
  const { fileStore } = useStore();
  let file: File;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const formElement = React.useRef<HTMLFormElement>(null);

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
        onSubmit={(event) => fileStore.onSubmit(file, event)}
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
    </div>
  );
};
export default FileHandlerCompoenent;
