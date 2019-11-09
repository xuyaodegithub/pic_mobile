<template>
        <div class="count">
            <v-header></v-header>
            <div class="flex num a-i">
                <div>
                    <p>下载高清大图</p>
                    <p>剩余次数：{{userSub.freeRemaining}}</p>
                </div>
                <van-button round @click="$router.push('/price')">去充值</van-button>
            </div>
            <div class="apiset">
                <p>API密钥</p>
                <p>{{apiMsg}} <van-icon name="replay" @click="refreshApi" /></p>
                <p class="flex a-i" @click="goapi">阅读API文档 <van-icon name="arrow" /></p>
            </div>
            <div class="apiset">
                <p>账户设置</p>
                <p>手机号： {{userInfos.mobile}}</p>
                <p class="flex a-i" @click="$router.push('/change')">修改密码 <van-icon name="arrow" /></p>
            </div>
            <div class="apiset" @click="unlogin">
               退出登录
            </div>
        </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    import { userApikey,userRefreshApikey,getUserInfo,userSubscribe } from '@/apis'
    import { setToken,getToken,removeToken } from '@/utils/auth'
    import { mapGetters,mapActions } from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                userInfo:{},
                apiMsg:'',
                userSub:{}
            }
        },
        components:{
            vHeader
        },
        computed:{
            ...mapGetters([
                'userInfos'
            ])
        },
        mounted(){
            this.getApi()
            this.userSubscribes()
            if(getToken())this.getUserInfos()
        },
        methods:{
            ...mapActions([
                'getUserInfos'
            ]),
            getApi(){
                userApikey().then(res=>{
                    if(!res.code)this.apiMsg=res.data
                })
            },
            refreshApi(){
                userRefreshApikey().then(res=>{
                    if(!res.code)this.apiMsg=res.data
                })
            },
            // getInfo(){
            //     getUserInfo().then(res=>{
            //         if(!res.code)this.userInfo=res.data
            //     })
            // },
            userSubscribes(){
                userSubscribe().then(res=>{
                    if(!res.code)this.userSub=res.data
                })
            },
            unlogin(){
                removeToken()
                this.$router.replace('/login')
            },
            goapi(){
                window.location.href='docsify/#/apis.md'
            }
        }
    }
</script>

<style scoped lang="scss">
    .num,.apiset{
        padding: .5rem .4rem;
        font-size: .32rem;
        color: #333;
        line-height: 1;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: .2rem;
        p:first-child{font-weight: 600}
        p:last-child{
            font-size: .3rem;
            color: #989898;
            margin-top: .25rem;
        }
        .van-button{
            color: #fff;
            background-color: $theme;
            width: 1.8rem;
            height: .6rem;
            line-height: .6rem;

        }
    }
    .apiset > p:nth-child(2){
        font-size: .3rem;
        color: #989898;
        margin:.25rem 0 .45rem 0;
        .van-icon{
        margin-left: .3rem;
        }
    }
    .apiset > p:last-child{
        color: $theme;
        margin-bottom: .2rem;
        .van-icon{
            margin-left: .15rem;
        }
    }
    .apiset:last-child{
        margin-top: 0;
        text-align: center;
        padding: .3rem 0;
    }
</style>
