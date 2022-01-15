import RootStore from 'store/RootStore';
import FileStore from 'store/FileStore';
import TabStore from './TabStore';

export default function createRootStore(): RootStore {
  // create store
  return {
    fileStore: new FileStore(),
    tabStore: new TabStore(),
  };
}
