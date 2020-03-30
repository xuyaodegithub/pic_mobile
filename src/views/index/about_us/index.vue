<template>
    <div class="about">
<!--        <v-header></v-header>-->
        <img src="../../../assets/images/about.jpg" alt="">
        <div class="content">
            有了一群技术狂人，picup ai利用人工智能和计 算机视觉的力量，提供各种各样的产品，使您的 生活更容易，工作更富有成效。无论是人像裁剪 、 风格转换、绘画、图像增强、逆向图像搜索利 基或通用图像分类、检测或语义分割任务，我们 都能满足您的需求。让我们一起让人类变得更聪明!
        </div>
        <van-button round block @click="$router.push('/concat')">联系我们</van-button>
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
    .about{
        min-height: 100%;
        background-color: #fff;
        padding: .4rem;
        img{
            display: block;
            width: 100%;
            margin-bottom: .2rem;
        }
        .content{
            font-size: .28rem;
            color: #333;
            line-height: .42rem;
        }
        .van-button{
            background-color: $theme;
            color: #fff;
            margin-top: .88rem;
        }
    }
</style>
