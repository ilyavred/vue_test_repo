<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="sheduller">
    <div v-for="day in week" class="week-day" :class="adjoined[day.index]" :data-time="day.from + '-' + day.to">
      <span class="radio-button" :class="" @click="toggle($event)" :data-index="day.index">
        {{ day.shirt }}
      </span>
      <div class="bracket"><span class="outline"></span></div>
      <span class="add-different">+ Другой режим</span>
      <span class="clear-diff">очистить</span>
      <div class="day-shedule" :style="{ top: day.inpshift + 'px' }"><input class="input-from" type="time" v-model="day.from"/><input class="input-to" type="time" v-model="day.to"/></div>
    </div>
<!--     <span> {{ adjoined }} {{ timesetter }} </span> -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      packages: {
        1: "pack first",
        2: "pack",
        3: "pack",
        4: "pack",
        5: "pack last",
        6: "packoff first",
        7: "packoff last"
      },
      inputgroup: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
      },
      week: {
        1:{
          index: 1,
          shirt:'пн',
          full:'понедельник',
          from:'09:00',
          to:'18:00',
          workday: true,
          state: 'pack first',
          inpshift: '72',
        },
        2:{
          index: 2,
          shirt:'вт',
          full:'вторник',
          from:'09:00',
          to:'18:00',
          workday: true,
          state: 'pack',
          inpshift: '0',
        },
        3:{
          index: 3,
          shirt:'ср',
          full:'среда',
          from:'09:00',
          to:'18:00',
          workday: true,
          state: 'pack',
          inpshift: '0',
        },
        4:{
          index: 4,
          shirt:'чт',
          full:'четверг',
          from:'09:00',
          to:'18:00',
          workday: true,
          state: 'pack',
          inpshift: '0',
        },
        5:{
          index: 5,
          shirt:'пт',
          full:'пятница',
          from:'09:00',
          to:'18:00',
          workday: true,
          state: 'pack last',
          inpshift: '0',
        },
        6:{
          index: 6,
          shirt:'сб',
          full:'суббота',
          from:'09:00',
          to:'16:00',
          workday: false,
          state: 'packoff first',
          inpshift: '18',
        },
        7:{
          index: 7,
          shirt:'вс',
          full:'воскресенье',
          from:'09:00',
          to:'16:00',
          workday: false,
          state: 'packoff last',
          inpshift: '0',
        },
      },
    };
  },
  methods: {
    toggle: function(event) {
      var index = event.target.dataset.index
      // console.log(index)
      var workday = this.week[index].workday
      this.week[index].workday = !workday
      // console.log(this.week[index].full)
      // console.log(this.week)
    },
  },
  computed: {
//     timesetter: function() {
//       var temp = {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//         6: 0,
//         7: 0
//       }
//       var find = ''
//       for (var i in this.packages) {
//         // temp[i] = 0
//         // console.log(i)
//         if (this.packages[i].includes('pack')) {

//           if (this.packages[i].includes('first')) {
//             find = i
//           }
//           temp[find] += 1
//         }
//       }
//       for (var t in temp) {
//         // console.log(t)
//         if (temp[t] > 1) {
//           var shift = ((36 * temp[t]) - 36) / 2
//         }
//         else {
//           var shift = 0
//         }
//         console.log(shift)
//         this.week[t].inpshift = shift
//       }
//       this.inputgroup = temp
//       console.log(this.inputgroup)
//       return this.inputgroup
//     },

    adjoined: function() {
        var temp = {}

        var packages = function(val, week) {
          // var week = this.week
          var week = week
          var temp = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
          }
          var find = ''
          var timefrom = ''
          var timeto =''
          for (var i in val) {
            // temp[i] = 0
            // console.log(i)
            if (val[i].includes('pack')) {

              if (val[i].includes('first')) {
                find = i
                timefrom = week[i].from
                timeto = week[i].to
              }
              else {
                week[i].from = timefrom
                week[i].to = timeto
              }
              temp[find] += 1
              console.log(timefrom + '-' + timeto)
            }
          }
          // console.log(week)
          for (var t in temp) {
            // console.log(t)
            if (temp[t] > 1) {
              var shift = ((36 * temp[t]) - 36) / 2
            }
            else {
              var shift = 0
            }
            // console.log(shift)
            week[t].inpshift = shift
          }
          // this.week = week
          // this.inputgroup = temp
          // console.log(temp)
          return [week, temp]
        }

        var prevIntrprttr = function(prev, current, nextsem) {

          var fm = ['f', 'm']

          var nsloff = ['n', 'soff', 'loff', 'l', 's']
          var fmoff = ['foff', 'moff', 'f', 'm']

          // для рабочих дней
          if (nsloff.includes(prev) && nextsem[0] && nextsem[1] && current) {
            return ['pack first', 'f']
          }
          else if (fm.includes(prev) && nextsem[0] && nextsem[1] && current) {
            return ['pack', 'm']
          }
          else if (fm.includes(prev) && (!nextsem[0] || !nextsem[1]) && current) {
            return ['pack last', 'l']
          }
          else if (nsloff.includes(prev) && (!nextsem[0] || !nextsem[1]) && current) {
            return ['single', 's']
          }

          // для нерабочих дней
          else if (nsloff.includes(prev) && nextsem[0] && !nextsem[1] && !current) {
            return ['packoff first', 'foff']
          }
          else if (fmoff.includes(prev) && nextsem[0] && !nextsem[1] && !current) {
            return ['packoff', 'moff']
          }
          else if (fmoff.includes(prev) && (!nextsem[0] || nextsem[1]) && !current) {
            return ['packoff last', 'loff']
          }
          else if (nsloff.includes(prev) && (!nextsem[0] || nextsem[1]) && !current) {
            return ['singleoff', 'soff']
          }
          else return ['exec', 'soff']
        }

        var previous = 'n'
        // var i = 0
        for (var d in this.week) {
          // console.log(d)
          var index = this.week[d].index
          var preindex = (index - 1).toString()
          var nexindex = (index + 1).toString()

          if (index in [1, 2, 3, 4, 5, 6, 7]) {
          if (this.week[nexindex].from == this.week[d].from && this.week[nexindex].to == this.week[d].to) {
            var timeMatch = true
            }
          else {
            var timeMatch = false
            }
          var workMatch = this.week[nexindex].workday
          }
          else if ((parseInt(d) + 1) > 6) {
            var timeMatch = false
          }
          else {
            var timeMatch = false
            var workMatch = false
          }
          var currentWork = this.week[d].workday
          var nextSem = [timeMatch, workMatch]
          var result = prevIntrprttr(previous, currentWork, nextSem)
          temp[d] = result[0]
          previous = result[1]
          this.week[d].state = temp[d]
          // i += 1
        }
        var updateweek = packages(temp, this.week)
        // this.week = updateweek[0]
        // this.inputgroup = updateweek[1]
        this.packages = temp
        console.log(this.packages)
        return this.packages
    },
  },

  watch: {
//     week: function(week) {
//         var temp = {}

//         var packages = function(val, weekorgnl) {
//           // var week = this.week
//           var week = weekorgnl
//           var temp = {
//             1: 0,
//             2: 0,
//             3: 0,
//             4: 0,
//             5: 0,
//             6: 0,
//             7: 0
//           }
//           var find = ''
//           var timefrom = ''
//           var timeto =''
//           for (var i in val) {
//             // temp[i] = 0
//             // console.log(i)
//             if (val[i].includes('pack')) {

//               if (val[i].includes('first')) {
//                 find = i
//                 timefrom = week[i].from
//                 timeto = week[i].to
//               }
//               else {
//                 week[i].from = timefrom
//                 week[i].to = timeto
//               }
//               temp[find] += 1
//               console.log(timefrom + '-' + timeto)
//             }
//           }
//           // console.log(week)
//           for (var t in temp) {
//             // console.log(t)
//             if (temp[t] > 1) {
//               var shift = ((36 * temp[t]) - 36) / 2
//             }
//             else {
//               var shift = 0
//             }
//             // console.log(shift)
//             week[t].inpshift = shift
//           }
//           // this.week = week
//           // this.inputgroup = temp
//           // console.log(temp)
//           return [week, temp]
//         }

//         var prevIntrprttr = function(prev, current, nextsem) {

//           var fm = ['f', 'm']

//           var nsloff = ['n', 'soff', 'loff', 'l', 's']
//           var fmoff = ['foff', 'moff', 'f', 'm']

//           // для рабочих дней
//           if (nsloff.includes(prev) && nextsem[0] && nextsem[1] && current) {
//             return ['pack first', 'f']
//           }
//           else if (fm.includes(prev) && nextsem[0] && nextsem[1] && current) {
//             return ['pack', 'm']
//           }
//           else if (fm.includes(prev) && (!nextsem[0] || !nextsem[1]) && current) {
//             return ['pack last', 'l']
//           }
//           else if (nsloff.includes(prev) && (!nextsem[0] || !nextsem[1]) && current) {
//             return ['single', 's']
//           }

//           // для нерабочих дней
//           else if (nsloff.includes(prev) && nextsem[0] && !nextsem[1] && !current) {
//             return ['packoff first', 'foff']
//           }
//           else if (fmoff.includes(prev) && nextsem[0] && !nextsem[1] && !current) {
//             return ['packoff', 'moff']
//           }
//           else if (fmoff.includes(prev) && (!nextsem[0] || nextsem[1]) && !current) {
//             return ['packoff last', 'loff']
//           }
//           else if (nsloff.includes(prev) && (!nextsem[0] || nextsem[1]) && !current) {
//             return ['singleoff', 'soff']
//           }
//           else return ['exec', 'soff']
//         }

//         var previous = 'n'
//         // var i = 0
//         for (var d in week) {
//           // console.log(d)
//           var index = week[d].index
//           var preindex = (index - 1).toString()
//           var nexindex = (index + 1).toString()

//           if (index in [1, 2, 3, 4, 5, 6, 7]) {
//           if (week[nexindex].from == week[d].from && week[nexindex].to == week[d].to) {
//             var timeMatch = true
//             }
//           else {
//             var timeMatch = false
//             }
//           var workMatch = week[nexindex].workday
//           }
//           else if ((parseInt(d) + 1) > 6) {
//             var timeMatch = false
//           }
//           else {
//             var timeMatch = false
//             var workMatch = false
//           }
//           var currentWork = week[d].workday
//           var nextSem = [timeMatch, workMatch]
//           var result = prevIntrprttr(previous, currentWork, nextSem)
//           temp[d] = result[0]
//           previous = result[1]
//           this.week[d].state = temp[d]
//           // i += 1
//         }
//         var updateweek = packages(temp, week)
//         this.week = updateweek[0]
//         this.inputgroup = updateweek[1]
//         this.packages = temp
//         // console.log(this.packages)
//         // return this.packages
//     },
//     packages: function(val) {
//       var temp = {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//         6: 0,
//         7: 0
//       }
//       var find = ''
//       var timefrom = ''
//       var timeto =''
//       for (var i in val) {
//         // temp[i] = 0
//         // console.log(i)
//         if (val[i].includes('pack')) {

//           if (val[i].includes('first')) {
//             find = i
//             timefrom = this.week[i].from
//             timeto = this.week[i].to
//           }
//           else {
//             this.week[i].from = timefrom
//             this.week[i].to = timeto
//           }
//           temp[find] += 1
//           console.log(this.week[i].to)
//         }
//       }
//       for (var t in temp) {
//         // console.log(t)
//         if (temp[t] > 1) {
//           var shift = ((36 * temp[t]) - 36) / 2
//         }
//         else {
//           var shift = 0
//         }
//         // console.log(shift)
//         this.week[t].inpshift = shift
//       }
//       this.inputgroup = temp
//       console.log(this.inputgroup)
//       // return this.inputgroup
//     }
  },

};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
@import './assets/css/sheduller.css';
</style>
