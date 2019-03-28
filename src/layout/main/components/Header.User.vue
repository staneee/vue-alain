<template>
  <a-dropdown>
    <div class="item">
      <div class="d-flex align-items-center px-sm">
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          nzSize="small"
          class="mr-sm"
        ></a-avatar>Admin
      </div>
    </div>
    <a-menu slot="overlay" @click="handleCommand">
      <a-menu-item>
        <i class="fa fa-user-o"></i>
        个人中心
      </a-menu-item>
      <a-menu-item>
        <i class="fa fa-cog"></i>
        个人设置
      </a-menu-item>
      <a-menu-divider/>
      <a-menu-item divided key="logout">
        <i class="fa fa-sign-out"></i>
        退出登录
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import AppConsts from "@/shared/AppConsts";

const userModule = namespace("user");

@Component({})
export default class HeaderUser extends Vue {
  private menuCommand: any = {
    logout: this.logout
  };

  private handleCommand(e: any) {
    this.menuCommand[e.key]();
  }

  @userModule.Mutation("loginSuccess")
  private loginSuccess(param: any) {}

  /**
   * 退出登录，需要做其他事情
   */
  private logout() {
    abp.auth.clearToken();
    abp.utils.deleteCookie(
      AppConsts.authorization.encrptedAuthTokenName,
      abp.appPath
    );
    this.$router.push(AppConsts.loginUrl);
  }
}
</script>
