<template>
        <div class="count">
            <v-header></v-header>
            <div class="flex num a-i">
                <div>
                    <p>下载高清大图</p>
                    <p>剩余次数：10</p>
                </div>
                <van-button round >去充值</van-button>
            </div>
            <div class="apiset">
                <p>API密钥</p>
                <p>e59966a7200a4c5f8f557b93b6a81941 <van-icon name="replay" /></p>
                <p class="flex a-i">阅读API文档 <van-icon name="arrow" /></p>
            </div>
            <div class="apiset">
                <p>账户设置</p>
                <p>手机号： 16605813146</p>
                <p class="flex a-i">修改密码 <van-icon name="arrow" /></p>
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
</style>
