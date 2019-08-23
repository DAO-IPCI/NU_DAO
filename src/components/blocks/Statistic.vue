<template>
  <v-card>
    <v-tabs v-model="tab" :grow="true">
      <v-tab>{{$t('statistics.current_rating')}}</v-tab>
      <v-tab>{{$t('statistics.all_rating')}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table
          hide-default-footer
          :sort-by="sort"
          :sort-desc="true"
          :headers="headers"
          :items="current"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          hide-default-footer
          :sort-by="sort"
          :sort-desc="true"
          :headers="headers"
          :items="all"
        ></v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import i18n from "../../plugins/i18n";

export default {
  computed: {
    ...mapGetters("data", ["current", "all"])
  },
  data: () => ({
    tab: null,
    sort: "electricity",
    headers: [
      {
        text: "",
        sortable: false,
        value: "name"
      },
      { text: i18n.t("statistics.ghg"), value: "ghg" },
      { text: i18n.t("statistics.electricity"), value: "electricity" },
      { text: i18n.t("statistics.finance"), value: "finance" }
    ]
  })
};
</script>
