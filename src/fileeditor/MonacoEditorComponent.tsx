import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const MonacoEditorComponent: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <div className='App-tree'>
      {children}
    </div>
  );
};
export default MonacoEditorComponent;
