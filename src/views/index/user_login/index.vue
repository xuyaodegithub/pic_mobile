<template>
    <div class="login">
<!--        <v-header></v-header>-->
        <van-tabs v-model="active">
            <van-tab title="密码登录">
                <div class="pass">
                    <van-field v-model="phone" placeholder="请输入手机号" type="tel" size="large"/>
                    <van-field v-model="pass" placeholder="请输入密码" type="password" size="large"/>
                    <van-button round block @click="login">登录</van-button>
                    <div class="gore flex">
                        <span @click="$router.push('/register')">快速注册</span>
                        <span @click="$router.push('/find')">忘记密码</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="短信登录">
                <v-yz @success="toShowCode" :visible.sync="showCode"></v-yz>
                <div class="pass mess">
                    <van-field v-model="phone" placeholder="请输入手机号" type="tel" size="large"/>
                    <van-field v-model="yzm" placeholder="请输入验证码" type="number" size="large"> <van-button slot="button" class="send" @click="send">{{timer ? timer :'发送验证码'}}</van-button></van-field>
                    <van-button round block @click="login">登录</van-button>
                    <div class="gore" @click="$router.push('/register')">快速注册</div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import vHeader from "@/components/h_header/index.vue"
    import { loginByMobile,sendCode,userLogin } from '@/apis'
    import { setToken,getToken,removeToken } from '@/utils/auth'
    import vYz from '@/components/sliderYz/index.vue'
    import { Toast } from 'vant'
    export default {
        name: "index",
        data(){
            return {
                active:0,
                phone:'',
                pass:'',
                yzm:'',
                showCode:false,
                timer:0
            }
        },
        components:{
            vHeader,vYz
        },
        methods:{
            toShowCode(id){
                const data={
                    mobile:this.phone,
                    image_code:id,
                }
                sendCode(data).then(res=>{
                    if(!res.code){
                        Toast( '短信发送成功' )
                        this.timer=60
                        let timer=setInterval(()=>{
                            this.timer--
                            if(!this.timer)clearInterval(timer)
                        },1000)
                    }
                })
            },
            login(){
                if(!this.phone || this.phone.length!==11){
                    Toast('手机号格式不正确')
                    return
                }
                console.log(this.active)
                if(!this.active){
                    if(!this.pass){
                        Toast( {duration: 1500, message: '密码不可为空'} )
                        return
                    }
                    userLogin({username: this.phone, password: this.pass}).then(res=>{
                        if(!res.code){
                            let token = res.data.token
                            setToken( token )
                            this.$router.replace('/')
                        }
                    })
                }else{
                    if(!this.yzm){
                        Toast( {duration: 1500, message: '验证码不可为空'} )
                        return
                    }
                    loginByMobile({mobile:this.phone,validate_code:this.yzm}).then(res=>{
                        if(!res.code){
                            let token = res.data.token
                            setToken( token )
                            this.$router.replace('/')
                        }
                    })
                }
            },
            send(){
                if(this.timer)return;
                if(!this.phone || this.phone.length!==11){
                    Toast('手机号格式不正确')
                    return
                }
                this.showCode=true
                // if(!this.phone || this.phone.length!==11){
                //     Toast('手机号格式不正确')
                //     return
                // }
                // sendCode({ mobile:this.phone}).then(res=>{
                //     if(!res.code){
                //         Toast( {duration: 1500, message: '短信发送成功'} )
                //     }
                // })
            }
        }
    }
</script>

<style scoped lang="scss">
.login{
    padding: .95rem .4rem;
    .van-tabs{
        border-radius: .2rem;
        overflow: hidden;
        padding-top: .2rem;
        background-color: #fff;
    }
    .pass{
        background-color: #fff;
        padding: .50rem 0 1rem;
        .van-button{
            line-height: .9rem;
            height: .9rem;
            color: #fff;
            background-color: $theme;
            width: 90%;
            margin: .65rem auto .42rem;
        }
        .gore{
            justify-content: space-between;
            font-size: .28rem;
            width: 90%;
            margin: 0 auto;
            color: #333;
        }
    }

}

</style>
