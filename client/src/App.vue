<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$store.dispatch("auth/user");
    }
    this.$store.dispatch("data/members");
    this.$store.dispatch("data/load", false);
    // this.$store.dispatch("data/load", true);
    this.$store.dispatch("news/load");
  }
};
</script>
