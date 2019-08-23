<template>
  <fragment>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <MMenu />
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <v-toolbar-title class="headline">
        <span>Nu</span>
        <span class="font-weight-light">DAO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LangSwitcher />
      <Menu v-if="$vuetify.breakpoint.mdAndUp" />
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
    </v-app-bar>
  </fragment>
</template>

<script>
import Menu from "./Menu";
import LangSwitcher from "./LangSwitcher";
import MMenu from "./MMenu";

export default {
  data: () => ({
    drawer: false
  }),
  components: {
    Menu,
    LangSwitcher,
    MMenu
  }
};
</script>
