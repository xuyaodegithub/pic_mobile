<template>
    <div class="index">
        <!--        <v-header></v-header>-->
        <div class="tabs">
            <input type="file" name="file" ref="files" @change="upImg" style="display: none" accept="image/*"
                   :multiple="false">
            <div class="names">功能</div>
            <div class="flex a-i f-w">
                <div @click="toWeb(0)">
                    <img src="@/assets/images/h_01.png"/>
                    <img src="@/assets/images/pgif.gif" alt="">
                </div>
                <div @click="toWeb(1)">
                    <img src="@/assets/images/h_02.png"/>
                    <img src="@/assets/images/ogif.gif" alt="">
                </div>
                <div @click="toWeb(2)">
                    <img src="@/assets/images/h_03.png"/>
                    <img src="@/assets/images/headcount.gif" alt="">
                </div>
                <div @click="toWeb(3)">
                    <img src="@/assets/images/h_04.png"/>
                    <img src="@/assets/images/beauty.gif" alt="">
                </div>
                <div @click="toWeb(4)">
                    <img src="@/assets/images/h_05.png"/>
                    <img src="@/assets/images/fix.gif" alt="">
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
                const urlList = ['people.html', 'object.html', 'headCutout.html', 'beautify.html', 'repairImg.html', 'guo.html', 'travle.html'];
                if ([2, 3, 4].includes( i )) {
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
                const idx = ['headCutout.html', 'beautify.html', 'repairImg.html'].indexOf( this.url );
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

            img:last-child {
                position: absolute;
                width: .88rem;
                height: .88rem;
                top: 50%;
                right: .2rem;
                transform: translateY(-50%);
                margin: 0;
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
