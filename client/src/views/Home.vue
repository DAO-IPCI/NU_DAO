<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="subheading text-center font-weight-regular">{{ $t('desc_page') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="12">
        <News style="height: 100%;" />
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
        <MapCard style="height: 100%;" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MapCard from "@/components/blocks/MapCard";
import Statistic from "@/components/blocks/Statistic";
import Resume from "@/components/blocks/Resume";
import News from "@/components/blocks/News";

export default {
  components: { MapCard, Statistic, Resume, News }
};
</script>
