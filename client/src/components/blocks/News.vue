<template>
  <v-card>

    <v-card-title>{{$t('rules.title')}}</v-card-title>
    <v-card-text>
      <v-card-text style="padding-bottom: 0px">
        <img :src="`assets/i/info.png`" align="left" style="float:left; margin: 10px;" height="50">
        <span>{{$t('rules.description')}}</span>
      </v-card-text>

      <v-card-title style="padding-top: 5px; padding-bottom: 0px;">Лидеры месяца</v-card-title>
      <v-card-text style="padding-bottom: 0px">
        <v-card-text>
          <img :src="`assets/i/dino_green.png`" align="left" style="float:left; padding-right:25px;" height="50px">
          Зелёный лидер - участник игры, сокративший выбросы CO2 в этом месяце больше других. В игре учитывается только один источник выбросов - потребление электроэнергии. В качестве базовых значений взяты показания счётчиков электроэнергии за 12 месяцев 2017 года.
        </v-card-text>
        <v-card-text>
          <img :src="`assets/i/dino_red.png`" align="left" style="float:left; padding-right:10px;" height="50">
          Красный лидер - участник игры, увеличивший выбросы CO2 в этом месяце больше других. Если попытками экономии электроэнергии не удаётся удержаться в пределах 2017 года, участник может компенсировать рост потребления посадкой деревьев сам или купить углеродные единицы в IPCI.
        </v-card-text>
      </v-card-text>

      <v-card-title style="padding-top:5px; padding-bottom:5px;">
        Рейтинг
        <img :src="`assets/i/monster_green.png`" style="float:left; padding-left:10px;" height="30px">
        <img :src="`assets/i/monster_orange.png`" style="float:left; padding-left:10px;" height="30px">
        <img :src="`assets/i/monster_red.png`" style="float:left; padding-left:12px;" height="30px">
      </v-card-title>
      <v-card-text style="padding:0px; padding-left:30px;">
        Таблица текущих результатов составляется из показаний потребления электроэнергии за прошедший месяц текущего года и такой же месяц базового, 2017 года. В расчёте углеродного баланса учитывается погашение, сделанное с помощью сервиса IPCI.
      </v-card-text>

    </v-card-text>
  </v-card>
</template>
