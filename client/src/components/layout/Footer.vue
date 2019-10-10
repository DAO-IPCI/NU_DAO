<template>
  <v-footer color="primary" padless>
    <v-row justify="center" no-gutters>
      <v-col class="primary py-4 px-4 text-right white--text" cols="12">
        {{$t('title')}}, {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>
