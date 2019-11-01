<template>
    <div class="concat">
        <v-header></v-header>
        <div class="emil">
            <h6>邮箱地址</h6>
            <p>pikachu@picup.ai</p>
        </div>
        <div class="wechat">
            <h6>微信联系</h6>
            <p>roymind</p>
<!--            <img src="" alt="">-->
        </div>
    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    export default {
        name: "index",
        components:{
            vHeader
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
    }
</style>
