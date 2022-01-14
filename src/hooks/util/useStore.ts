import { useContext } from 'react';
import RootStore from 'store/RootStore';
import { StoreContext } from 'store/StoreProvider';

const useStore = (): RootStore => useContext(StoreContext);

export default useStore;
