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

  @action
  public addList(id: string): void {
    runInAction(() => {
      for (const tab of this.tabList) {
        if (tab === id) {
          return;
        }
      }
      this.setTabList([...this.tabList, id]);
    });
  }

  @action
  public addOpenedList(id: string): void {
    for (const tab of this.openedTabList) {
      if (tab === id) {
        return;
      } else {
        this.setOpenedTabList([...this.openedTabList, id]);
      }
    }
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
  public setCurTab(id: string): void {
    this.curTab = id;
  }

  @boundMethod
  public getCurTab(): string {
    return this.curTab;
  }
}

export default TabStore;