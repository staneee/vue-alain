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
          :key="menuitem.name"
          v-if="menuitem.children===null||menuitem.children.length===1"
        >
          <router-link :to="menuitem.link">
            <a-icon :type="menuitem.icon"/>
            <span>{{menuitem.text}}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu :key="menuitem.name" v-else-if="menuitem.children!==null">
          <template slot="title">
            <a-icon :type="menuitem.icon"/>
            <span>{{menuitem.text}}</span>
          </template>
          <a-menu-item :key="child.name" v-for="child in menuitem.children">
            <router-link :to="child.link">{{child.text}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
const appState = namespace("app");
const menuState = namespace("menu");

import * as _ from "lodash";
import AppComponentBase from "@/shared/component-base/app-component-base";
import { IMenu } from "@/shared/states/modules/menu.state";

@Component({
  components: {}
})
export default class AdminSidebar extends AppComponentBase {
  @appState.State("isCollapse")
  private isCollapse!: boolean;

  @menuState.State("menus")
  private menus: IMenu[];

  private rootSubmenuKeys: any[] = [];

  private currentRouteName: any[] = [];
  private openMenus: any[] = [];

  constructor() {
    super();
  }

  private parentMenuName(currentRouteName: any) {
    const menuList = this.menus;
    const childList = _.map(menuList, (item: any) => {
      return _.map(item.children, (citem: any) => {
        citem.parentName = item.name;
        return citem;
      });
    });
    const list = _.flatten(childList);
    const menu = _.find(list, (o: any) => o.name === currentRouteName);
    return menu.parentName;
  }

  private mounted() {
    this.currentRouteName = [this.$route.name];
    const roots = _.filter(this.menus, (item: any) => item.children != null);
    this.rootSubmenuKeys = _.map(roots, "name");
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
    const openKey = this.parentMenuName(name);
    this.handleOpenChange([openKey]);
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
