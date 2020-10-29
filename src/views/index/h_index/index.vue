<template>
    <div class="index">
        <!--        <v-header></v-header>-->
        <div class="tabs">
            <input type="file" name="file" ref="files" @change="upImg" style="display: none" accept="image/*"
                   :multiple="false">
            <div class="names">功能</div>
            <div class="flex a-i f-w">
                <div @click="toWeb(7)">
                    <div class="decs">
                        <h2>通用抠图</h2>
                        <p>人像宠物商品卡通</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/e1a76e075e0944e783d8aee11745fb5f.jpg"/>
                    <img src="@/assets/images/tygif.gif" alt="">
                </div>
                <div @click="toWeb(0)">
                    <div class="decs">
                        <h2>人像抠图 </h2>
                        <p>证件照、形象照</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/4481c3cf00534f55a22651449a0e8d32.jpg"/>
                    <img src="@/assets/images/pgif.gif" alt="">
                </div>
                <div @click="toWeb(1)">
                    <div class="decs">
                        <h2>物体抠图</h2>
                        <p>电商白底图</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/737bdebc7fa643e7aff014f2e6f7beae.jpg"/>
                    <img src="@/assets/images/ogif.gif" alt="">
                </div>
                <div @click="toWeb(2)">
                    <div class="decs">
                        <h2>头像抠图</h2>
                        <p>个性化定制</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/799eaacbfd2549cb9d3417c55974566a.jpg"/>
                    <img src="@/assets/images/headcount.gif" alt="">
                </div>
                <div @click="toWeb(3)">
                    <div class="decs">
                        <h2>一键美化</h2>
                        <p>局部曝光自动调</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/8515334b0fb849c08b9805af2aefe797.jpg"/>
                    <img src="@/assets/images/beauty.gif" alt="">
                </div>
                <div @click="toWeb(4)">
                    <div class="decs">
                        <h2>智能修复</h2>
                        <p>去水印、修照片</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/012d6aee5e6f4feeb6fb6d19ba68389f.jpg"/>
                    <img src="@/assets/images/fix.gif" alt="">
                </div>
                <div @click="toWeb(8)">
                    <div class="decs">
                        <h2>卡通漫画</h2>
                        <p>图片变漫画</p>
                    </div>
                    <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/e1a76e075e0944e783d8aee11745fb5f.jpg"/>
                    <img src="https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/cartoon.gif" alt="">
                </div>


            </div>
        </div>
        <div class="tabs last">
            <div class="names">应用</div>
            <div class="flex a-i">
                <img src="../../../assets/images/h_07.png" @click="toWeb(5)"/>
                <img src="../../../assets/images/h_06.png" @click="toWeb(6)"/>
            </div>
        </div>
        <div class="h_cell">
            <div class="flex a-i" v-for="(item,idx) in cellList" :key="idx" :class="{'m-t' : [0,1,3].includes(idx)}"
                 @click="changePage(item,idx)">
                <img :src="item.img" alt="">
                <span>{{item.title}}</span>
                <van-icon name="arrow" size="1em"/>
            </div>
            <div class="pcWeb" @click="toPc">访问电脑端</div>
        </div>
    </div>
</template>

<script>
    import vHeader from "@/components/h_header/index.vue"
    import {compressImg} from '../../../utils'
    import h_1 from '@/assets/images/h_1.png'
    import h_2 from '@/assets/images/h_2.png'
    import h_3 from '@/assets/images/h_3.png'
    import h_4 from '@/assets/images/h_4.png'
    import h_5 from '@/assets/images/h_5.png'
    import {uploadossBg} from '@/apis'
    import {wxJssdkData} from '@/apis/wxJssdk.js'
    import {Toast} from 'vant'
    import {mapActions, mapGetters} from 'vuex'
    import {setCookie} from '@/utils/auth'
    import Cookies from 'js-cookie'

    export default {
        data() {
            return {
                cellList: [
                    {title: '更多产品', img: h_1, url: '/more'},
                    {title: 'API', img: h_2, url: 'apis.html'},
                    {title: '定价', img: h_3, url: '/price'},
                    {title: '关于我们', img: h_4, url: '/us'},
                    {title: '联系我们', img: h_5, url: '/concat'},
                ],
                url: ''
            }
        },
        computed: {},
        components: {
            vHeader
        },
        created() {
            const data = {
                title: '一键抠图神器------皮卡智能PicUP.AI',
                desc: '100%自动，免费，在线换背景',
                link: window.location.href,
                imgUrl: 'http://guoqing.deeplor.com/img/share_i.jpg'
            }
            wxJssdkData( this, data )
        },
        methods: {
            toWeb(i) {
                const urlList = ['people.html', 'object.html', 'headCutout.html', 'beautify.html', 'repairImg.html', 'guo.html', 'travle.html', 'currency.html','cartoonImage.html'];
                if ([2, 3, 4, 7,8].includes( i )) {
                    this.url = urlList[i]
                    this.$refs.files.click()
                } else window.location.href = urlList[i]

            },
            changePage(item, idx) {
                if (idx === 1) window.location.href = item.url;
                else this.$router.push( item.url )
            },
            toPc() {
                Cookies.set( 'pc', 1, {path: '/', domain: '.picup.shop'} );
                window.open( 'http://www.picup.shop' )
            },
            upImg(e) {
                Toast.loading()
                let [file, fromData] = [e.target.files[0], new FormData()];
                const idx = ['headCutout.html', 'beautify.html', 'repairImg.html','currency.html','cartoonImage.html'].indexOf( this.url );
                if (idx === 2) {
                    compressImg( file ).then( blob => {
                        fromData.set( 'file', blob )
                        this.uploadBgd( file, fromData, idx )
                    } )
                } else {
                    fromData.set( 'file', file )
                    this.uploadBgd( file, fromData, idx )
                }

            },
            uploadBgd(file, fromData, idx) {
                uploadossBg( fromData ).then( res => {
                    const data = {
                        url: res.data,
                        name: file.name
                    };
                    window.localStorage.setItem( `otherUrl${idx}`, JSON.stringify( data ) );
                    window.location.href = this.url;
                } ).finally( () => {
                    Toast.clear()
                } )
            }
        }
    }
</script>

<style scoped lang="scss">
    .index {
        background-color: #f5f5f5;
    }

    .tabs {
        padding: 0 .4rem;
        background-color: #fff;
        color: #333;

        & > .flex {
            justify-content: space-between;

        }

        & > .f-w > div {
            position: relative;
            margin-bottom: .2rem;
            .decs{
                position: absolute;
                left:0.2rem ;
                top: 50%;
                transform: translateY(-50%);
                color: #fff;
                h2{
                    font-size: .36rem;
                    line-height: 1;
                    margin-bottom: .2rem;
                }
                p{
                    font-size: .24rem;
                    color: rgba(255,255,255,.8);
                }
            }
            img:last-child {
                position: absolute;
                width: .88rem;
                height: .88rem;
                top: 50%;
                right: .2rem;
                transform: translateY(-50%);
                margin: 0;
                border-radius: .15rem;
            }
        }

        .names {
            font-size: .28rem;
            padding: .30rem 0 .14rem 0;
            font-weight: 600;
        }

        img {
            width: 3.24rem;
            height: 1.70rem;
        }
    }

    .last {
        padding-bottom: .28rem;
    }

    .h_cell {
        font-size: .3rem;
        line-height: 1rem;
        margin-top: .2rem;
        color: #333;
        padding-bottom: .5rem;

        img {
            width: .42rem;
            height: .42rem;
            margin-right: .28rem;
        }

        & > div {
            background-color: #fff;
            padding: 0 .42rem;
            border-bottom: 1px solid #F6F6F6;

            .van-icon {
                flex-grow: 1;
                text-align: right;
            }
        }

        .m-t {
            margin-top: .2rem;
        }

        .pcWeb {
            font-size: .3rem;
            color: $theme;
            text-align: center;
            line-height: .8rem;
            /*margin-top: .2rem;*/
        }
    }
</style>
