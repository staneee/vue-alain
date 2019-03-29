<template>
  <a-locale-provider :locale="currentLocale">
    <div id="app" :class="{'aside-collapsed':isCollapse}" v-title="title">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<style lang="less">
</style>

<script  lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { State, Mutation, namespace } from "vuex-class";
import AppComponentBase from "@/shared/component-base/app-component-base";
import { IDocumentTitle } from "@/shared/states/modules/app.state";

// app模块
const appState = namespace("app");

/**
 * app主入口
 */
@Component({
  components: {}
})
export default class App extends AppComponentBase {
  // 折叠
  @appState.State("isCollapse")
  private isCollapse!: boolean;

  // 浏览器标题信息
  @appState.State("documentTitle")
  private documentTitle!: IDocumentTitle;

  // app名称
  @appState.State("name")
  private appName!: any;

  /**
   * 获取浏览器标题，包含多语言信息
   */
  get title() {
    let title = this.documentTitle.title;
    return this.appName ? `${title} - ${this.appName}` : title;
  }

  /**
   * 获取当前多语言信息
   */
  get currentLocale() {
    const messages: any = this.$i18n.messages[this.$i18n.locale];
    return messages;
  }

  /**
   * mounted 周期
   */
  private mounted() {}
}
</script>
