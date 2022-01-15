import React from 'react';
import { Tab, Tabs } from '@mui/material'
import useStore from 'hooks/util/useStore';
import { observer } from 'mobx-react';
import CloseButtonComponent from 'common/CloseButtonComponent';

const FileTabsCompoenent: React.FC = () => {
  const { fileStore, tabStore } = useStore();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    tabStore.setCurTab(newValue);
    fileStore.openFile(newValue);
  };
  return (
    <div className="App-tabs">
      <Tabs
        value={tabStore.getCurTab()}
        onChange={handleChange}
      >
        {tabStore.getOpenedTabList().map(id => (
          <Tab
            key={id}
            value={id}
            label={fileStore.getFileNameById(id)}
            style={{
              color: 'white',
            }}
            icon={<CloseButtonComponent 
              onClick={(event) => {
                event.stopPropagation();
                tabStore.deleteOpenFile(id);
                fileStore.closeFile();
              }}
              />}
            iconPosition="end"
          />
        ))}
      </Tabs>
    </div>
  );
};
export default observer(FileTabsCompoenent);
