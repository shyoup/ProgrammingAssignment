import RootStore from 'store/RootStore';
import FileStore from 'store/FileStore';

export default function createRootStore(): RootStore {
  // create store
  return {
    fileStore: new FileStore(),
  };
}
