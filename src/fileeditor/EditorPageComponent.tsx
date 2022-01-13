import React, { ReactNode } from 'react';
import FileHandlerCompoenent from './FileHandlerComponent';
import FileTreesCompoenent from './FileTreeComponent';
import FileTabsCompoenent from './FileTabsComponent';

interface Props {
  children?: ReactNode;
}

const EditorPageComponent: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <div className="App">
      <FileHandlerCompoenent>
        <FileTabsCompoenent />
      </FileHandlerCompoenent>
      <FileTreesCompoenent />
    </div>
  );
};
export default EditorPageComponent;
