<template>
  <fragment>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <MMenu />
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <LangSwitcher />
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
