<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">{{$i18n.locale}}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(lang, i) in langs"
        :key="i"
        v-show="$i18n.locale != lang"
        @click="changeLang(lang)"
      >
        <v-list-item-title class="text-uppercase">{{lang}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    langs: ["en", "ru"]
  }),
  methods: {
    changeLang(local) {
      window.localStorage.lang = local;
      this.$i18n.locale = local;
    }
  }
};
</script>
