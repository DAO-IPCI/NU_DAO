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
      title="ipci"
      href="https://new.dapp.ipci.io/"
      target="_blank"
    >{{$t('menu.marketplace')}}</v-btn>
    <v-btn text :href="`https://medium.com/@${medium}`" target="_blank">{{$t('menu.publications')}}</v-btn>
    <v-btn text :to="{name:'stat'}">{{$t('menu.statistics')}}</v-btn>
    <v-btn text :to="{name:'history'}">{{$t('menu.history')}}</v-btn>
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
