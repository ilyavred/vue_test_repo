<template>
  <div class="deal-thumb" :data-status="createLabel(deal)" :data-deal_id="deal.id">
    <div class="deal-thumb__base" :class="{'context': context}">
      <div class="deal-thumb__base__status">
        <div class="deal-thumb__base__status__marker">
          {{ state_labels[status] }}
        </div>
        <div class="deal-thumb__base__status__top"
        v-if="deal.in_top && (status  == 'sales_on')">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 4L21 16.3431C21 19.9068 16.6914 21.6914 14.1715 19.1716L1.8284 6.82843C-0.691463 4.30857 1.0932 0 4.65682 0L17 0C19.2091 0 21 1.79086 21 4ZM11.9843 15.4696L10.8294 10.798L6.15777 9.64307L10.2448 7.1022L9.90072 2.29859L13.5777 5.40043L18.0277 3.59966L16.227 8.04972L19.3288 11.7267L14.5252 11.3826L11.9843 15.4696Z"/>
          </svg>

        </div>
      </div>
      <div class="deal-thumb__base__content">
        <span class="deal-thumb__base__content__title">
          {{ deal.title }}
        </span>
        <div class="deal-thumb__base__content__data">
          <div class="deal-thumb__base__content__data__dates">
            <div class="deal-thumb__base__content__data__dates__id">
              <span class="demo" v-if="(deal.id == 0)">ID: DEMO</span>
              <span v-else>ID: {{ deal.id }}</span>
            </div>
            <div class="base__content__data__dates__table">
              <div class="base__content__data__dates__table__keys">
                <span v-if="(status == 'pending')">Запустится:</span>
                <span v-else>Запущена:</span>
                <span>Завершится:</span>
                <span>Активация до:</span>
                <span>Активна дней:</span>
              </div>
              <div class="base__content__data__dates__table__values">
                <span>{{ launchDate(deal.published_date) }}</span>
                <span>{{ finishedDate(deal.published_date, deal.duration) }}</span>
                <span>{{ activationDate(deal.published_date, deal.duration, deal.activation_lag) }}</span>
                <span>{{ onSales(deal.published_date) }}</span>
              </div>
            </div>

          </div>
          <div class="deal-thumb__base__content__data__funnel">
            <span class="deal-thumb__base__content__data__funnel__left-title">Воронка</span>
            <div class="deal-thumb__base__content__data__funnel__table">

              <div class="funnel__stair views">
                <div class="stair__label">
                  <div class="label__icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99996 3C4.66663 3 1.81996 5.07333 0.666626 8C1.81996 10.9267 4.66663 13 7.99996 13C11.3333 13 14.18 10.9267 15.3333 8C14.18 5.07333 11.3333 3 7.99996 3ZM7.99996 11.3333C6.15996 11.3333 4.66663 9.84 4.66663 8C4.66663 6.16 6.15996 4.66667 7.99996 4.66667C9.83996 4.66667 11.3333 6.16 11.3333 8C11.3333 9.84 9.83996 11.3333 7.99996 11.3333ZM7.99996 6C6.89329 6 5.99996 6.89333 5.99996 8C5.99996 9.10667 6.89329 10 7.99996 10C9.10663 10 9.99996 9.10667 9.99996 8C9.99996 6.89333 9.10663 6 7.99996 6Z"/>
                  </svg>
                </div>
                  <span class="label__text">посмотрели:</span>
                </div>
                <span class="summary">{{ deal.statistic_summary.viewed }}</span>
                <span class="daily" :class="zero(deal, 'viewed')">{{ deal.statistic_daily.viewed }}</span>
              </div>

              <div class="funnel__stair buyed">
                <div class="stair__label">
                  <div class="label__icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 12V12.6667C14 13.4 13.4 14 12.6667 14H3.33333C2.59333 14 2 13.4 2 12.6667V3.33333C2 2.6 2.59333 2 3.33333 2H12.6667C13.4 2 14 2.6 14 3.33333V4H8C7.26 4 6.66667 4.6 6.66667 5.33333V10.6667C6.66667 11.4 7.26 12 8 12H14ZM8 10.6667H14.6667V5.33333H8V10.6667ZM10.6667 9C10.1133 9 9.66667 8.55333 9.66667 8C9.66667 7.44667 10.1133 7 10.6667 7C11.22 7 11.6667 7.44667 11.6667 8C11.6667 8.55333 11.22 9 10.6667 9Z"/>
                  </svg>
                </div>
                  <span class="label__text">купили:</span>
                </div>
                <span class="summary">{{ deal.statistic_summary.buyed }}</span>
                <span class="daily" :class="zero(deal, 'buyed')">{{ deal.statistic_daily.buyed }}</span>
              </div>

              <div class="funnel__stair activated">
                <div class="stair__label">
                  <div class="label__icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6666 6.66675C13.9333 6.66675 13.3333 7.26675 13.3333 8.00008C13.3333 8.73341 13.9333 9.33341 14.6666 9.33341V12.0001C14.6666 12.7334 14.0666 13.3334 13.3333 13.3334H2.66659C1.93325 13.3334 1.33325 12.7334 1.33325 12.0001V9.33341C2.07325 9.33341 2.66659 8.73341 2.66659 8.00008C2.66659 7.26675 2.07325 6.66675 1.33992 6.66675V4.00008C1.33992 3.26675 1.93325 2.66675 2.66659 2.66675H13.3333C14.0666 2.66675 14.6666 3.26675 14.6666 4.00008V6.66675ZM5.91986 7.50006L7.50486 9.08506L11.2999 5.29506L12.0049 6.00006L7.50486 10.5001L5.20986 8.20506L5.91986 7.50006Z"/>
                  </svg>
                </div>
                  <span class="label__text">активировали:</span>
                </div>
                <span class="summary">{{ deal.statistic_summary.activated }}</span>
                <span class="daily" :class="zero(deal, 'activated')">{{ deal.statistic_daily.activated }}</span>
              </div>

              <div class="funnel__stair raiting">
                <div class="stair__label">
                  <div class="label__icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00004 11.5133L12.12 13.9999L11.0267 9.31325L14.6667 6.15992L9.87337 5.75325L8.00004 1.33325L6.12671 5.75325L1.33337 6.15992L4.97337 9.31325L3.88004 13.9999L8.00004 11.5133Z"/>
                  </svg>
                </div>
                  <span class="label__text">рейтинг:</span>
                </div>
                <span class="summary">{{ deal.statistic_summary.raiting }}</span>
                <div class="daily" v-html="rateDymanic(deal.statistic_summary.raiting, deal.statistic_daily.raiting_ystd)"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="actions">
        <div v-if="!deal.in_top && (status == 'sales_on')" class="button up-to-top">
          <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6.5L18.29 8.79L13.41 13.67L9.41 9.67L2 17.09L3.41 18.5L9.41 12.5L13.41 16.5L19.71 10.21L22 12.5V6.5H16Z"/>
          </svg>
          <div class="label">Поднять в ТОП</div>
        </div>
        <div v-if="(status  != 'pending')" class="button show-more" @click="menu">
          <div class="label">СМОТРЕТЬ БОЛЬШЕ</div>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10.5C4.9 10.5 4 11.4 4 12.5C4 13.6 4.9 14.5 6 14.5C7.1 14.5 8 13.6 8 12.5C8 11.4 7.1 10.5 6 10.5ZM18 10.5C16.9 10.5 16 11.4 16 12.5C16 13.6 16.9 14.5 18 14.5C19.1 14.5 20 13.6 20 12.5C20 11.4 19.1 10.5 18 10.5ZM12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"/>
          </svg>
        </div>
        <div v-if="status == 'pending'" class="button preview-on-site">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17.5H7V8.5H9V6.5H7C5.89 6.5 5 7.4 5 8.5V17.5C5 18.6 5.89 19.5 7 19.5H16C17.1 19.5 18 18.6 18 17.5V15.5H16V17.5ZM11 6.5V8.5H14.59L9.76 13.33L11.17 14.74L16 9.91V13.5H18V6.5H11Z"/>
          </svg>
          <div class="label">Предпросмотр на сайте</div>
        </div>
      </div>
    </div>
    <deal-context-menu
    v-if="status != 'pending'"
    :data-status="createLabel(deal)"
    :class="{'visible': context}"
    ></deal-context-menu>
  </div>
</template>

<!-- <script src="./hammer.min.js"></script> -->
<script>
// import "./hammer.min.js"
export default {
  props: {
    deal: {
      type: Object,
      default: function() {
        return {
          id:0,
          title:'Демонстрационная акция! Изучи функционал мерчант кабинета на этом примере.',
          in_top:false,
          published_date:'January 30, 2020 00:00:00 GMT+06:00',
          duration:360,
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
        }
      }
    }
  },
  data: function() {
    return {
      context: false,
      status: '',
      icons: {
      },
      date_format:{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      locale:'ru-RU',
      state_labels: {
        sales_off:'продажи завершены',
        sales_on:'продажи открыты',
        finished:'акция завершена',
        pending:'акция не опубликована',
        demo:'демонстрационная',
      },
		}
  },
  mounted: function() {
    this.status = this.$el.getAttribute('data-status')
    // console.log(this.status)

    // let recaptchaScript = document.createElement('script')
    //   recaptchaScript.setAttribute('src', './hammer.min.js')
    //   document.head.appendChild(Hammer)
  },
  methods: {
    menu: function(event) {
      // event.target.setAttribute('clicked', '1')
      // console.log(id)
      // var workday = this.week[index].workday
      this.context = !this.context
      // console.log(this.week[index].full)
      // console.log(this.week)
    },
    zero: function(deal, param) {
      // console.log(param + deal.statistic_daily[param]);
      if (deal.statistic_daily[param] == 0) {
        return 'zero'
      }
      else {
        return 'plus'
      }
    },
    createLabel: function(d) {
      var now = Date.now()
      var publ = new Date(d.published_date).getTime()
      // console.log((now - publ)/1000/60/60/24)
      var different = Math.floor((now - publ)/1000/60/60/24)
      if (different <= d.duration && different >= 0) {
        return 'sales_on'
      }
      else if (different >= d.duration && different <= (d.duration + d.activation_lag)) {
        return 'sales_off'
      }
      else if (different < 0) {
        return 'pending'
      }
      else return 'finished'
    },
    launchDate: function(publ) {
      var convertPublic = new Date(publ)
      return convertPublic.toLocaleString(this.locale, this.date_format)
    },
    activationDate: function(publ, duration, lag) {
      var convertPublic = new Date(publ).getTime()
      var convertedDur = new Date(convertPublic + (duration*1000*60*60*24)).getTime()
      var convertedLag = new Date(convertedDur + (lag*1000*60*60*24))
      // console.log(convertedLag)
      return convertedLag.toLocaleString(this.locale, this.date_format)
    },
    finishedDate: function(publ, duration) {
      var convertPublic = new Date(publ).getTime()
      var convertedDur = new Date(convertPublic + (duration*1000*60*60*24))
      return convertedDur.toLocaleString(this.locale, this.date_format)
    },
    onSales: function(publ) {
      var convertPublic = new Date(publ).getTime()
      var diff = (Date.now() - convertPublic)/1000/60/60/24
      if (diff > 0) {
        return Math.floor(diff)
      }
      else return '—'
    },
    rateDymanic: function(td, ystd) {
      var different = (td*100 - ystd*100)/100
      // console.log(different)
      if (different > 0) {
        return ('<span class="up">▴ ' + different + '</span>')
      }
      else if (different < 0) {
        return ('<span class="down">▾ ' + Math.abs(different) + '</span>')
      }
      else return ('<span class="zero">–</span>')
    }
  },
  computed: {

  },

  watch: {
  },

};

</script>


<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
@import './assets/css/deal-thumbnail.css';
</style>
