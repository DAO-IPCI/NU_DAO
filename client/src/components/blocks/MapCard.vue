<template>
  <v-card>
    <v-card-title>
      {{$t('map.title')}}&nbsp;
      <router-link :to="{ name: 'map' }" class="body-2">{{ $t('map.more') }}</router-link>
    </v-card-title>
    <Map style="width: 100%;height: 400px" />
    <v-card-text>
      Углеродный баланс - это разница между выбросами CO2 в базовом и текущем году. На карте показан углеродный баланс за месяц. Например, в октябре 2019 углеродный баланс участника рассчитывается как выбросы в сентябре 2019 минус выбросы в сентябре базового года (2017). Отрицательная величина означает сокращение выбросов. Также в углеродном балансе учитывается сокращение, сделанное погашением углеродных единиц в IPCI (вычитается).
    </v-card-text>
  </v-card>
</template>

<script>
import Map from "@/components/blocks/Map";

export default {
  components: { Map }
};
</script>
