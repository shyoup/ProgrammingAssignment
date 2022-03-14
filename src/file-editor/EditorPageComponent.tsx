import React from 'react';
import FileHandlerCompoenent from './FileHandlerComponent';
import FileTreesCompoenent from './FileTreeComponent';
import FileTabsCompoenent from './FileTabsComponent';
import { observer } from 'mobx-react';
import MonacoEditorComponent from './MonacoEditorComponent';
import useStore from 'hooks/util/UseStore';
import { FILE_TYPE } from 'store/File';
import ImageViewerComponent from './ImageViewerComponent';

const EditorPageComponent: React.FC = () => {
  const { fileStore, tabStore } = useStore();
  return (
    <div className="App">
      <FileHandlerCompoenent>
        <FileTabsCompoenent />
      </FileHandlerCompoenent>
      <div className="App-contents">
        <FileTreesCompoenent />
        {tabStore.getCurTab() && fileStore.getOpenedFileType() === FILE_TYPE.TEXT && <MonacoEditorComponent />}
        {tabStore.getCurTab() && fileStore.getOpenedFileType() === FILE_TYPE.IMAGE && <ImageViewerComponent id={tabStore.getCurTab()} />}
      </div>
    </div>
  );
};
export default observer(EditorPageComponent);
