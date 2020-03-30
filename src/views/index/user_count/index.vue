<template>
        <div class="count">
<!--            <v-header></v-header>-->
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
                <p>邀请好友，获取免费次数</p>
                <p>邀请好友注册，你和好友都获赠20次大图</p>
                <p>将下面邀请码复制给好友，分享越多，获得次数越多</p>
                <p class="flex a-i" @click="copyyqma">邀请码：{{yqma}}</p>
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
    import { userApikey,userRefreshApikey,getUserInfo,userSubscribe,userGetInvitation } from '@/apis'
    import { setToken,getToken,removeToken } from '@/utils/auth'
    import { mapGetters,mapActions } from 'vuex'
    import { Dialog,Toast } from 'vant';
    export default {
        name: "index",
        data(){
            return {
                userInfo:{},
                apiMsg:'',
                userSub:{},
                yqma:''
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
            this.inityqma()
            if(getToken())this.getUserInfos()
        },
        methods:{
            ...mapActions([
                'getUserInfos'
            ]),
            copyyqma(){
                    let Url2=`还在看PS教程？一键抠图神器来了，一定要收藏哦，复制邀请码：${this.yqma}，打开www.picup.ai注册填入邀请码，即可获赠20次大图`;
                    let oInput = document.createElement('input');
                    oInput.value = Url2;
                    document.body.appendChild(oInput);
                    oInput.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    // oInput.className = 'oInput';
                    oInput.style.display='none';
                    oInput.blur()
                    Toast('复制成功')
            },
            inityqma(){
                userGetInvitation().then(res=>{
                    this.yqma=res.data
                })
            },
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
                Dialog.confirm({
                    title: '提示',
                    message: '确定要退出么?',
                    confirmButtonColor:'#ed1e56'
                }).then(() => {
                    removeToken()
                    this.$router.replace('/login')
                }).catch(() => {
                    // on cancel
                });

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
        p:nth-child(3){
            color: #989898;
            line-height: .48rem;
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
