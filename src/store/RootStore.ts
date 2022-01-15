import FileStore from './FileStore';
import TabStore from './TabStore';

export default interface RootStore {
  fileStore: FileStore;
  tabStore: TabStore;
}
