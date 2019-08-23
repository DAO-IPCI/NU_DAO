<template>
  <v-app>
    <Header />
    <v-content>
      <Page />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import Page from "./components/Page";

export default {
  components: {
    Header,
    Page
  },
  mounted() {
    this.$store.dispatch("data/members");
    this.$store.dispatch("data/load", false);
    this.$store.dispatch("data/load", true);
    this.$store.dispatch("news/load");
  }
};
</script>
