<template>
    <div class="price">
        <v-header></v-header>
        <h3>获取高分辨率图像</h3>
        <p>1图像消耗1次</p>
        <van-radio-group v-model="radio" checked-color="#ed1e56" @change="change">
            <van-radio :name="item.planId" v-for="(item,idx) in planList" :key="idx" :class="{active : radio===item.planId}">
                <div class="flex a-i">
                    <span>{{item.creditsPerMonth}}次</span>
                    <span>￥{{item.price}}</span>
                    <span>￥{{(item.price/item.creditsPerMonth).toFixed(2)}}/次</span>
                </div>
            </van-radio>
        </van-radio-group>
        <div class="toopli">
            *购买的次数没有使用时间限制
        </div>
        <div class="fixed flex a-i">
            <span v-if="planList.length>0">￥{{(seleceItem.price/seleceItem.creditsPerMonth).toFixed(2)}}<i>/次</i></span>
            <van-button round block>立即购买</van-button>
        </div>
    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    import { subscriptionPlans } from '@/apis'
    export default {
        name: "index",
        data() {
            return {
                radio:1,
                planList:[]
            }
        },
        computed:{
            seleceItem(){
                return this.planList.find(v=>v.planId===this.radio)
            }
        },
        components: {
            vHeader
        },
        methods:{
            initPlanList(){
                subscriptionPlans().then(res=>{
                    if(!res.code){
                        this.planList=res.data
                        this.radio=res.data[res.data.length-1].planId
                    }
                })
            },
            change(name){

            }
        },
        mounted() {
            this.initPlanList()
        }
    }
</script>

<style scoped lang="scss">
 .price{
     line-height: 1;
     background-color: #fff;
     h3{
         font-size: .46rem;
         color: #333;
         text-align: center;
         padding: .7rem 0 .2rem 0;
     }
     & > p{
         font-size: .22rem;
         color: rgba(151,151,151,1);
         text-align: center;
         margin-bottom: .55rem;
     }
     .van-radio-group{
         font-size: .3rem;
         color: #fff;
         .a-i{
             justify-content: space-between;
         }
     }
     .toopli{
         padding: .32rem .42rem 1.7rem;
         color: $theme;
         background-color: #F6F6F6;
     }
     .van-button{
         background-color: $theme;
         color: #fff;
         width: 50%;
     }
     .fixed{
         position: fixed;
         left: 0;
         bottom: 0;
         width: 100%;
         background-color: #fff;
         padding: .15rem .4rem;
         font-size: .44rem;
         color: $theme;
         justify-content: space-between;
         i{
             font-size: .28rem;
         }
     }
 }
</style>
