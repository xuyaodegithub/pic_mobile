<template>
    <div class="register login">
        <v-header></v-header>
                <div class="pass mess">
                    <h3>注册</h3>
                    <van-field v-model="phone" placeholder="请输入手机号" type="tel" size="large"/>
                    <van-field v-model="yzm" placeholder="请输入验证码" type="number" size="large"> <van-button slot="button" class="send"  @click="send">{{timer ? timer :'发送验证码'}}</van-button></van-field>
                    <van-field v-model="pass" placeholder="请设置密码" type="password" size="large"/>
                    <div class="gore m-y">
                        完成此注册，即表明您同意了我们的 <i>使用条款和隐私策略</i>
                    </div>
                    <van-button round block @click="resetPass">注册</van-button>
                    <div class="gore">
                        已有账号，<span @click="$router.push('/login')">马上登录</span>
                    </div>
                </div>
        <v-yz @success="toShowCode" :visible.sync="showCode"></v-yz>
    </div>
</template>

<script>
    import vHeader from "@/components/h_header/index.vue"
    import vYz from '@/components/sliderYz/index.vue'
    import { userRegister,sendCode } from '@/apis'
    import { Toast } from 'vant'
    export default {
        name: "index",
        data(){
            return {
                phone:'',
                yzm:'',
                pass:'',
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
            send(){
                if(this.timer)return;
                if(!this.phone || this.phone.length!==11){
                    Toast('手机号格式不正确')
                    return
                }
                this.showCode=true
            },
            resetPass(){
                if (!this.phone || !this.pass || !this.yzm) {
                    Toast( { message: '内容不可为空',duration:1500} )
                    return
                }
                if(this.phone.length!==11){
                    Toast( { message: '手机号格式不正确',duration:1500} )
                    return
                }
                let data={
                    mobile:this.phone,
                    password:this.pass,
                    validate_code:this.yzm,
                }
                userRegister( data ).then( res => {
                    if (!res.code) {
                        this.beforSet=false
                    }
                } )
            }
        }
    }
</script>

<style scoped lang="scss">
.register{
    padding: .95rem .4rem;
    .pass{
        background-color: #fff;
        padding-bottom: .75rem;
        border-radius: .2rem;
    }
    h3{
        font-size: .44rem;
        color: #333;
        text-align: center;
        padding: .54rem 0 .8rem 0;
        font-weight: 500;
    }
    .van-button{
        line-height: .9rem;
        height: .9rem;
        color: #fff;
        background-color: $theme;
        width: 90%;
        margin: .3rem auto .42rem;
    }
    .gore{
        font-size: .26rem;
        color: #989898;
        margin: 0 auto;
        line-height: .42rem;
        width: 90%;
        span{
            display: inline-block;
            color: #333;
            border-bottom: 1px solid #333;
        }
        i{
            color: $to;
        }
    }
    .m-y{
        margin-top: .35rem;
    }
}
</style>
