<template>
  <a-breadcrumb v-if="source">
    <span slot="separator" style="color: rgba(0, 0, 0, 0.65) !important;">></span>
    <a-breadcrumb-item>
      <span style="color: rgba(0, 0, 0, 0.65) !important;">
        <a-icon v-if="breadcrumb.icon" v-bind:type="breadcrumb.icon"/>
        <span>{{breadcrumb.text}}</span>
      </span>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item) in source" :key="item.name">
      <a style="color: rgba(0, 0, 0, 0.65) !important;">
        <a-icon v-if="item.icon" :type="item.icon"/>
        <span>{{item.text}}</span>
      </a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="tsx">
import { Breadcrumb, Icon } from "ant-design-vue";
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { IMapMenu } from "@/shared/states/modules/menu.state";
import { RouteConfig } from "vue-router";
import { IBreadcrumb } from "@/shared/states/modules/app.state";
import * as _ from "lodash";
import AppComponentBase from "@/shared/component-base/app-component-base";
import menuService from "@/shared/services/menu.service";
import appService from "@/shared/services/app.service";

@Component({
  components: {
    [Icon.name]: Icon,
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  }
})
export default class BreadcrumbList extends AppComponentBase {
  get source(): IMapMenu[] {
    return this.$route.matched
      .map(item => {
        return menuService.getMapMenu(item.name);
      })
      .filter(o => !!o);
  }

  get breadcrumb(): IBreadcrumb {
    return appService.getBreadcrumb();
  }

  private mounted() {}
}
</script>

<style lang="less">
</style>
