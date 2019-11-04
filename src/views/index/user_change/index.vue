<template>
    <div class="register login change">
        <v-header></v-header>
        <div class="pass mess">
            <h3>修改密码</h3>
            <van-field v-model="phone" placeholder="请设置新密码" type="password" size="large"/>
            <van-field v-model="yzm" placeholder="确认新密码" type="password" size="large"></van-field>
            <van-button round block>下一步</van-button>
        </div>
    </div>
</template>

<script>
    import vHeader from "@/components/h_header/index.vue";
    import { userResetPassword,userResetbyEmail } from '@/apis'
    export default {
        name: "index",
        data(){
            return {
                phone:'',
                yzm:'',
                pass:''
            }
        },
        computed:{
            token(){
                return this.$route.query.token
            }
        },
        components:{
            vHeader
        }
    }
</script>

<style scoped lang="scss">
    .register{
        padding: .95rem .4rem;
        .pass{
            background-color: #fff;
            padding-bottom: 1.2rem;
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
            margin: .65rem auto 0;
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
