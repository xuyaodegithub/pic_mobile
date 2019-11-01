<template>
    <div class="people">
        <v-header></v-header>
        <div class="main" :style="styles">
            <img :src="imgurl" alt="">
        </div>
        <div class="btn">
            <van-uploader :after-read="afterRead" v-show="!afterUp">
                <van-button round type="info" block icon="photo-o">上传图片</van-button>
            </van-uploader>
        </div>
        <div class="afterUp" v-if="afterUp">
            <div class="flex tags a-i">
                <div @click="changeType(idx)" v-for="(item,idx) in choseList" :key="idx"
                     :class="{active : selectType===idx}"><img :src="idx===0 ? Original :item.url"
                                                               :class="{active : selectType===idx}" alt=""><span>{{item.title}}</span>
                </div>
            </div>
            <div class="btn flex">
                <van-button round @click="repeatUp">重新上传</van-button>
                <van-button round icon="icon iconfont icon-xiazai" @click="showPopup=!showPopup">保存图片</van-button>
            </div>
        </div>
        <input type="color" id="color" @change="changeColor" style="display: none">
        <van-image-preview
                close-on-popstate
                v-model="show"
                :images="images"
        >
            <template v-slot:index>按住图片3秒保存图片
                <van-icon name="down"/>
            </template>
        </van-image-preview>
        <van-popup v-model="showPopup" position="bottom" closeable :close-on-click-overlay="false" class="populp">
            <div class="flex a-i"><span>尺寸</span><span>消耗次数</span></div>
            <div class="flex a-i"><span>{{imgMsg.previewWidth}}x{{imgMsg.previewHeight}}</span><span>0</span>
                <van-button round @click="save(1)">下载</van-button>
            </div>
            <div class="flex a-i"
                 v-if="imgMsg.previewWidth!==imgMsg.originalWidth && imgMsg.previewHeight!==imgMsg.originalHeight">
                <span>{{imgMsg.originalWidth}}x{{imgMsg.originalHeight}}</span><span>1</span>
                <van-button round @click="save(2)">下载</van-button>
            </div>
            <div class="num">
                当前可用次数：<i>0</i> <span>去充值</span>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {uploadImgApi, getMattingInfo, downloadMattedImage} from '@/apis'
    import JSManipulate from '../../utils/jsmanipulate.js'
    import b_o from '@/assets/images/b_o.png'
    import b_1 from '@/assets/images/b_1.png'
    import b_2 from '@/assets/images/b_2.png'
    import b_3 from '@/assets/images/b_3.png'
    import b_4 from '@/assets/images/init_people.jpg'
    import vHeader from '@/components/h_header'
    import people from '@/assets/images/init_people.jpg'
    import {EXIF} from 'exif-js'
    import {Toast, Dialog} from 'vant'
    import op from '@/assets/images/opacity.jpg'

    export default {
        name: "index",
        data() {
            return {
                op,
                show: false,
                showPopup: false,
                imgurl: people,
                imgInfo: 1,
                Original: b_4,//原图链接
                Original_Obj: '',//原图加载后对象
                bg_Original: '',//去背景图链接
                loadImgObj: '',//去背景图加载后对象
                choseList: [
                    {title: '原图', url: b_4},
                    {title: '去背景', url: b_o},
                    {title: '背景颜色', url: b_1},
                    {title: '背景去色', url: b_2},
                    {title: '背景模糊', url: b_3}
                ],
                selectType: 1,
                afterUp: false,
                fileId: '',
                imgMsg: '',//抠图返回结果
                images: []
            }
        },
        computed: {
            styles() {
                if (this.selectType === 1) return {backgroundImage:`url(${this.op})`};
            }
        },
        components: {
            vHeader
        },
        methods: {
            changeType(idx) {
                if (idx === 2) document.getElementById( 'color' ).click();
                if (this.selectType === idx) return;
                this.selectType = idx;
                if (idx === 0) this.imgurl = this.Original;
                else if (idx === 1) this.imgurl = this.bg_Original;
                else if (idx === 2) document.getElementById( 'color' ).click();
                else if (idx === 3) this.SpecialEffects( 1 )
                else this.SpecialEffects( 2 )
            },
            afterRead(file) {
                Toast.loading( {mask: true, message: '上传中...', duration: 0} );
                let param = new FormData(), _self = this;
                console.log( file, file.file, file.name );
                param.append( 'file', file.file, file.name );
                let imgs = document.createElement( 'img' );
                this.Original = file.content;
                imgs.crossOrigin = '';
                imgs.onload = () => {
                    this.Original_Obj = imgs
                    EXIF.getData( imgs, function () {
                        _self.imgInfo = EXIF.getTag( this, "Orientation" ) ? EXIF.getTag( this, "Orientation" ) : 1;
                        param.set( 'orientation', _self.imgInfo );
                        param.set( 'mattingType', 1 )
                        uploadImgApi( param ).then( res => {
                            if (!res.code) {
                                _self.fileId = res.data.fileId;
                                if (res.data.status !== 'success') {
                                    _self.pollingImg()
                                    return
                                }
                                _self.imgMsg = res.data
                                _self.loadImg( res.data.bgRemovedPreview )
                            } else {
                                Toast( {duration: 1500, message: res.msg} )
                            }
                        } ).catch( err => {
                            Toast.clear()
                            Toast( {duration: 1500, message: err} )
                        } )
                    } );
                }
                imgs.src = file.content;
            },
            pollingImg() {//轮询
                this.timer = setInterval( () => {
                    // this.getImgData()
                    getMattingInfo( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            if (res.data.status === 'success') {
                                clearInterval( this.timer )
                                this.imgMsg = res.data
                                this.loadImg( res.data.bgRemovedPreview )
                            } else Toast( {
                                message: `当前人数过多,正在排队等待!当前位置${res.data.queueNumber}`,
                                duration: 0,
                                forbidClick: true,
                                mask: true
                            } )
                        } else {
                            clearInterval( this.timer )
                            Toast( res.msg )
                        }
                    } )
                }, 3000 )
            },
            loadImg(url) {
                let oImg = new Image()
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.loadImgObj = oImg
                    this.bg_Original = url
                    this.imgurl = url
                    this.afterUp = true
                    Toast.clear()
                }
                oImg.src = url
            },
            repeatUp() {
                document.getElementsByClassName( 'van-uploader__input' )[0].click()
            },
            changeColor(e) {
                console.log( e.target.value )
                const vcolor = e.target.value
                let cans = document.createElement( 'canvas' )
                const ctx = cans.getContext( '2d' )
                cans.width = this.loadImgObj.width
                cans.height = this.loadImgObj.height
                ctx.fillStyle = vcolor
                ctx.fillRect( 0, 0, cans.width, cans.height )
                ctx.drawImage( this.loadImgObj, 0, 0 );
                this.imgurl = cans.toDataURL( "image/png" )
            },
            SpecialEffects(k) {
                let can = document.createElement( 'canvas' )
                const ctx = can.getContext( '2d' )
                can.width = this.loadImgObj.width
                can.height = this.loadImgObj.height
                ctx.drawImage( this.Original_Obj, 0, 0, can.width, can.height )
                let imgData = ctx.getImageData( 0, 0, can.width, can.height );
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData( 0, 0, can.width, can.height );
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                JSManipulate.grayscale.filter( newBg4 );
                ctx.clearRect( 0, 0, can.width, can.height )
                if (k === 1) ctx.putImageData( newBg4, 0, 0 );
                else ctx.putImageData( newBg1, 0, 0 );
                ctx.drawImage( this.loadImgObj, 0, 0, can.width, can.height )
                this.imgurl = can.toDataURL( "image/png" )
            },
            save(k) {
                if (k === 1) {
                    this.show = true
                    this.images = [this.imgurl]
                } else {
                    downloadMattedImage( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {

                        }
                    } )
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        background-size: cover;

    }

    .main img {
        display: block;
        width: 100%;
    }

    .btn {
        padding: .2rem .4rem;
        background-color: #fff;

        .van-button {
            background-color: $theme;
            border-color: $theme;
        }
    }

    .afterUp {
        border-top: 1px solid #eee;
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: .25rem .4rem .5rem;
        background-color: #fff;
        font-size: .18rem;

        .tags {
            justify-content: space-between;
            text-align: center;
            margin-bottom: .46rem;

            img {
                margin: 0 auto .15rem;
                display: block;
                width: .6rem;
                height: .6rem;
                border: 1px solid #eee;
                border-radius: 50%;
            }

            &.active, .active {
                border-color: $theme;
                color: $theme;
            }
        }

        .btn {
            color: #fff;
            padding: 0;
            justify-content: space-between;

            .van-button {
                background-color: $theme;
                color: #fff;
                width: 48%;
                border-color: $theme;

                &:first-child {
                    background-color: #fff;
                    color: $theme;
                }
            }
        }
    }

    .populp {
        padding: .44rem .44rem 0;

        & > div:first-child {
            font-size: .28rem;
            color: #989898;
        }

        & > div {
            color: #333;
            font-size: .34rem;
            margin-bottom: .6rem;
        }

        & > div span:first-child {
            width: 45%;
        }

        & > div span:nth-child(2) {
            width: 35%;
        }

        div.num {
            color: #989898;
            font-size: .28rem;

            span {
                color: #23a0e2;
                border-bottom: 1px solid #23a0e2;
            }

            i {
                color: #333;
                font-size: .34rem;
                margin-right: .15rem;
            }
        }

        .van-button {
            line-height: .6rem;
            height: .6rem;
            color: $theme;
            border-color: $theme;
            font-size: .3rem;
        }
    }
</style>
