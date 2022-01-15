import React from 'react';
import { Tab, Tabs } from '@mui/material'
import useStore from 'hooks/util/useStore';
import { observer } from 'mobx-react';

const FileTreesCompoenent: React.FC = () => {
  const { fileStore, tabStore } = useStore();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    tabStore.setCurTab(newValue);
    fileStore.openFile(newValue);
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
        {tabStore.getTabList().map(id => (
          <Tab key={id} value={id} label={fileStore.getFileNameById(id)} />
        ))}
      </Tabs>
    </div>
  );
};
export default observer(FileTreesCompoenent);
