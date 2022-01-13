import React, { ReactNode } from 'react';
import { Tab, Tabs } from '@mui/material'

interface Props {
  children?: ReactNode;
}

const FileTreesCompoenent: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="App-tree">
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </div>
  );
};
export default FileTreesCompoenent;
