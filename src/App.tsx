import React from 'react';
import 'App.css';
import EditorPageComponent from './file-editor/EditorPageComponent'
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
