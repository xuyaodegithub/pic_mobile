<template>
    <div class="people">
        <v-header></v-header>
        <div class="main flex" :class="{afterp_b : afterUp}" @click="showBg=false">
            <div :style="{'background-image':selectType===1 ? `url(${op})` : 'none','margin-top':m_top}"
                 class="mainimg">
                <img :src="imgurl" alt="" class="imgsss">
            </div>
        </div>
        <div class="btn" v-show="!afterUp">
            <van-uploader :after-read="afterRead" :max-count="1">
                <van-button round type="info" block icon="photo-o" ref="upfile">上传图片</van-button>
            </van-uploader>
        </div>
        <div class="afterUp" v-show="afterUp" ref="afters">
            <div class="flex tags a-i">
                <div v-for="(item,idx) in choseList" :key="idx"
                     :class="{active : selectType===idx}">
                    <div @click="changeType(idx)">
                        <img :src="item.url" :class="{active : selectType===idx}" alt="" v-if="![0,3,4].includes(idx)">
                        <i v-else :class="{active : selectType===idx}"
                           :style="{backgroundImage: `url(${item.url})`}"></i>
                        <span>{{item.title}}</span>
                    </div>
                    <!--                    <div v-else class="pos">-->
                    <!--                        <img :src="item.url" :class="{active : selectType===idx}" alt="" class="te">-->
                    <!--                        <input type="color" id="color" @change="changeColor" style="opacity: 0">-->
                    <!--                        <span>背景颜色</span>-->
                    <!--                    </div>-->
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
        <van-popup v-model="showPopup" position="bottom" closeable class="populp">
            <div class="flex a-i"><span>尺寸</span><span>消耗次数</span></div>
            <div class="flex a-i"><span>{{imgMsg.previewWidth}}x{{imgMsg.previewHeight}}</span><span>0</span>
                <van-button round @click="save(1)">下载</van-button>
            </div>
            <div class="flex a-i"
                 v-if="imgMsg.previewWidth!==imgMsg.originalWidth && imgMsg.previewHeight!==imgMsg.originalHeight">
                <span>{{imgMsg.originalWidth}}x{{imgMsg.originalHeight}}</span><span>1</span>
                <van-button round @click="save(2)">下载</van-button>
            </div>
            <div class="flex a-i weibo" @click="copyLink"><img src="@/assets/images/weibo.png" alt="">微博进入用户注意</div>
            <div class="num">
                当前可用次数：<i>{{userSubscribe ? userSubscribe.freeRemaining +
                userSubscribe.monthRemaining : 0}}</i> <span @click="goPay">去充值</span>
            </div>
        </van-popup>
        <van-popup v-model="showBg" position="bottom" closeable :overlay="false" class="showBgP">
            <div class="top_p flex a-i">
                <span v-for="(item,idx) in bgTabs" :key="idx" :class="{acive : bgType===idx}"
                      @click="changeBgType(idx)">{{item.title}}</span>
            </div>
            <div class="con" ref="imgs">
                <div v-for="(it,idx) in nowList" :key="idx" :class="{bgselect : bgIndex===idx}"
                     @click="changebg(idx)">
                    <img :src="it" alt="">
                </div>
            </div>
            <div class="bth">
                <van-uploader :after-read="afterReadBg" :max-count="1">
                    <div class="flex a-i">
                        <van-icon name="photograph" color="rgb(233,39,91)" size=".34rem"/>
                        上传背景
                    </div>
                </van-uploader>
            </div>
        </van-popup>
        <van-popup v-model="showColorList" position="bottom" :overlay="false" class="showColorList">
            <span @click="showColorList=false">完成</span>
            <div class="color flex">
                <div v-for="(item,idx) in colorList" :key="idx" :style="{backgroundColor:item}"
                     @click="changeColor(item,idx)" :class="{active:selectC===idx}"></div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {uploadImgApi, getMattingInfo, downloadMattedImage, userSubscribe, copyUpload} from '@/apis'
    import {getToken, setToken, removeToken} from "../../utils/auth";
    import {mapGetters, mapActions} from 'vuex'
    import JSManipulate from '../../utils/jsmanipulate.js'
    import b_o from '@/assets/images/b_o.png'
    import b_1 from '@/assets/images/b_1.png'
    import b_2 from '@/assets/images/b_2.png'
    import b_3 from '@/assets/images/b_3.png'
    import b_4 from '@/assets/images/init_people.jpg'
    import b_5 from '@/assets/images/photo_o.png'
    import bg1 from '@/assets/bgs1/1.jpg'
    import bg2 from '@/assets/bgs1/2.jpg'
    import bg3 from '@/assets/bgs1/3.jpg'
    import bg4 from '@/assets/bgs1/4.jpg'
    import bg5 from '@/assets/bgs1/5.jpg'
    import bg6 from '@/assets/bgs1/6.jpg'
    import bg7 from '@/assets/bgs1/7.jpg'
    import bg8 from '@/assets/bgs1/8.jpg'
    import bg9 from '@/assets/bgs1/9.jpg'
    import bg10 from '@/assets/bgs1/10.jpg'
    import bg11 from '@/assets/bgs1/11.jpg'
    import bg12 from '@/assets/bgs1/12.jpg'
    import bg13 from '@/assets/bgs1/13.jpg'
    import bg14 from '@/assets/bgs1/14.jpg'
    import bg15 from '@/assets/bgs1/15.jpg'
    import bg16 from '@/assets/bgs1/16.jpg'
    import bg17 from '@/assets/bgs1/17.jpg'
    import bg18 from '@/assets/bgs1/18.jpg'
    import bg19 from '@/assets/bgs1/19.jpg'
    import bg20 from '@/assets/bgs1/20.jpg'
    import bg21 from '@/assets/bgs1/21.jpg'
    import bgs1 from '@/assets/bgs2/1.jpg'
    import bgs2 from '@/assets/bgs2/2.jpg'
    import bgs3 from '@/assets/bgs2/3.jpg'
    import bgs4 from '@/assets/bgs2/4.jpg'
    import bgs5 from '@/assets/bgs2/5.jpg'
    import bgs6 from '@/assets/bgs2/6.jpg'
    import bgs7 from '@/assets/bgs2/7.jpg'
    import bgs8 from '@/assets/bgs2/8.jpg'
    import bgs9 from '@/assets/bgs2/9.jpg'
    import bgs10 from '@/assets/bgs2/10.jpg'
    import bgs11 from '@/assets/bgs2/11.jpg'
    import bgs12 from '@/assets/bgs2/12.jpg'
    import bgs13 from '@/assets/bgs2/13.jpg'
    import bgs14 from '@/assets/bgs2/14.jpg'
    import bgs15 from '@/assets/bgs2/15.jpg'
    import bgs16 from '@/assets/bgs2/16.jpg'
    import bgs17 from '@/assets/bgs2/17.jpg'
    import bgs18 from '@/assets/bgs2/18.jpg'
    import bgs19 from '@/assets/bgs2/19.jpg'
    import bgs20 from '@/assets/bgs2/20.jpg'
    import bgs21 from '@/assets/bgs2/21.jpg'
    import bgs22 from '@/assets/bgs2/22.jpg'
    import bgs23 from '@/assets/bgs2/23.jpg'
    import bgz1 from '@/assets/bgs3/1.jpg'
    import bgz2 from '@/assets/bgs3/2.jpg'
    import bgz3 from '@/assets/bgs3/3.jpg'
    import bgz4 from '@/assets/bgs3/4.jpg'
    import bgz5 from '@/assets/bgs3/5.jpg'
    import bgz6 from '@/assets/bgs3/6.jpg'
    import bgz7 from '@/assets/bgs3/7.jpg'
    import bgz8 from '@/assets/bgs3/8.jpg'
    import bgz9 from '@/assets/bgs3/9.jpg'
    import bgz10 from '@/assets/bgs3/10.jpg'
    import bgz11 from '@/assets/bgs3/11.jpg'
    import bgz12 from '@/assets/bgs3/12.jpg'
    import bgz13 from '@/assets/bgs3/13.jpg'
    import bgz14 from '@/assets/bgs3/14.jpg'
    import bgz15 from '@/assets/bgs3/15.jpg'
    import bgz16 from '@/assets/bgs3/16.jpg'
    import bgz17 from '@/assets/bgs3/17.jpg'
    import bgz18 from '@/assets/bgs3/18.jpg'
    import bgz19 from '@/assets/bgs3/19.jpg'
    import bgz20 from '@/assets/bgs3/20.jpg'
    import bgz21 from '@/assets/bgs3/21.jpg'
    import bgz22 from '@/assets/bgs3/22.jpg'
    import bgz23 from '@/assets/bgs3/23.jpg'
    import bgz24 from '@/assets/bgs3/24.jpg'
    import bgz25 from '@/assets/bgs3/25.jpg'
    import bgz26 from '@/assets/bgs3/26.jpg'
    import bgz27 from '@/assets/bgs3/27.jpg'
    import bgz28 from '@/assets/bgs3/28.jpg'
    import bgz29 from '@/assets/bgs3/29.jpg'
    import bgz30 from '@/assets/bgs3/30.jpg'
    import vHeader from '@/components/h_header'
    // import people from '@/assets/images/headcount.gif'
    import {EXIF} from 'exif-js'
    import {Toast, Dialog} from 'vant'
    import op from '@/assets/images/opacity.jpg'
    import {wxJssdkData} from '@/apis/wxJssdk.js'
    import {BrowserInfo} from '@/utils'

    export default {
        name: "index",
        data() {
            return {
                m_top: 0,
                op,
                show: false,
                showPopup: false,
                showBg: false,
                imgurl: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/06/17/859b07c961b84c4abe27a5d0f51923eb.png',
                imgInfo: 1,
                Original: b_4,//原图链接
                Original_Obj: '',//原图加载后对象
                bg_Original: '',//去背景图链接
                loadImgObj: '',//去背景图加载后对象
                colorValue: '',
                choseList: [
                    {title: '原图', url: b_4},
                    {title: '透明', url: b_o},
                    {title: '纯色', url: b_1},
                    {title: '黑白', url: b_2},
                    {title: '模糊', url: b_3},
                    {title: '背景图片', url: b_5},
                ],
                bgTabs: [
                    {title: '风景'},
                    {title: '手绘'},
                    {title: '颜色'},
                ],
                nowList: [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17, bg18, bg19, bg20, bg21],
                bgList: [
                    [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17, bg18, bg19, bg20, bg21],
                    [bgs1, bgs2, bgs3, bgs4, bgs5, bgs6, bgs7, bgs8, bgs9, bgs10, bgs11, bgs12, bgs13, bgs14, bgs15, bgs16, bgs17, bgs18, bgs19, bgs20, bgs21, bgs22, bgs23,],
                    [bgz1, bgz2, bgz3, bgz4, bgz5, bgz6, bgz7, bgz8, bgz9, bgz10, bgz11, bgz12, bgz13, bgz14, bgz15, bgz16, bgz17, bgz18, bgz19, bgz20, bgz21, bgz22, bgz23, bgz24, bgz25, bgz26, bgz27, bgz28, bgz29, bgz30,],
                ],
                selectType: 1,
                bgType: 0,
                bgIndex: -1,
                afterUp: false,
                fileId: '',
                imgMsg: '',//抠图返回结果
                images: [],
                uploadBg: '',
                sec_bg_obj: '',//当前选中背景加载后对象
                bg_or_obj: '',//原图比例去背景加载后对象
                showColorList: false,//色板
                colorList: [
                    '#fc0615', '#ff7f02', '#ffff11', '#1cff12', '#1bffff', '#0000fe', '#fc01fc', '#7f0f7f', '#986633', '#ffffff', '#7f7f7f', '#000000',
                    '#ffffff', '#ebebeb', '#d6d6d6', '#c2c2c2', '#adadad', '#999999', '#858585', '#707070', '#5c5c5c', '#474747', '#333333', '#000000',
                    '#12374a', '#061a55', '#10033b', '#2e063b', '#3c091a', '#5c0f07', '#5b1f05', '#563309', '#583c0c', '#676113', '#4f5613', '#273e14',
                    '#154d66', '#0f2f7c', '#190950', '#451058', '#551428', '#81190c', '#7b2a0c', '#7b4a10', '#795813', '#8c8614', '#71761a', '#38571c',
                    '#0a6d8d', '#1542a9', '#2a0876', '#621c7e', '#781d3e', '#b51d12', '#ae3d13', '#aa6917', '#a77a15', '#c3bc14', '#9aa40d', '#4f7a28',
                    '#158cb4', '#1855d4', '#371b94', '#7a259e', '#982550', '#e32316', '#db5017', '#d4810b', '#d39c0c', '#f5eb17', '#c3d119', '#689d31',
                    '#06a1d7', '#1260fe', '#4e22b5', '#972abb', '#ba2c5c', '#ff3f1a', '#fe690b', '#fcaa18', '#fec810', '#fffc45', '#d9ec38', '#76bc3f',
                    '#0fc7fd', '#3c87fe', '#5f2eec', '#bf36f5', '#e73a7c', '#ff6050', '#ff8647', '#ffb43f', '#fecb3e', '#fef769', '#e3ef65', '#97d45f',
                    '#54d6fa', '#75a7ff', '#874efd', '#d257fd', '#ef71a0', '#fe8c82', '#fea57d', '#fec775', '#fdda76', '#fdf892', '#ebf390', '#b2dd8b',
                    '#96e2fa', '#a9c6fe', '#b18cfd', '#e391fd', '#f4a4c1', '#ffb4ae', '#fec5aa', '#ffd9a8', '#fee4a9', '#fefaba', '#f4f6b7', '#cce8b5',
                    '#ccf0fe', '#d3e2ff', '#d9c8fe', '#efcafe', '#f9d3e0', '#fedbd9', '#ffe3d7', '#feedd3', '#fff1d4', '#fffdde', '#f7fadd', '#e0eed5',
                ],//色板
                selectC: -1,//选择的颜色下标
                subs: 0,
                userSubscribe: 0,
                lianImg: '',//链接抠图
            }
        },
        computed: {},
        components: {
            vHeader
        },
        created() {
            const data = {
                title: '一键人像抠图———在线换背景',
                desc: '不必专业PS，新手小白都会用',
                link: window.location.href,
                imgUrl: 'http://guoqing.deeplor.com/img/share_p.jpg'
            }
            wxJssdkData( this, data )
        },
        methods: {
            afterReadBg(file) {//自定义上传背景
                const bgurl = file.content;
                let oimg = new Image()
                oimg.crossOrigin = '';
                oimg.onload = () => {
                    this.uploadBg = oimg
                    this.bgIndex = -1
                    this.imgurl = this.initBgimg( this.loadImgObj, oimg );
                }
                oimg.src = bgurl
            },
            changebg(idx) {//背景图片点击
                if (idx === this.bgIndex) return;
                this.uploadBg = '';
                this.bgIndex = idx;
                let bgimgs = new Image()
                bgimgs.crossOrigin = '';
                bgimgs.onload = () => {
                    this.sec_bg_obj = bgimgs;
                    this.imgurl = this.initBgimg( this.loadImgObj, bgimgs );
                }
                bgimgs.src = this.bgList[this.bgType][idx];

            },
            initBgimg(pr_img, bg_img) {//生成背景通用方法
                let can = document.createElement( 'canvas' );
                const ctx = can.getContext( '2d' ), oBg = bg_img;
                can.width = pr_img.width;
                can.height = pr_img.height;
                const h = can.width * oBg.height / oBg.width;
                const w = can.height * oBg.width / oBg.height;
                // console.log( h, can.width, can.height, oBg.width, oBg.height );
                if (h > can.height) {
                    const bh = ((h - can.height) / 2) * oBg.height / h;
                    ctx.drawImage( oBg, 0, bh, oBg.width, oBg.height - 2 * bh, 0, 0, can.width, can.height );
                } else {
                    const bw = ((w - can.width) / 2) * oBg.width / w;
                    ctx.drawImage( oBg, bw, 0, oBg.width - 2 * bw, oBg.height, 0, 0, can.width, can.height );
                }
                ctx.drawImage( pr_img, 0, 0, can.width, can.height );
                return can.toDataURL( 'image/png' )
            },
            changeBgType(i) {//点击风景分类
                if (i === this.bgType) return;
                this.bgType = i
                this.bgIndex = -1
                this.$refs.imgs.scrollTo( 0, 0 )
                this.nowList = [];
                this.$nextTick( () => {
                    this.nowList = this.bgList[this.bgType];
                } )
            },
            changeType(idx) {
                this.colorValue = '';
                this.bgIndex = -1;
                this.selectC = -1;
                if (idx === 2) this.showColorList = true;
                if (idx === 5) this.showBg = true;
                if (this.selectType === idx) return;
                this.selectType = idx;
                if (idx === 0) this.imgurl = this.Original;
                else if (idx === 1) this.imgurl = this.bg_Original;
                else if (idx === 2) this.showColorList = true;
                else if (idx === 3) this.SpecialEffects( 1 );
                else if (idx === 4) this.SpecialEffects( 2 );
                else this.showBg = true
            },
            afterRead(file) {
                Toast.loading( {mask: true, message: '处理中...', duration: 0} );
                let param = new FormData(), _self = this;
                // console.log( file, file.file, file.name );
                param.append( 'file', file.file, file.name );
                let imgs = document.createElement( 'img' );
                this.Original = file.content;
                imgs.crossOrigin = '';
                imgs.onload = () => {
                    EXIF.getData( imgs, function () {
                        _self.imgInfo = EXIF.getTag( this, "Orientation" ) ? EXIF.getTag( this, "Orientation" ) : 1;
                        console.log( EXIF.getTag( this, "Orientation" ) )
                        param.set( 'orientation', _self.imgInfo );
                        param.set( 'mattingType', 3 )
                        uploadImgApi( param ).then( res => {
                            if (!res.code) {
                                _self.fileId = res.data.fileId;
                                if (res.data.status !== 'success') {
                                    _self.pollingImg()
                                    return
                                }
                                _self.imgMsg = res.data
                                window.localStorage.setItem( 'otherUrl0',JSON.stringify({url:res.data.original,name:file.name}) )
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
                                window.localStorage.setItem( 'otherUrl0',JSON.stringify({url:res.data.original,name:'otherUrl0'}) )
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
                let [one, two] = [false, false];
                this.selectType = 1;
                this.bg_or_obj = '';
                this.uploadBg = '';
                this.choseList[0].url = item.original
                this.Original = item.original
                this.bg_Original = item.bgRemovedPreview;
                this.imgurl = item.bgRemovedPreview;
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.loadImgObj = oImg;//预览图加载后对象
                    one = true;
                    if (one && two) {
                        this.afterUp = true;
                        this.initTags()
                        this.$nextTick( () => {
                            this.m_top = 0
                            this.initSysMsg()
                        } )
                        Toast.clear();
                    }
                }
                oImg.src = item.bgRemovedPreview + `?str=${Math.random()}`;
                let oImg_o = new Image();
                oImg_o.crossOrigin = '';
                oImg_o.onload = () => {
                    this.Original_Obj = oImg_o;
                    two = true;
                    if (one && two) {
                        this.afterUp = true;
                        this.initTags()
                        this.$nextTick( () => {
                            this.m_top = 0
                            this.initSysMsg()
                        } )
                        Toast.clear();
                    }
                }
                oImg_o.src = item.original + `?str=${Math.random()}`
                this.bgIndex = -1
            },
            repeatUp() {
                document.getElementsByClassName( 'van-uploader__input' )[0].click()
            },
            changeColor(c, idx) {
                // console.log( e.target.value );
                this.selectC = idx;
                this.selectType = 2;
                this.colorValue = c;
                this.imgurl = this.initBgcolor( this.loadImgObj, this.colorValue )
            },
            initBgcolor(bg, color) {
                let cans = document.createElement( 'canvas' )
                const ctx = cans.getContext( '2d' )
                cans.width = bg.width
                cans.height = bg.height
                if (color) {
                    ctx.fillStyle = color
                    ctx.fillRect( 0, 0, cans.width, cans.height )
                }
                ctx.drawImage( bg, 0, 0 );
                return cans.toDataURL( "image/png" )
            },
            SpecialEffects(k) {
                this.imgurl = this.initSpecialEffects( this.loadImgObj, this.Original_Obj, k )
            },
            initSpecialEffects(bg, or, k) {
                let can = document.createElement( 'canvas' )
                const ctx = can.getContext( '2d' )
                can.width = bg.width
                can.height = bg.height
                ctx.drawImage( or, 0, 0, can.width, can.height )
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
                    if (this.bg_or_obj) {
                        this.classUser( this.bg_or_obj )
                        return
                    }
                    downloadMattedImage( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            let oImage = new Image()
                            oImage.crossOrigin = '';
                            oImage.onload = () => {
                                this.bg_or_obj = oImage
                                this.classUser( oImage )
                            }
                            oImage.src = res.data
                        }
                    } )
                }
            },
            classUser(oImage) {//通用提取
                if (this.selectType === 0) this.images = [this.initBgcolor( this.Original_Obj )];
                else if (this.selectType === 1) this.images = [this.initBgcolor( oImage )];
                else if (this.selectType === 2) this.images = [this.initBgcolor( oImage, this.colorValue )];
                else if (this.selectType === 3) this.images = [this.initSpecialEffects( oImage, this.Original_Obj, 1 )];
                else if (this.selectType === 4) this.images = [this.initSpecialEffects( oImage, this.Original_Obj, 2 )];
                else this.images = this.uploadBg ? [this.initBgimg( oImage, this.uploadBg )] : [this.initBgimg( oImage, this.sec_bg_obj )];
                this.show = true;
                Toast.clear()
            },
            initTags() {
                let can = document.createElement( 'canvas' ), primg = '', orimg = '';
                const ctx = can.getContext( '2d' );
                can.width = 60;
                can.height = 60 * this.Original_Obj.height / this.Original_Obj.width;
                ctx.drawImage( this.loadImgObj, 0, 0, 60, can.height );
                const pre = can.toDataURL( 'image/png' );
                ctx.clearRect( 0, 0, 60, can.height );
                ctx.drawImage( this.Original_Obj, 0, 0, 60, can.height );
                const ori = can.toDataURL( 'image/png' );
                let oimg = new Image();
                oimg.crossOrigin = '';
                oimg.onload = () => {
                    primg = oimg
                    if (primg && orimg) {
                        this.choseList[3].url = this.initSpecialEffects( primg, orimg, 1 )
                        this.choseList[4].url = this.initSpecialEffects( primg, orimg, 2 )
                    }
                };
                oimg.src = pre;
                let oimg2 = new Image()
                oimg2.crossOrigin = ''
                oimg2.onload = () => {
                    orimg = oimg2
                    if (primg && orimg) {
                        this.choseList[3].url = this.initSpecialEffects( primg, orimg, 1 )
                        this.choseList[4].url = this.initSpecialEffects( primg, orimg, 2 )
                    }
                }
                oimg2.src = ori
            },
            goPay() {//去充值
                // this.initSysMsg()
                window.location.href = 'index.html#/price'
            },
            initSysMsg() {
                const ch = document.body.clientHeight || document.documentElement.clientHeight;
                const cw = document.body.clientWidth || document.documentElement.clientWidth;
                const img = document.getElementsByClassName( 'imgsss' )[0]
                const bh = this.$refs.afters.offsetHeight;
                const hh = document.getElementById( 'h_header' ).offsetHeight
                const xh = ch - bh - hh;
                const imgH = cw * this.loadImgObj.height / this.loadImgObj.width;
                if (imgH > xh) img.style.cssText = `height:${xh}px;width:auto;margin:0 auto;`;
                else {
                    this.m_top = `${(xh - imgH) / 2}px`;
                    img.style.cssText = `height:auto;width:100%;margin:0 auto;`;
                }
                ;
            },
            initImgData() {
                this.lianImg = JSON.parse( window.localStorage.getItem( 'otherUrl0' ) );
                if( !this.lianImg)return;
                Toast.loading( {mask: true, message: '处理中...', duration: 0} );
                let obj = {url: this.lianImg.url, mattingType: 3};
                copyUpload( obj ).then( res => {
                    this.fileId = res.data.fileId;
                    if (res.data.status !== 'success') {
                        this.pollingImg();
                        return
                    }
                    this.imgMsg = res.data;
                    this.loadImg( res.data )
                } )
            },
            copyLink(){
                Dialog.alert({
                    title: '提示',
                    message: '微博浏览器会将png格式保存为JPG格式，需要原图的用户请使用普通手机浏览器打开m.picup.shop',
                    confirmButtonText:"点击复制链接"
                }).then(() => {
                    let Url2=`http://m.picup.shop`;
                    let oInput = document.createElement('input');
                    oInput.value = Url2;
                    document.body.appendChild(oInput);
                    oInput.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    // oInput.className = 'oInput';
                    oInput.style.display='none';
                    oInput.blur()
                    Toast('复制成功')
                });
            }
        },
        mounted() {
            this.initImgData();
            if(getToken()){
                userSubscribe().then( res => {
                    this.userSubscribe = res.data
                } )
            }
        },
    }
</script>

<style scoped lang="scss">
    .main .mainimg {
        background-size: cover;
        background-position: center;
    }

    .main {
        justify-content: center;
    }

    .afterp_b {
        /*padding-bottom: 3.5rem;*/
    }

    .main img {
        display: block;
        width: 100%;
    }

    .btn {
        padding: .2rem .4rem;
        background-color: #fff;

        .van-button {
            background-color: #F36299;
            border-color: #F36299;
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
        box-shadow: 0 .1rem .3rem #979797;

        .tags {
            justify-content: space-between;
            text-align: center;
            margin-bottom: .46rem;

            img, #color {
                background-color: #fff;
                overflow: hidden;
                margin: 0 auto .15rem;
                display: block;
                width: .6rem;
                height: .6rem;
                border: 1px solid #eee;
                border-radius: 50%;
            }

            i {
                margin: 0 auto .15rem;
                display: block;
                width: .6rem;
                height: .6rem;
                border: 1px solid #eee;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
            }

            .pos {
                position: relative;
            }

            #color {
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -0.3rem;
                z-index: 88;
            }

            &.active, .active {
                border-color: #F36299;
                color: #F36299;
            }
        }

        .btn {
            color: #fff;
            padding: 0;
            justify-content: space-between;

            .van-button {
                background-color: #F36299;
                color: #fff;
                width: 48%;
                border-color: #F36299;

                &:first-child {
                    background-color: #fff;
                    color: #F36299;
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
            color: #F36299;
            border-color: #F36299;
            font-size: .3rem;
        }
    }

    .showBgP {
        padding-top: .3rem;
        box-shadow: 0 .1rem .3rem #979797;

        .top_p {
            font-size: .28rem;
            color: #999;
            font-weight: 600;
            line-height: 1rem;
            padding: 0 .1rem;
            border-bottom: 1px solid #eee;

            span {
                margin: 0 .3rem;
            }

            .acive {
                color: #333;
                font-size: .36rem;
                border-bottom: 2px solid #F36299;
            }
        }

        .con {
            padding: .42rem .4rem;
            overflow-x: scroll;
            white-space: nowrap;
            border-bottom: 1px solid #eee;

            div {
                display: inline-block;
                width: 1.4rem;
                height: 1.4rem;
                margin-right: .2rem;
                border-radius: .1rem;
                overflow: hidden;
                background-color: #eee;

                &.acive {
                    border: 1px solid #F36299;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .bgselect {
                border: 2px solid #F36299;
            }
        }

        .bth {
            text-align: center;
            font-size: .34rem;
            color: #F36299;
            line-height: .88rem;

            .a-i {
                justify-content: center;

                .van-icon {
                    margin-right: .15rem;
                }
            }
        }
    }

    .showColorList {
        background-color: #F6F6F6;
        padding-top: .8rem;

        span {
            position: absolute;
            top: .26rem;
            right: 0;
            color: #1f75fc;
            font-size: .28rem;
            padding: 0 .26rem;
            line-height: 1;
        }

        .color {
            flex-wrap: wrap;
            width: 100%;

            div {
                width: 8.33%;
                height: .52rem;
            }

            .active {
                box-shadow: 0 0 8px #fff inset;
            }

            div:first-child {
                margin-bottom: .2rem;
            }
        }
    }
</style>
