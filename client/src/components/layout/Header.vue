<template>
  <fragment>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <MenuMobile />
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <LangSwitcher />
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        <router-link to="/" class="white--text" style="text-decoration:none;">{{ $t('title') }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <MenuMain v-if="$vuetify.breakpoint.mdAndUp" />
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
    </v-app-bar>
  </fragment>
</template>

<script>
import { MenuMain, MenuMobile } from "./menu";
import LangSwitcher from "./LangSwitcher";

export default {
  data: () => ({
    drawer: false
  }),
  components: {
    MenuMain,
    MenuMobile,
    LangSwitcher
  }
};
</script>
