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
                <div v-for="(item,idx) in choseList" :key="idx"
                     :class="{active : selectType===idx}">
                    <div v-if="idx!==2"  @click="changeType(idx)">
                        <img :src="idx===0 ? Original :item.url" :class="{active : selectType===idx}" alt="">
                        <span>{{item.title}}</span>
                    </div>
                    <div v-else class="pos">
                        <img :src="item.url" :class="{active : selectType===idx}" alt="" class="te">
                        <input type="color" id="color" @change="changeColor" style="opacity: 0">
                        <span>背景颜色</span>
                    </div>
                </div>
            </div>
            <div class="btn flex">
                <van-button round @click="repeatUp">重新上传</van-button>
                <van-button round icon="icon iconfont icon-xiazai" @click="showPopup=!showPopup">保存图片</van-button>
            </div>
        </div>
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
    import bride from '@/assets/images/bride.jpg'
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
                imgurl: bride,
                imgInfo: 1,
                Original: b_4,//原图链接
                Original_Obj: '',//原图加载后对象
                bg_Original: '',//去背景图链接
                loadImgObj: '',//去背景图加载后对象
                colorValue:'',
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
                this.colorValue='';
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
                    // this.Original_Obj = imgs
                    EXIF.getData( imgs, function () {
                        _self.imgInfo = EXIF.getTag( this, "Orientation" ) ? EXIF.getTag( this, "Orientation" ) : 1;
                        param.set( 'orientation', _self.imgInfo );
                        param.set( 'mattingType', 2 )
                        uploadImgApi( param ).then( res => {
                            if (!res.code) {
                                _self.fileId = res.data.fileId;
                                if (res.data.status !== 'success') {
                                    _self.pollingImg()
                                    return
                                }
                                _self.imgMsg = res.data
                                _self.loadImg( res.data )
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
                                this.loadImg( res.data )
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
            loadImg(item) {
                let [one,two]=[false,false];
                this.selectType=1;
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.loadImgObj = oImg;//预览图加载后对象
                    this.bg_Original = item.bgRemovedPreview;
                    this.imgurl = item.bgRemovedPreview;
                    this.afterUp = true;
                    one=true;
                    if(one && two) Toast.clear();
                }
                oImg.src = item.bgRemovedPreview;
                let oImg_o=new Image();
                oImg_o.crossOrigin = '';
                oImg_o.onload = () => {
                    this.Original_Obj = oImg_o;
                    two=true;
                    if(one && two) Toast.clear();
                }
                oImg_o.src = item.original
            },
            repeatUp() {
                document.getElementsByClassName( 'van-uploader__input' )[0].click()
            },
            changeColor(e) {
                console.log( e.target.value )
                this.selectType = 2;
                this.colorValue=e.target.value
                this.imgurl =this.initBgcolor(this.loadImgObj,this.colorValue)
            },
            initBgcolor(bg,color){
                let cans = document.createElement( 'canvas' )
                const ctx = cans.getContext( '2d' )
                cans.width =bg.width
                cans.height = bg.height
                if(color){
                    ctx.fillStyle = color
                    ctx.fillRect( 0, 0, cans.width, cans.height )
                }
                ctx.drawImage( bg, 0, 0 );
                return cans.toDataURL( "image/png" )
            },
            SpecialEffects(k) {
                this.imgurl = this.initSpecialEffects(this.loadImgObj,k)
            },
            initSpecialEffects(bg,k){
                let can = document.createElement( 'canvas' )
                const ctx = can.getContext( '2d' )
                can.width = bg.width
                can.height = bg.height
                ctx.drawImage( this.Original_Obj, 0, 0, can.width, can.height )
                let imgData = ctx.getImageData( 0, 0, can.width, can.height );
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData( 0, 0, can.width, can.height );
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                JSManipulate.grayscale.filter( newBg4 );
                ctx.clearRect( 0, 0, can.width, can.height )
                if (k === 1) ctx.putImageData( newBg4, 0, 0 );
                else ctx.putImageData( newBg1, 0, 0 );
                ctx.drawImage( bg, 0, 0, can.width, can.height )
                return can.toDataURL( "image/png" )
            },
            save(k) {
                if (k === 1) {
                    this.images = [this.imgurl]
                    this.show = true;
                } else {
                    Toast.loading( {mask: true, message: '处理中...', duration: 0} );
                    downloadMattedImage( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            let oImage=new Image()
                            oImage.crossOrigin = '';
                            oImage.onload=()=>{
                                if(this.selectType===0)this.images=[this.initBgcolor(this.Original_Obj)];
                                else  if(this.selectType===1)this.images=[this.initBgcolor(oImage)];
                                else if(this.selectType===2)this.images=[this.initBgcolor(oImage,this.colorValue)];
                                else if(this.selectType===3)this.images=[this.initSpecialEffects(oImage,1)];
                                else this.images=[this.initSpecialEffects(oImage,2)];
                                this.show = true;
                                Toast.clear()
                            }
                            oImage.src=res.data
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
            background-color: $to;
            border-color: $to;
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
            img ,#color{
                background-color: #fff;
                overflow: hidden;
                margin: 0 auto .15rem;
                display: block;
                width: .6rem;
                height: .6rem;
                border: 1px solid #eee;
                border-radius: 50%;
            }
            .pos{
                position: relative;
            }
            #color{
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -0.3rem;
                z-index:88 ;
            }
            &.active, .active {
                border-color: $to;
                color: $to;
            }
        }

        .btn {
            color: #fff;
            padding: 0;
            justify-content: space-between;

            .van-button {
                background-color: $to;
                color: #fff;
                width: 48%;
                border-color: $to;

                &:first-child {
                    background-color: #fff;
                    color: $to;
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
            color: $to;
            border-color: $to;
            font-size: .3rem;
        }
    }
</style>
