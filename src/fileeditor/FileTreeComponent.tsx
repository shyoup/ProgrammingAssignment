import React from 'react';
import { Tab, Tabs } from '@mui/material'
import useStore from 'hooks/util/useStore';
import { observer } from 'mobx-react';

const FileTreesCompoenent: React.FC = () => {
  const { fileStore, tabStore } = useStore();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    tabStore.setCurTab(newValue);
  };

  return (
    <div className="App-tree">
      <Tabs
        orientation="vertical"
        value={tabStore.getCurTab()}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {fileStore.getFilesList().map(item => (
          <Tab key={item.id} value={item.id} label={item.name} />
        ))}
      </Tabs>
    </div>
  );
};
export default observer(FileTreesCompoenent);
