<template>
  <v-list dense>
    <v-list-item
      href="https://dapp.ipci.io/#/dao/market/0xd86E7d6322F38646A37e2a713723d8B15347Be99"
      target="_blank"
    >
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.marketplace')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :href="`https://medium.com/@${medium}`" target="_blank">
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.publications')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.statistics')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="isAuthenticated" :to="{name:'add'}">
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.add')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="!isAuthenticated" :to="{name:'login'}">
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.login')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="isAuthenticated" @click="logout">
      <v-list-item-content>
        <v-list-item-title>{{$t('menu.logout')}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
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
