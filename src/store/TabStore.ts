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
    runInAction(() => {
      this.curTab = id;
      this.addOpenedList(id);
    });
  }

  @boundMethod
  public getCurTab(): string {
    return this.curTab;
  }
}

export default TabStore;