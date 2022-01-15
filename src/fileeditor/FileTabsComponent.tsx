import React from 'react';
import { Tab, Tabs } from '@mui/material'
import useStore from 'hooks/util/useStore';
import { observer } from 'mobx-react';

const FileTabsCompoenent: React.FC = () => {
  const { fileStore, tabStore } = useStore();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  };
  return (
    <div className="App-tabs">
      <Tabs
        value={tabStore.getCurTab()}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabStore.getOpenedTabList().map(id => (
          <Tab key={id} value={id} label={fileStore.getFileNameById(id)} />
        ))}
      </Tabs>
    </div>
  );
};
export default observer(FileTabsCompoenent);
