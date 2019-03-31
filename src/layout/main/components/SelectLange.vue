<template>
  <a-dropdown>
    <div class="item">
      <a-icon type="global"/>
      <span>{{currentLanguage.displayName}}</span>
    </div>
    <a-menu slot="overlay" @click="localeChange">
      <a-menu-item v-for="(item) in languages" :key="item.name">
        <i :class="item.icon"></i>
        <a href="javascript:;">{{item.displayName}}</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
/**
 * 多语言选择组件
 */
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";

import AppComponentBase from "@/shared/component-base/app-component-base";

import abpService from "@/shared/services/abp.service";
import languageService from "@/shared/services/language.service";
import { ILanguageInfo } from "@/shared/states/modules/language.state";

import * as _ from "lodash";

@Component({})
export default class SelectLange extends AppComponentBase {
  get currentLanguage(): ILanguageInfo {
    return languageService.currentLanguage;
  }

  get languages(): ILanguageInfo[] {
    return _.filter(
      languageService.languages,
      o => !o.isDisabled && o.name !== this.currentLanguage.name
    );
  }

  constructor() {
    super();
  }

  /**
   * 切换语言
   */
  private localeChange(e: any) {
    abpService.changeLanguage(e.key).then(() => {});
  }
}
</script>
