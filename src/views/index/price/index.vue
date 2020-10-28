<template>
    <div class="price">
        <!--        <v-header></v-header>-->
        <h3>获取高分辨率图像</h3>
        <p>1图像消耗1次</p>
        <div class="list">
            <div class="flex a-i titles">
                <div class="left" @click="changeType(0)" :class="{'active' : type===0}">
                    <div class="title">包月套餐 <span>超值</span></div>
                    <p>包月用不完，续费累积5个月</p>
                </div>
                <div class="right" @click="changeType(1)" :class="{'active' : type===1}">
                    <div class="title">按次购买</div>
                    <p>没有时间限制，永久使用</p>
                </div>
            </div>
            <div class="numList">
                <van-radio-group v-model="radio" checked-color="#ed1e56" @change="change">
                    <van-radio :name="item.id" v-for="(item,idx) in priceList" :key="idx"
                               :class="{active : radio===item.id}">
                        <div class="flex a-i">
                            <span>{{item.num}}次</span>
                            <span>￥{{item.price}}</span>
                            <span>￥{{item | Calculation}}/次</span>
                        </div>
                    </van-radio>
                </van-radio-group>
            </div>
            <div class="toopli" v-if="type===1">
                *购买的次数没有使用时间限制
            </div>
        </div>
        <div class="month" v-if="!type">
            <van-radio-group v-model="radio2" checked-color="#ed1e56" @change="change">
                <van-radio :name="item.val" v-for="(item,idx) in monthList" :key="idx"
                           :class="{active : radio2===item.val}">
                    <div v-if="seleceItem">
                        {{item.title}}  <span style="color: #ed1e56;" v-if="item.val===1">￥{{seleceItem.price}}</span>
                        <span style="color: #ed1e56;" v-if="item.val===12">￥{{parseFloat(seleceItem.price*12*0.9).toFixed(1)}} <i style="font-size: 0.24rem">({{`月费￥${seleceItem.price} X 12个月 X 0.9折`}})</i></span>
                    </div>
                </van-radio>
            </van-radio-group>
        </div>
        <div class="wechat flex a-i">
            <van-icon name="wechat" size="0.44rem" color="#00B802"/>
            微信支付
        </div>
        <div class="fixed flex a-i">
            <span v-if="priceList.length>0">￥{{seleceItem | Calculation(type,radio2)}}<i>/次</i></span>
            <!--            <van-button round block @click="$router.push('/concat')">联系我们购买</van-button>-->
            <van-button round block @click="creatPlan">立即购买</van-button>
        </div>
    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    import {subscriptionPlans, userCreatePayment} from '@/apis'
    import {wxJssdkData} from '@/apis/wxJssdk.js'
    import {Toast} from 'vant';
    import { BrowserInfo } from '@/utils'
    import Cookies from 'js-cookie'
    export default {
        name: "index",
        data() {
            return {
                type: 0,
                monthList: [{title: '按月付费', val: 1}, {title: '按年付费', val: 12}],
                radio: 1,
                radio2: 1,
                planList: [],
                planList2: []
            }
        },
        computed: {
            priceList() {
                const arr= this.type ? this.planList2 : this.planList;
                return arr.length>0 ? arr : []
            },
            seleceItem() {
                return this.priceList.find( v => v.id === this.radio )
            },
            yearPrice(){

            }
        },
        components: {
            vHeader
        },
        filters: {
            Calculation(val, type, radio2) {
                let price = (type === 0 && radio2 === 12) ? val.price * 0.9 : val.price;
                let creditsPerMonth = val.num;
                return (price / creditsPerMonth).toFixed( 3 )
            },
        },
        methods: {
            changeType(idx) {
                if (idx === this.type) return;
                this.type = idx;
                this.radio = this.type ? this.planList2[2].id : this.planList[2].id;
            },
            initPlanList() {
                subscriptionPlans( {productType: 3} ).then( res => {
                    if (!res.code) {
                        this.planList = res.data;
                        this.radio = res.data[2].id;
                    }
                } )
                subscriptionPlans( {productType: 2} ).then( res => {
                    if (!res.code) {
                        this.planList2 = res.data;
                        // this.radio = res.data[0].id;
                    }
                } )
            },
            change(name) {

            },
            creatPlan() {
                Toast.loading(
                    {
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                    }
                )
                let data = {
                    productId: this.radio,
                    h5: 1,
                },that=this;
                if (!this.type) data['num'] = this.radio2;
                if(BrowserInfo.isWeixin)data['h5'] = 2;
                userCreatePayment( data ).then( res => {
                    if(BrowserInfo.isWeixin){
                        let result=res.data;
                        result['package']=result.packageValue;
                        delete result.packageValue;
                        console.log(result);
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            result,
                            function (reson) {
                                // WeixinJSBridge.log( res.err_msg );
                                if(reson.err_msg == "get_brand_wcpay_request:ok" ){//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                    that.$router.replace('/count')
                                }
                                // alert( res.err_code + res.err_desc + res.err_msg );
                            }
                        )
                    }else  window.location.href = res.data.codeURL + `&redirect_url=${encodeURIComponent( 'http://m.picup.shop/index.html#/count' )}`

                } ).finally( () => {
                    Toast.clear()
                } )
            }
        },
        mounted() {
            console.log(Cookies.get('openid'),BrowserInfo.isWeixin,`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx695bf5a85133ef4c&redirect_uri=http://m.picup.shop/weixinMp/oauth2Callback&state=${encodeURIComponent('http://m.picup.shop/#/price')}&response_type=code&scope=snsapi_base`);
            if(BrowserInfo.isWeixin){
                if(!Cookies.get('openid')){
                    window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx695bf5a85133ef4c&redirect_uri=http://m.picup.shop/weixinMp/oauth2Callback&state=${encodeURIComponent('http://m.picup.shop/#/price')}&response_type=code&scope=snsapi_base`
                }
            }
            this.initPlanList()
        },
        created() {
            const data = {
                title: '一键人像抠图———在线换背景',
                desc: '不必专业PS，新手小白都会用',
                link: window.location.href,
                imgUrl: 'http://guoqing.deeplor.com/img/share_p.jpg'
            };
            wxJssdkData( this, data );
        }
    }
</script>

<style scoped lang="scss">
    .price {
        line-height: 1;
        background-color: #F5F5F7;
        padding: 0 .34rem 1.5rem;

        .titles {
            line-height: 1;
            font-size: .24rem;
            color: #BEBEBE;
            text-align: center;
            border-bottom: 1px solid #eee;

            .left {
                border-right: 1px solid #eee;
            }

            .active:after {
                content: '';
                position: absolute;
                width: 30%;
                height: 2px;
                left: 50%;
                bottom: 0;
                background-color: $theme;
                transform: translateX(-50%);
            }

            & > div {
                flex: 1;
                padding: .24rem 0;
                position: relative;

                .title {
                    font-size: .34rem;
                    line-height: .46rem;
                    color: #333;

                    span {
                        display: inline-block;
                        font-size: .24rem;
                        color: #fff;
                        background-color: $theme;
                        padding: 0 .15rem;
                        line-height: .36rem;
                        border-radius: .23rem .23rem .23rem 0;
                    }
                }
            }
            & > .active .title{
                color: $theme;
            }
        }

        .list {
            background-color: #fff;
            border-radius: 0.3rem;
        }

        h3 {
            font-size: .46rem;
            color: #333;
            text-align: center;
            padding: .7rem 0 .2rem 0;
        }

        & > p {
            font-size: .22rem;
            color: rgba(151, 151, 151, 1);
            text-align: center;
            margin-bottom: .55rem;
        }

        .van-radio-group {
            font-size: .3rem;
            color: #fff;

            .a-i {
                justify-content: space-between;
            }
        }

        .toopli {
            padding: .32rem .42rem .32rem;
            color: $theme;
            background-color: #F6F6F6;
        }

        .month {
            background-color: #fff;
            border-radius: .3rem;
            margin-top: .2rem;
        }

        .wechat {
            padding: .3rem .42rem;
            background-color: #fff;
            margin-top: .2rem;
            border-radius: .3rem;
            font-size: .28rem;

            .van-icon {
                margin-right: .2rem;
            }
        }

        .van-button {
            background-color: $theme;
            color: #fff;
            width: 50%;
        }

        .fixed {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            padding: .15rem .4rem;
            font-size: .44rem;
            color: $theme;
            justify-content: space-between;

            i {
                font-size: .28rem;
            }
        }
    }
</style>
