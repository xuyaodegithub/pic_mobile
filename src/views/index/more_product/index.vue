<template>
    <div class="move">
        <v-header></v-header>
        <div class="item">
            <h3>人物头像自动分割(抠头像)</h3>
            <p>利用人工智能技术全自动分割出照片中的头像，分割精度高，准确率高，速度快。 发丝级抠图，对脸部、头发进行细粒度分析，实现发丝级的精细化分割效果。不论发型是披肩发，还是丸子头，都可以完整分割。非常适合在图像合成的场景中应用，比如：照片换头，制作专属表情包等。</p>
            <img src="../../../assets/images/move_1.jpg" alt="">
        </div>
        <div class="item">
            <h3>图像修复</h3>
            <p>在几秒钟内恢复丢失的部分照片。替换图片的任何部分（丢失、变质或不需要的部分，如水印），而不被注意。</p>
            <img src="../../../assets/images/move_2.jpg" alt="">
        </div>
        <div class="item">
            <h3>超分辨率</h3>
            <p>需要提高劣质图片的分辨率吗？这是适合你的工具。想体验惊艳效果吗？现在联系我们！</p>
            <img src="../../../assets/images/move_3.jpg" alt="">
        </div>
        <div class="item">
            <h3>自动照片修饰</h3>
            <p>没有时间编辑照片？这个人工智能驱动的工具只需点击一下就可以提高图片的美感。任何人都可以成为职业选手而不必麻烦。</p>
            <img src="../../../assets/images/move_4.jpg" alt="">
        </div>
        <div class="item">
            <h3>以图搜款</h3>
            <p>难以描述你想要什么？此基于内容的图像检索工具可帮助您查找个人和企业使用的相关图像（例如，在电子商务平台上搜索类似或相同的产品）。它既快又容易！</p>
            <img src="../../../assets/images/move_5.jpg" alt="">
        </div>
        <div class="item">
            <h3>图像风格转换</h3>
            <p>通过将风格绘画的外观应用到用户提供的图片的内容，将照片转换为艺术品。创造艺术品比以往任何时候都容易！</p>
            <img src="../../../assets/images/move_6.jpg" alt="">
        </div>
        <div class="item">
            <h3>视频修复</h3>
            <p>快速重建视频帧的缺失部分。高质量的结果产生在高清晰度视频，捕捉动态纹理和移动对象。</p>
            <div>
                <video src="../../../assets/videos/video.mp4" ref="video1s" loop class="f_v" preload :controls="false">
                    <source src="../../../assets/videos/video.mp4" type="video/mp4">
                    <!--                            <source :src="item" type="video/ogg">-->
                    <!--                            <source :src="item" type="video/webm">-->
                    你的游览器暂不支持视频播放，换一个试试吧！
                </video>
                <img src="../../../assets/images/stop.png" alt="" @click="plays(1)">
            </div>
        </div>
        <div class="item">
            <h3>人工智能设计师</h3>
            <p>创新想法用完了吗？这种生成对抗性网络（gan）驱动的人工智能设计师在您的工作和生活的许多方面帮助您：海派设计，手袋设计，鞋子设计，等等！不再需要自己产生幻觉了。</p>
            <div>
                <video src="../../../assets/videos/shose.mp4" ref="video2s" loop class="c_v" preload :controls="false">
                    <source src="../../../assets/videos/shose.mp4" type="video/mp4">
                    <!--                            <source :src="item" type="video/ogg">-->
                    <!--                            <source :src="item" type="video/webm">-->
                    你的游览器暂不支持视频播放，换一个试试吧！
                </video>
                <div class="cc"></div>
                <img src="../../../assets/images/stop.png" alt="" @click="plays(2)">
            </div>
        </div>
        <div class="item">
            <h3>人脸识别</h3>
            <p>我们基于深度学习的人脸识别技术能够快速检测和捕捉面部生物特征，从而识别出一个人，并以极高的准确度提供强大的性能。即使在低光照条件下，红外光谱的应用也总能得到可靠的结果。没有图片可以欺骗系统！它可以很容易地部署在许多类别中，如安全执法、卫生、营销或零售。</p>
            <img src="../../../assets/images/move_9.jpg" alt="">
        </div>
        <div class="item">
            <h3>基于局部化的图像分类</h3>
            <p>此产品不仅可以指定类标签，还可以显示对象在图像中的位置。猜猜看，您不必提供带有对象位置的标记数据。我们的模型会自动为您计算出位置。它将使您的工作在各种各样的用例中更加容易：汽车、游戏、医疗保健、零售、安全、社交媒体平台等等。</p>
            <img src="../../../assets/images/move_10.jpg" alt="">
        </div>
        <div class="item">
            <van-button round block @click="$router.push('/concat')">联系我们</van-button>
        </div>
    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    export default {
        name: "index",
        data() {
            return {
            }
        },
        components: {
            vHeader
        },
        methods:{
            plays(i){
                const v1=this.$refs.video1s;
                const v2=this.$refs.video2s;
                if(i===1)v1.play();
                else v2.play();
            }
        }

    }
</script>

<style scoped lang="scss">
    .move{
        .item{
            background-color: #fff;
            padding: .6rem .5rem;
            text-align: center;
            margin-bottom: .2rem;
            h3{
                font-size: .4rem;
                line-height: 1;
                margin-bottom:.24rem ;
            }
            p{
                font-size: .24rem;
                color: rgba(91,91,91,1);
                line-height: .34rem;
                margin-bottom: .44rem;
            }
            & > img{
                display: block;
                width: 100%;
            }
            .f_v{
                display: block;
                width: 100%;
            }
            .c_v{
                display: block;
                width: 50%;
                margin: 0 auto;
            }
            div{
                position: relative;
                img{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -.5rem 0 0 -.5rem;
                    z-index: 22;
                }
            }
            .cc{
                background-color: rgba(0, 0, 0, 0.2);
                width: 50%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -25%;
            }
        }
        .van-button{
            background-color: $theme;
            color: #fff;
        }
        .item:last-child{
            padding:.4rem .5rem ;
        }
    }
</style>
