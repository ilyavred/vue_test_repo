<template>
  <div id="app" class="app">
    <div class="deals-list">


    <!-- <app-coupon></app-coupon>
				<app-work-sheduller></app-work-sheduller> -->
		<deal-thumbnail
    v-for="deal in deals"
    :deal="deal"
    :key="deal.id"
    ></deal-thumbnail>
    </div>
    <!-- <div class="">

    </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Добро пожаловать во ВуеЖС',
      deals: [
        {
          id:123456,
          title:'Мастер-класс большой теннис, 1-3 часа игры в футбол. Скидка 50%',
          in_top:false,
          published_date:'November 1, 2020 00:00:00 GMT+06:00',
          duration:30,
          activation_lag:30,
          statistic_summary: {
            viewed:12543,
            buyed:130,
            activated:126,
            raiting:4.8,
          },
          statistic_daily:{
            viewed:53,
            buyed:12,
            activated:2,
            raiting_ystd:4.5,
          }
        },
          {
            id:40549,
            title:'Мастер-класс большой теннис, 1-3 часа игры в футбол. Скидка 50%',
            in_top:false,
            published_date:'December 10, 2020 00:00:00 GMT+06:00',
            duration:30,
            activation_lag:30,
            statistic_summary: {
              viewed:464,
              buyed:30,
              activated:30,
              raiting:3.8,
            },
            statistic_daily:{
              viewed:54,
              buyed:2,
              activated:2,
              raiting_ystd:3.8,
            }
          },
        {
          id:652435,
          title:'Новая акция! Такого раньше небыло. Проведи лето с семьей у себя дома со скидкой 100%',
          in_top:true,
          published_date:'January 1, 2021 00:00:00 GMT+06:00',
          duration:30,
          activation_lag:30,
          statistic_summary: {
            viewed:756063,
            buyed:5857,
            activated:456,
            raiting:4.3,
          },
          statistic_daily:{
            viewed:7655,
            buyed:65,
            activated:120,
            raiting_ystd:4.8,
          }
        },
        {
          id:0,
          title:'Демонстрационная акция! Изучи функционал мерчант кабинета на этом примере.',
          in_top:false,
          published_date:'January 30, 2020 00:00:00 GMT+06:00',
          duration:360,
          activation_lag:30,
          statistic_summary: {
            viewed:756063,
            buyed:5857,
            activated:456,
            raiting:4.3,
          },
          statistic_daily:{
            viewed:7655,
            buyed:65,
            activated:120,
            raiting_ystd:4.8,
          }
        },
        {
          id:46526,
          title:'Новая акция! Такого раньше небыло. Проведи лето с семьей у себя дома со скидкой 100%',
          in_top:false,
          published_date:'January 20, 2021 00:00:00 GMT+06:00',
          duration:30,
          activation_lag:30,
          statistic_summary: {
            viewed:0,
            buyed:0,
            activated:0,
            raiting:0,
          },
          statistic_daily:{
            viewed:0,
            buyed:0,
            activated:0,
            raiting_ystd:0,
          }
        },
      ]
    }
  }
}
</script>

<style scoped>
@import './assets/css/app.css';
</style>
