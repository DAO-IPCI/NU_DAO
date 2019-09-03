<template>
  <v-card>
    <v-card-title>
      {{$t('map.title')}}&nbsp;
      <a
        href="https://public.tableau.com/profile/alisher2918#!/vizhome/NUDAOviz/CarbonBalanceMap?publish=yes"
        target="_blank"
        class="body-2"
      >{{$t('map.more')}}</a>
    </v-card-title>
    <!-- <v-img src="assets/i/map.png" aspect-ratio="2.75"></v-img> -->

    <iframe
      frameborder="0"
      allowtransparency="true"
      allowfullscreen="true"
      title="data visualization"
      marginheight="0"
      marginwidth="0"
      style="width: 100%;height: 500px"
      src="https://public.tableau.com/views/NUDAOviz/CarbonBalanceMap?:embed=y&amp;:display_count=yes&amp;publish=yes&amp;:embed=y&amp;:showVizHome=n&amp;:tabs=n&amp;position=right&amp;:apiID=host0"
    ></iframe>
  </v-card>
</template>
