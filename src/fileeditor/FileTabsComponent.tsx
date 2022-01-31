import React from 'react';
import { Tab, Tabs } from '@mui/material'
import useStore from 'hooks/util/useStore';
import { observer } from 'mobx-react';
import CloseButtonComponent from 'common/CloseButtonComponent';

const FileTabsCompoenent: React.FC = () => {
  const { fileStore, tabStore } = useStore();

  const handleClose = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const ret = tabStore.deleteOpenFile(id);
    fileStore.saveFile(id);
    if (ret) handleChange(ret);
    else fileStore.closeFile();
  };

  const handleChange = (newValue: string) => {
    tabStore.setCurTab(newValue);
    fileStore.openFile(newValue);
  };
  return (
    <div className="App-tabs">
      <Tabs
        value={tabStore.getCurTab()}
        onChange={(event, index) => {
          handleChange(index);
        }}
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
                handleClose(event, id);
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
