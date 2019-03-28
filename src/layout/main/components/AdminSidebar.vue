<template>
  <div class="aside">
    <a-menu 
     theme="dark"
      mode="inline"
      :inlineCollapsed="isCollapse"
      v-model="currentRouteName"
      @openChange="handleOpenChange"
      :openKeys="openMenus"
    >
      <template v-for="menuitem in menus">
        <a-menu-item
          :key="menuitem.key"
          v-if="menuitem.children==null||menuitem.children.length===1"
        >
          <router-link :to="menuitem.link">
            <a-icon :type="menuitem.icon"/>
            <span>{{displayMenuTitle(menuitem)}}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu :key="menuitem.key" v-else-if="menuitem.children!=null">
          <template slot="title">
            <a-icon :type="menuitem.icon"/>
            <span>{{displayMenuTitle(menuitem)}}</span>
          </template>
          <a-menu-item :key="child.key" v-for="child in menuitem.children.filter(o=>!o.hide)">
            <router-link :to="child.link">{{displayMenuTitle(child)}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
const appModule = namespace("app");

import * as _ from "lodash";
import AppComponentBase from "@/shared/component-base/app-component-base";
import { IMenu } from "@/shared/store/modules/app.store";

@Component({
  components: {}
})
export default class AdminSidebar extends AppComponentBase {
  @appModule.State("isCollapse")
  private isCollapse!: boolean;

  @appModule.State("menus")
  private menus: IMenu[];

  private rootSubmenuKeys: any[] = [];

  private currentRouteName: any[] = [];
  private openMenus: any[] = [];

  constructor() {
    super();
  }


  private parentMenuKey(key: any) {
    const menuList = this.menus;
    const childList = _.map(menuList, (item: any) => {
      return _.map(item.children, (citem: any) => {
        citem.parentName = item.key;
        return citem;
      });
    });
    const list = _.flatten(childList);
    const menu = _.find(list, (o: any) => o.key === key);
    return menu.parentName;
  }

  private mounted() {
    this.currentRouteName = [this.$route.name];
    const roots = _.filter(this.menus, (item: any) => item.children != null);
    this.rootSubmenuKeys = _.map(roots, "key");
    this.initOpenMenus();
  }

  private handleOpenChange(openKeys: any) {
    const latestOpenKey = openKeys.find(
      (key: any) => this.openMenus.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openMenus = openKeys;
    } else {
      this.openMenus = latestOpenKey ? [latestOpenKey] : [];
    }
  }

  private initOpenMenus() {
    const name = this.$route.name;
    const openKey = this.parentMenuKey(name);
    this.handleOpenChange([openKey]);
  }

  private displayMenuTitle(menu: any) {
    if (menu.i18n) {
      return this.l(menu.i18n);
    }
    return menu.text;
  }

  @Watch("$route")
  private watchRouteName(newVal: any, oldVal: any) {
    this.currentRouteName = [newVal.name];
  }

  @Watch("isCollapse")
  private watchisCollapse(newVal: any, oldVal: any) {
    if (newVal === true) {
      this.openMenus = [];
    } else {
      this.initOpenMenus();
    }
  }
}
</script>

<style lang="less">
// .ant-menu-submenu-selected {
//   background-color: #fafafa;

//   .ant-menu.ant-menu-inline.ant-menu-sub {
//     background-color: #fafafa;
//   }

//   i {
//     color: #1890ff;
//     ::before {
//       color: #1890ff;
//     }
//     ::after {
//       color: #1890ff;
//     }
//   }

//   span {
//     color: #1890ff;
//   }
// }
</style>
