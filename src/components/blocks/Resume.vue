<template>
  <v-card>
    <v-card-title>{{$t('resume.title')}}</v-card-title>
    <v-card-text style="height: 100%">
      <div class="d-flex justify-space-between align-stretch" style="height: 100%" flat tile>
        <div class="pa-5 text-center align-self-center">
          {{$t('resume.enemy')}}
          <br />
          <div class="display-1 mt-2">
            <b>{{max.member}}</b>
          </div>
          <br />
          <span class="warning--text title">{{max.value}}</span> tCO2
        </div>
        <div class="align-self-center primary" style="flex: 1 1 auto;height:1px;"></div>
        <div class="pa-5 text-center align-self-center">
          {{$t('resume.friend')}}
          <br />
          <div class="display-1 mt-2">
            <b>{{min.member}}</b>
          </div>
          <br />
          <span class="primary--text title">{{min.value}}</span> tCO2
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("data", ["min", "max"])
  }
};
</script>
