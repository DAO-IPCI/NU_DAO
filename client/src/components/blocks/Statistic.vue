<template>
  <v-card>
    <v-tabs v-model="tab" :grow="true">
      <v-tab>{{$t('statistics.current_rating', { month: $t('statistics.month.' + monthNum) })}}</v-tab>
      <v-tab>{{$t('statistics.all_rating')}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table
          hide-default-footer
          :sort-by="sort"
          :sort-desc="false"
          :headers="headers"
          :items="current"
        >
          <template v-slot:item.name="{ item }">
            <img
              :src="`assets/i/${getIcon(item.ghg_balance)}`"
              style="vertical-align: middle;"
              :style="getStyle(item.ghg_balance)"
            />
            {{ item.name }}
          </template>
          <template
            v-slot:item.finance="{ item }"
          >{{ (item.finance === null) ? '-' : Math.round(item.finance).toLocaleString('ru-KZ') }}</template>
          <template
            v-slot:item.electricity="{ item }"
          >{{ (item.electricity === null) ? '-' : Math.round(item.electricity).toLocaleString('ru-KZ') }}</template>
          <template
            v-slot:item.ghg_emission="{ item }"
          >{{ (item.ghg_emission === null) ? '-' : Math.round(item.ghg_emission).toLocaleString('ru-KZ') }}</template>
          <template v-slot:item.ghg_balance="{ item }">
            <b
              :class="`${getColor(item.ghg_balance)}--text`"
            >{{ (item.ghg_balance === null) ? '-' : Math.round(item.ghg_balance * 1000) / 1000 }}</b>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          hide-default-footer
          :sort-by="sort"
          :sort-desc="false"
          :headers="headers"
          :items="all"
        >
          <template v-slot:item.name="{ item }">
            <img
              :src="`assets/i/${getIcon(item.ghg_balance)}`"
              style="vertical-align: middle;"
              :style="getStyle(item.ghg_balance)"
            />
            {{ item.name }}
          </template>
          <template
            v-slot:item.finance="{ item }"
          >{{ (item.finance === null) ? '-' : Math.round(item.finance).toLocaleString('ru-KZ') }}</template>
          <template
            v-slot:item.electricity="{ item }"
          >{{ (item.electricity === null) ? '-' : Math.round(item.electricity).toLocaleString('ru-KZ') }}</template>
          <template
            v-slot:item.ghg_emission="{ item }"
          >{{ (item.ghg_emission === null) ? '-' : Math.round(item.ghg_emission).toLocaleString('ru-KZ') }}</template>
          <template v-slot:item.ghg_balance="{ item }">
            <b
              :class="`${getColor(item.ghg_balance)}--text`"
            >{{ (item.ghg_balance === null) ? '-' : Math.round(item.ghg_balance * 1000) / 1000 }}</b>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import i18n from "../../plugins/i18n";

export default {
  computed: {
    ...mapState("data", ["monthNum"]),
    ...mapGetters("data", ["current", "all"])
  },
  data: () => ({
    tab: null,
    sort: "ghg_balance",
    headers: [
      {
        text: "",
        sortable: false,
        value: "name",
        width: "30%"
      },
      { text: i18n.t("statistics.finance"), value: "finance" },
      { text: i18n.t("statistics.electricity"), value: "electricity" },
      { text: i18n.t("statistics.ghg"), value: "ghg_emission" },
      { text: i18n.t("statistics.carbon_balance"), value: "ghg_balance" }
    ]
  }),
  methods: {
    getIcon(ghg_balance) {
      if (ghg_balance === null) return "monster_red.png";
      else if (ghg_balance < -5) return "monster_green.png";
      else if (ghg_balance > -5 && ghg_balance < 5) return "monster_orange.png";
      else return "monster_red.png";
    },
    getStyle(ghg_balance) {
      if (ghg_balance === null)
        return "width: 27px;margin-right: 7px;margin-left: 5px;";
      else if (ghg_balance < -5) return "width: 34px;margin-right: 5px;";
      else if (ghg_balance > -5 && ghg_balance < 5)
        return "width: 34px;margin-right: 5px;";
      else return "width: 27px;margin-right: 7px;margin-left: 5px;";
    },
    getColor(ghg_balance) {
      if (ghg_balance === null) return "red";
      else if (ghg_balance < -5) return "green";
      else if (ghg_balance > -5 && ghg_balance < 5) return "orange";
      else return "red";
    }
  }
};
</script>
