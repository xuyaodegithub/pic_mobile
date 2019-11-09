<template>
    <div>
        <v-header></v-header>
        <div class="tabs">
            <div class="names">功能</div>
            <div class="flex a-i">
                <img src="../../../assets/images/h_f.png" @click="toWeb(0)"/>
                <img src="../../../assets/images/h_s.png"  @click="toWeb(1)"/>
            </div>
        </div>
        <div class="tabs last">
            <div class="names">应用</div>
            <div class="flex a-i">
                <img src="../../../assets/images/h_t.png"  @click="toWeb(2)"/>
                <img src="../../../assets/images/h_fo.png" @click="toWeb(3)"/>
            </div>
        </div>
        <div class="h_cell">
                <div class="flex a-i" v-for="(item,idx) in cellList" :key="idx" :class="{'m-t' : [0,1,3].includes(idx)}" @click="changePage(item,idx)">
                    <img :src="item.img" alt="">
                    <span>{{item.title}}</span>
                    <van-icon name="arrow" size="1em" />
                </div>
        </div>
    </div>
</template>

<script>
    import vHeader from "@/components/h_header/index.vue"
    import h_1 from '@/assets/images/h_1.png'
    import h_2 from '@/assets/images/h_2.png'
    import h_3 from '@/assets/images/h_3.png'
    import h_4 from '@/assets/images/h_4.png'
    import h_5 from '@/assets/images/h_5.png'
    import { wxJssdkData } from '@/apis/wxJssdk.js'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data() {
            return {
                cellList:[
                    {title:'更多产品',img:h_1,url:'/more'},
                    {title:'API',img:h_2,url:'docsify/#/apis.md'},
                    {title:'定价',img:h_3,url:'/price'},
                    {title:'关于我们',img:h_4,url:'/us'},
                    {title:'联系我们',img:h_5,url:'/concat'},
                ]
            }
        },
        computed:{

        },
        components:{
            vHeader
        },
        created(){
            const data={
                title:'一键抠图神器------皮卡智能PicUP.AI',
                desc:'100%自动，免费，在线换背景',
                link:window.location.href,
                imgUrl:'http://guoqing.deeplor.com/img/share_i.jpg'
            }
            wxJssdkData(this,data)
        },
        methods: {
            toWeb(i){
                const urlList=['people.html','object.html','guo.html','travle.html']
                window.location.href=urlList[i]
            },
            changePage(item,idx){
                if(idx===1)window.location.href=item.url
                else this.$router.push(item.url)
            }
        }
    }
</script>

<style scoped lang="scss">
    .tabs{
        padding: 0 .4rem;
        background-color: #fff;
        color: #333;
        & > .flex{
            justify-content: space-between;
        }
        .names{
            font-size: .28rem;
            padding: .30rem 0 .14rem 0;
            font-weight: 600;
        }
        img{
            width: 3.24rem;
            height: 1.70rem;
        }
    }
    .last{
        padding-bottom: .28rem;
    }
    .h_cell{
        font-size: .3rem;
        line-height: 1rem;
        margin-top: .2rem;
        color: #333;
        img{
            width: .42rem;
            height: .42rem;
            margin-right: .28rem;
        }
        & > div{
            background-color: #fff;
            padding:0 .42rem;
            border-bottom: 1px solid #F6F6F6;
            .van-icon{
                flex-grow: 1;
                text-align: right;
            }
        }
        .m-t{
            margin-top: .2rem;
        }
    }
</style>
