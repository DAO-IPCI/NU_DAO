<template>
  <v-card>
    <v-card-title>{{$t('news.publications')}}</v-card-title>
    <v-list-item two-line v-for="(item, i) in list" :key="i">
      <v-list-item-content>
        <v-list-item-subtitle>{{item.pubDate}}</v-list-item-subtitle>
        <v-list-item-content>
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </v-list-item-content>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("news", ["list"])
  }
};
</script>
