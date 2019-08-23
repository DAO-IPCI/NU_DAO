<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="subheading text-center font-weight-regular">{{ $t('desc_page') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="12">
        <Map style="height: 100%;" />
      </v-col>
      <v-col lg="6" cols="12">
        <Statistic style="height: 100%;" />
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="12">
        <Resume style="height: 100%;" />
      </v-col>
      <v-col lg="6" cols="12">
        <News style="height: 100%;" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from "./blocks/Map";
import Statistic from "./blocks/Statistic";
import Resume from "./blocks/Resume";
import News from "./blocks/News";

export default {
  components: { Map, Statistic, Resume, News }
};
</script>
