<template>
  <v-card>
    <v-card-title>{{$t('resume.title')}}</v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between align-stretch" style="height: 100%">
        <div class="pa-5 text-center align-self-center">
          <img src="assets/i/fossil.png" />
          <br />
          {{$t('resume.enemy')}}
          <br />
          <div class="display-1 mt-2">
            <b>{{max.member}}</b>
          </div>
          <br />
          <span class="warning--text title">{{max.value}}</span> tCO2
        </div>
        <div class="pa-5 text-center align-self-center">
          <img src="assets/i/libra.jpg" />
          <br />{{ $t('resume.cumulative_result') }}
          <br />
          <div class="display-1 mt-2">
            <b>{{ $t('resume.univ_name') }}</b>
          </div>
          <br />
          <span class="primary--text title">{{min.value}}</span> tCO2
        </div>
        <div class="pa-5 text-center align-self-center">
          <img src="assets/i/friend.png" />
          <br />
          {{$t('resume.friend')}}
          <br />
          <div class="display-1 mt-2">
            <b>{{min.member}}</b>
          </div>
          <br />
          <span class="primary--text title">{{min.value}}</span> tCO2
        </div>
      </div>
      <div>
        <p>
          {{ $t('resume.state_goal') }}:
          <span class="green--text">-72 000</span> tCO2 {{ $t('resume.annual') }}
        </p>
        <p>
          {{ $t('resume.contribution') }}:
          <span class="green--text">-516</span> tCO2
        </p>
        <p>
          {{ $t('resume.global') }}:
          <span
            class="green--text"
          >-36 000 000</span> tCO2
        </p>
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
