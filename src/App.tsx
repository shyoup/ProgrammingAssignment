import React from 'react';
import { inject, observer } from 'mobx-react';
import './App.css';
import EditorPageComponent from './fileeditor/EditorPageComponent'
import createStore from 'store';
import RootStore from 'store/RootStore';
import StoreProvider from 'store/StoreProvider';

const App: React.FC = () => {
  const [store] = React.useState<RootStore>(createStore());
  return (
    <StoreProvider value={store}>
      <EditorPageComponent />
    </StoreProvider>
  );
}

export default App;
