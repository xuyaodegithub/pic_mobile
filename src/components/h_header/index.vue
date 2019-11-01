<template>
	<div>
		<div style="height:.9rem "></div>
		<div class="h_header flex a-i">
			<img src="../../assets/images/sureLogo.png"/>
			<img src="../../assets/images/h_index.png" @click="show=!show"/>
			<div class="pages" :class="{active : show}">
				<div v-for="(item,idx) in pageList" :key="idx" @click="changePage(item)">{{item.title}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getToken,removeToken } from '@/utils/auth'
    export default {
        data() {
            return {
                msg: '',
				pageList:[
					{url:'index.html',title:'返回首页'},
					{url:'people.html',title:'人像抠图'},
					{url:'object.html',title:'物体抠图'},
					{url:'guo.html',title:'国庆同框'},
					{url:'travle.html',title:'一键旅拍'},
					{url:'index.html#/count',title:'我的账户'},
				],
				show:false
            }
        },
        methods: {
			changePage(item){
				if(item.title==='我的账户' && !getToken()){
					window.location.href='index.html#/login'
					return
				}
				if(item.title.indexOf(document.title)>-1){
					this.show=false
					return;
				}
				window.location.href=item.url;
			}
        }
    }
</script>

<style scoped lang="scss">
    .h_header{
		top: 0;
		left: 0;
		width: 100vw;
		position: fixed;
		height: .9rem;
		background-color: #303030;
		padding:0 .42rem;
		justify-content: space-between;
		z-index: 88;
		.pages{
			transition: all .3s;
			position: absolute;
			right: -100%;
			top: 100%;
			width: 2rem;
			font-size: .26rem;
			color: #fff;
			text-align: center;
			line-height: .78rem;
			background-color: rgba(0,0,0,.8);
			z-index: 10;
		}
		.active.pages{
			right: 0;
		}
		img:first-child{
			width: 1.9rem;
			height: .48rem;
		}
		img:nth-child(2){
			width: .42rem;
			height: .42rem;
		}
	}
</style>
