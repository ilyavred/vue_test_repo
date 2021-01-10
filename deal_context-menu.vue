<template>
	<div class="context_menu">
		<div class="menu__list">
			<a
			v-for="i in actions_list"
			v-if="!(((status == 'sales_off' || status == 'finished') && i.order == 5) || (status == 'finished' && i.order == 0))"
			class="menu__list__item"
			:class="{'iconed': i.icon, 'highlighted': i.highlight}"
			:href="i.link"
			:style="{ order: + i.order }"
			>
			{{ i.label }}
			<svg v-if="i.icon" class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="i.path"></svg>
			</a>
		</div>
	</div>
</template>

<script>
export default {
  props: {

  },
	mounted: function() {
    this.status = this.$el.getAttribute('data-status'),
		this.inTop = this.$el.getAttribute('data-top')
	},
  data: function() {
    return {
			status:'',
			actions_list: [
				{
					label:'Активировать сертификат',
					link:'#',
					icon:false,
					highlight: false,
					order:0
				},
				{
					label:'Смотреть статистику',
					link:'#',
					icon:false,
					highlight: false,
					order:1
				},
				{
					label:'Звонки по акции',
					link:'#',
					icon:false,
					highlight: false,
					order:2
				},
				{
					label:'Смотреть вопросы',
					link:'#',
					icon:false,
					highlight: false,
					order:3
				},
				{
					label:'Смотреть отзывы',
					link:'#',
					icon:false,
					highlight: false,
					order:4
				},
				{
					label:'Продлить акцию',
					link:'#',
					icon:false,
					highlight: true,
					order:5
				},
				{
					label:'Сводка по финансам',
					link:'#',
					icon:false,
					highlight: false,
					order:6
				},
				{
					label:'Смотреть на chocolife.me',
					link:'#',
					icon:true,
					path:'<path d="M10.6666 11.3333H4.66665V5.33333H5.99998V4H4.66665C3.92665 4 3.33331 4.6 3.33331 5.33333V11.3333C3.33331 12.0667 3.92665 12.6667 4.66665 12.6667H10.6666C11.4 12.6667 12 12.0667 12 11.3333V10H10.6666V11.3333ZM7.33331 4V5.33333H9.72665L6.50665 8.55333L7.44665 9.49333L10.6666 6.27333V8.66667H12V4H7.33331Z"/>',
					highlight: false,
					order:7
				},
			]
		}
  },
  mounted: function() {
    this.status = this.$el.getAttribute('data-status')
    console.log(this.status)
  },
};
</script>

<style>
@import './assets/css/deal-context-menu.css';
</style>
