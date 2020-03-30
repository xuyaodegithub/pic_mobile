<template>
	<div>
		<vHeader></vHeader>
		<router-view></router-view>
	</div>
</template>

<script>
	import vHeader from "@/components/h_header/index.vue"
	export default {
		data() {
			return {

			}
		},
		components:{
			vHeader
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
.view{
	min-height: 100%;
}
</style>
