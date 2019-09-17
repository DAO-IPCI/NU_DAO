<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="log">
      <template v-slot:item.transaction_hash="{ item }">
        <LinkExplorer :text="item.transaction_hash" category="tx">{{ item.transaction_hash }}</LinkExplorer>
      </template>
      <template v-slot:item.value="{ item }">{{ item.value | toDec }}</template>
      <template v-slot:item.token="{ item }">
        <LinkExplorer :text="item.token" category="token">{{ item.token }}</LinkExplorer>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import i18n from "../plugins/i18n";
import LinkExplorer from "../components/layout/LinkExplorer";

export default {
  components: {
    LinkExplorer
  },
  computed: {
    ...mapGetters("data", ["log"])
  },
  data: () => ({
    headers: [
      {
        text: i18n.t("log.type"),
        sortable: false,
        value: "type"
      },
      { text: i18n.t("log.block_number"), value: "block_number" },
      { text: i18n.t("log.member"), value: "member" },
      { text: i18n.t("log.transaction_hash"), value: "transaction_hash" },
      { text: i18n.t("log.value"), value: "value" },
      { text: i18n.t("log.token"), value: "token" }
    ]
  }),
  methods: {
    getIcon(ghg_balance) {
      if (ghg_balance < -5) return "monster_green.png";
      else if (ghg_balance > -5 && ghg_balance < 5) return "monster_orange.png";
      else return "monster_red.png";
    },
    getStyle(ghg_balance) {
      if (ghg_balance < -5) return "width: 34px;margin-right: 5px;";
      else if (ghg_balance > -5 && ghg_balance < 5)
        return "width: 34px;margin-right: 5px;";
      else return "width: 27px;margin-right: 7px;margin-left: 5px;";
    },
    getColor(ghg_balance) {
      if (ghg_balance < -5) return "green";
      else if (ghg_balance > -5 && ghg_balance < 5) return "orange";
      else return "red";
    }
  }
};
</script>
