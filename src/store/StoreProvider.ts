import { createContext } from 'react';
import RootStore from './RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);
const StoreProvider = StoreContext.Provider;

export default StoreProvider;
