<template>
		<div class="coupon-activation">
				<input class="coupon-activation__input"
								ref="activation__input"
								v-bind:type="dynamicType"
								v-model="activationCode"
								maxlength="9"
								placeholder="00000-XXX"
								pattern="[0-9A-Za-z]{9}"
								autocomplete="off"
								@keyup="viewer($event)"
								@blur="complete($event)"
						/>
        <button :class="['coupon-activation__button', button.action]" @click="action($event)" :disabled="button.disable" :data-action="button.action">{{ button.text }}</button>
		</div>
</template>

<script>
  export default {
    props: [],

    data() {
      return {
        // validator: false,
        // button: {text:'Активировать', disable:true},
        activationCode: '',
				dynamicType: 'tel'
      }
    },

    methods: {
      viewer(event) {
        var key = event.key
        // console.log(event.key)
        var val = event.target.value
        var len = event.target.value.length
        var lastkey = event.target.value.substr(-1)
        var keysDel = ['Delete', 'Backspace']
        // console.log(lastkey.match(/[A-z]/g));
        if (len <= 5) {
          this.dynamicType = 'tel'
          if (len == 5 && !keysDel.includes(key) && lastkey.match(/[A-z]/g) == null) {
            this.activationCode = val + '-'
            this.$refs.activation__input.blur()
            this.dynamicType = 'text'
            this.$refs.activation__input.focus()
          }
          else if (len < 5 && lastkey == ('-', ' ')) {
            val = '00000' + val
            if (lastkey == ' ') {
              val = val.trim() + '-'
            }
            this.activationCode = val.substr(-6)
            this.dynamicType = 'text'
          }
          else if (len < 3  && lastkey.match(/[A-z]/g) != null && lastkey != '-' && !keysDel.includes(key)) {
            this.activationCode = val.slice(0, -1) + '-' + lastkey
          }
        }
      },

      complete(event) {
        var val = event.target.value
        val = val.trim()
        if (val != '') {
          val = '00000' + val

          var nums = val.match(/[^A-z\-_–—]\d*/g)[0].substr(-5)
          // }
          if (val.match(/[A-z]/g) == null) {
            this.activationCode = nums + '-'
          }
          else {
            var abcs = val.match(/[^0-9\-–_—]\D*/g)[0]
            this.activationCode = nums + '-' + abcs
          }
        }
      },

      action(event) {
        var data = event.target.dataset.action
        console.log(data)
        if (data == 'activate') {
          console.log(data)
        }
        else if (data == 'reset') {
          this.activationCode = ''
          this.$refs.activation__input.focus()
        }
      }
    },

    computed: {
      validator: function() {
        var code = this.activationCode
        var find = code.match(/\d{1,5}[-][A-z]{1,3}/g)
        if (find != null) {
          this.activationCode = find
          return true
        }
        else return false
      },

      button: function() {
        if (this.activationCode.length > 0 && this.validator == false) {
          return {text:'Сбросить', disable:false, action:'reset'}
        }
        else if (this.activationCode.length == 0) {
          return {text:'Активировать', disable:true, action:'none'}
        }
        else return {text:'Активировать', disable:false, action:'activate'}
        }
    }
  }
</script>

<style>
@import './assets/css/activate.css';
</style>
