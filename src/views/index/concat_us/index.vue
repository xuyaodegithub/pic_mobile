<template>
    <div class="concat">
<!--        <v-header></v-header>-->
        <div class="emil">
            <h6>邮箱地址</h6>
            <p>pikachu@picup.ai</p>
        </div>
        <div class="wechat">
            <h6>微信联系</h6>
            <p @touchstart.prevent="longtab" @touchend.prevent="endtab" @touchmove.prevent="movetab">roymind</p>
            <img src="../../../assets/ewm.jpg" alt="">
        </div>
    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    import { Toast } from 'vant'
    export default {
        name: "index",
        data(){
            return {
                startT:'',
                endT:'',
            }
        },
        components:{
            vHeader
        },
        methods:{
            longtab(){
                this.startT=new Date()
            },
            endtab(){
                if(!this.startT)return;
                const time=(new Date()-this.startT)/1000
                if(time>0.8){
                    let oInput = document.createElement('input');
                    oInput.value = 'roymind';
                    document.body.appendChild(oInput);
                    oInput.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    oInput.className = 'oInput';
                    oInput.style.display='none';
                    oInput.blur()
                    Toast('复制成功')

                }
            },
            movetab(){
                this.startT=''
            }
        }
    }
</script>

<style scoped lang="scss">
    .emil,.wechat{
        padding: .48rem .44rem;
        background-color: #fff;
        margin-bottom: .22rem;
        line-height: 1;
        h6{
            font-size: .3rem;
            color: #787878;
            margin-bottom: .27rem;
        }
        p{
            font-size: .38rem;
            color: #333;
        }
        img{
            display: block;
            width: 60%;
            margin: .6rem auto 0.8rem;
        }
    }
</style>
