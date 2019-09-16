<template>
  <v-toolbar-items>
    <!-- <v-btn
      text
      href="https://dapp.ipci.io/#/dao/market/0x9d4927a4bf922fe1539b07968ea03f20205e53e6"
      title="mainnet"
      target="_blank"
    >{{$t('menu.marketplace')}}</v-btn>-->
    <v-btn
      text
      title="rinkeby"
      href="https://dapp.ipci.io/#/dao/market/0xd86E7d6322F38646A37e2a713723d8B15347Be99"
      target="_blank"
    >{{$t('menu.marketplace')}}</v-btn>
    <v-btn text :href="`https://medium.com/@${medium}`" target="_blank">{{$t('menu.publications')}}</v-btn>
    <v-btn text :to="{name:'stat'}">{{$t('menu.statistics')}}</v-btn>
    <v-btn v-if="isAuthenticated" text :to="{name:'add'}">{{$t('menu.add')}}</v-btn>
    <v-btn v-if="!isAuthenticated" text :to="{name:'login'}">{{$t('menu.login')}}</v-btn>
    <v-btn v-if="isAuthenticated" text @click="logout">{{$t('menu.logout')}}</v-btn>
  </v-toolbar-items>
</template>

<script>
import mixin from "./Mixin";
import config from "../../../config";

export default {
  mixins: [mixin],
  data: () => ({
    medium: config.medium.user
  })
};
</script>
