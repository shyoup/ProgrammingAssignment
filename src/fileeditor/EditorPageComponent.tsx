import React, { ReactNode, useState } from 'react';
import FileHandlerCompoenent from './FileHandlerComponent';
import FileTreesCompoenent from './FileTreeComponent';
import FileTabsCompoenent from './FileTabsComponent';

const EditorPageComponent: React.FC = () => {
  const [zipList, setZipList] = useState<string[]>([]);

  return (
    <div className="App">
      <FileHandlerCompoenent setZipList={setZipList}>
        <FileTabsCompoenent />
      </FileHandlerCompoenent>
      <FileTreesCompoenent zipList={zipList}/>
    </div>
  );
};
export default EditorPageComponent;
