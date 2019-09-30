<template>
  <v-container fluid style="height: 100%;">
    <div style="display:flex;height: 100%;">
      <div style="flex-grow: 1;">
        <Map style="width: 100%;height:100%;" />
      </div>
    </div>
  </v-container>
</template>

<script>
import Map from "@/components/blocks/Map";

export default {
  components: { Map }
};
</script>
