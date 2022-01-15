import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';

class TabStore {
  @observable
  private curTab: string;

  @observable
  private tabList: string[];

  @observable
  private openedTabList: string[];
  
  public constructor() {
    makeObservable(this);
    this.curTab = '';
    this.tabList = [];
    this.openedTabList = [];
  }

  @boundMethod
  public addList(id: string): void {
    const ret = this.tabList.find(item => item === id);
    if (ret) return;
    this.setTabList([...this.tabList, id]);
  }

  @boundMethod
  public addOpenedList(id: string): void {
    const ret = this.openedTabList.find(item => item === id);
    if (ret) return;
    this.setOpenedTabList([...this.openedTabList, id]);
  }

  @boundMethod
  public deleteOpenFile(id: string): void {
    const ret = this.openedTabList.filter(item => item !== id);
    this.setOpenedTabList(ret);
  }

  @action
  public setTabList(tab: string[]): void {
    this.tabList = tab;
  }

  @boundMethod
  public getTabList(): string[] {
    return this.tabList;
  }

  @action
  public setOpenedTabList(tab: string[]): void {
    this.openedTabList = tab;
  }

  @boundMethod
  public getOpenedTabList(): string[] {
    return this.openedTabList;
  }

  @action
  public setCurTab(id: string, isFolder?: boolean): void {
    runInAction(() => {
      if(!isFolder) {
        this.addOpenedList(id);
        this.curTab = id;
      }
    });
  }

  @boundMethod
  public getCurTab(): string {
    return this.curTab;
  }
}

export default TabStore;