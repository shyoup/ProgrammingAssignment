import { action, makeObservable, observable, runInAction } from "mobx";
import { boundMethod } from 'autobind-decorator';

class TabStore {
  @observable
  private curTab: string;

  @observable
  private tabList: string[];
  
  public constructor() {
    makeObservable(this);
    this.curTab = '';
    this.tabList = [];
  }


  @action
  public addList(id: string): void {
    for (const tab of this.tabList) {
      if (tab === id) {
        return;
      } else {
        this.setTabList([...this.tabList, id]);
      }
    }
  }

  @action
  public setTabList(tab: string[]): void {
    this.tabList = tab;
  }

  @boundMethod
  public getTabList(): string[] {
    console.log(this.tabList);
    return this.tabList;
  }

  @action
  public setCurTab(id: string): void {
    this.curTab = id;
    this.addList(id);
  }

  @boundMethod
  public getCurTab(): string {
    return this.curTab;
  }
}

export default TabStore;