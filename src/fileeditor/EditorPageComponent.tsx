import React from 'react';
import FileHandlerCompoenent from './FileHandlerComponent';
import FileTreesCompoenent from './FileTreeComponent';
import FileTabsCompoenent from './FileTabsComponent';
import { observer } from 'mobx-react';
import MonacoEditorComponent from './MonacoEditorComponent';
import useStore from 'hooks/util/useStore';

const EditorPageComponent: React.FC = () => {
  const { fileStore } = useStore();
  return (
    <div className="App">
      <FileHandlerCompoenent>
        <FileTabsCompoenent />
      </FileHandlerCompoenent>
      <div className="App-contents">
        <FileTreesCompoenent />
        {fileStore.getFilesList().length > 0 && <MonacoEditorComponent />}
      </div>
    </div>
  );
};
export default observer(EditorPageComponent);
