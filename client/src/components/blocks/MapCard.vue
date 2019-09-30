<template>
  <v-card>
    <v-card-title>
      {{$t('map.title')}}&nbsp;
      <router-link :to="{ name: 'map' }" class="body-2">{{ $t('map.more') }}</router-link>
    </v-card-title>
    <Map style="width: 100%;height: 500px" />
  </v-card>
</template>

<script>
import Map from "@/components/blocks/Map";

export default {
  components: { Map }
};
</script>
