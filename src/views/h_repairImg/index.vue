<template>
    <div class="h_repairImg flex">
        <v-header></v-header>
        <div class="setB flex a-i">
            <i class="icon iconfont icon-lujing"
               :style="{color:`${historyList.indexOf(bg_Original)>0 ? '#fff' : '#9c9c9c'}`}" @click="back(0)"></i>
            <i class="icon iconfont icon-lujing"
               :style="{color:`${historyList.indexOf(bg_Original)<(historyList.length-1) ? '#fff' : '#9c9c9c'}`}"
               @click="back(1)"></i>
            <van-icon name="replay" size=".4rem" @click="restore"/>
        </div>
        <input type="file" name="file" accept="image/*" style="display: none" ref="upImg" @change="afterRead">
        <div class="main flex">
            <div class="mainimg" @touchstart.prevent="down">
                <canvas id="cans"></canvas>
                <canvas id="upCans" :style="{'opacity':`${selectType!==1 ? 0.6 : 1}`}"></canvas>
            </div>
        </div>
        <div class="afterUp" ref="afters">
            <div class="flex tags a-i">
                <div v-for="(item,idx) in choseList" :key="idx"
                     :class="{active : selectType===idx}">
                    <div @click="changeType(idx)">
                        <i class="icon iconfont " :class="item.url"></i>
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
            <div class="btn flex">
                <van-button round @click="repeatUp">重新上传</van-button>
                <van-button round icon="icon iconfont icon-xiazai" @click="upfixImg(1)">保存图片</van-button>
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
        <van-popup v-model="showPen" position="bottom" :overlay="false" class="showColorList" closeable >
            <p>画笔大小</p>
            <div class="posss">
                <van-slider v-model="pensize" bar-height="10px" active-color="#4254e6" :max="30" :min="1"/>
                <span>{{pensize}}px</span>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {redirMatting, uploadossBg, downloadMattedImage} from '@/apis'
    import {compressImg}from '../../utils'
    import vHeader from '@/components/h_header'
    import {EXIF} from 'exif-js'
    import {Toast, Dialog} from 'vant'
    import {wxJssdkData} from '@/apis/wxJssdk.js'

    export default {
        name: "index",
        data() {
            return {
                show: false,
                showBg: false,
                showPen: false,
                pensize: 10,
                Original: {},//原图链接
                Original_Obj: '',//原图加载后对象
                bg_Original: '',//去背景图链接
                loadImgObj: '',//去背景图加载后对象
                choseList: [
                    {title: '涂抹修复', url: 'icon-huabi'},
                    {title: '勾选修复', url: 'icon-taosuo'},
                    {title: '点击修复', url: 'icon-dianji'},
                    // {title: '黑白', url: b_2},
                    // {title: '模糊', url: b_3},
                    // {title: '背景图片', url: b_5},
                ],
                selectType: 0,
                afterUp: false,
                fileId: '',
                images: [],
                cans: '',
                cansTxt: '',
                upCans: '',
                upCansTxt: '',
                hiddenCans: '',
                hiddenCansTxt: '',
                mainContain: null,//canvas容器
                historyList: [],
                downXy:{x:'',y:''},
                isPattern:0,
                oContent:null
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
            redInit() {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.hiddenCansTxt.fillStyle = '#000';
                    this.hiddenCansTxt.fillRect( 0, 0, this.hiddenCans.width, this.hiddenCans.height );
                    this.upCansTxt.clearRect( 0, 0, this.upCans.width, this.upCans.height );
                    this.cansTxt.drawImage( oImg, 0, 0, );
                }
                oImg.src = this.bg_Original + `?str=${Math.random()}`;
            },
            back(k) {
                const idx = this.historyList.indexOf( this.bg_Original );
                if ((!k && idx < 1) || (k && idx === this.historyList.length - 1)) return;
                const i = k ? idx + 1 : idx - 1;
                this.bg_Original = this.historyList[i];
                this.redInit();
            },
            restore() {
                Dialog.confirm( {
                    title: '重置确认',
                    message: '确定要重新修复么？',
                } ).then( () => {
                    this.cansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                    this.upCansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                    this.hiddenCansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                    this.bg_Original = this.Original.url;
                    this.historyList = [this.Original.url];
                    this.initCans();
                } ).catch( () => {
                    // on cancel
                } );

            },
            changeType(idx){
                if([0,2].includes(idx))this.showPen=true;
                else this.showPen=false;
                if(idx===this.selectType)return;
                this.selectType=idx;
                this.hiddenCansTxt.fillStyle = '#000';
                this.hiddenCansTxt.fillRect( 0, 0, this.Original_Obj.width, this.Original_Obj.height );
                this.upCansTxt.clearRect( 0, 0, this.Original_Obj.width, this.Original_Obj.height );
            },
            afterRead(e) {
                Toast.loading( {mask: true, message: '上传中...', duration: 0} );
                const file = e.target.files[0];
                compressImg(file).then(blob=>{
                    let param = new FormData();
                    param.append( 'file', blob );
                    uploadossBg( param ).then( res => {
                        this.Original = {url: res.data, name: file.name};
                        console.log(this.Original,2222)
                        this.bg_Original=res.data;
                        this.historyList = [this.Original.url]
                        window.localStorage.setItem( 'otherUrl2', JSON.stringify( this.Original ) )
                        this.initCans();
                    } )
                })


            },
            down(e){
                const ev=e.touches[0];
                this.downXy = {
                    x: (ev.clientX - this.oContent.left) * this.cans.width / this.mainContain.offsetWidth,
                    y: (ev.clientY - this.oContent.top) * this.cans.height / this.mainContain.offsetHeight,
                }
                if (!this.selectType || this.selectType === 2) this.isPattern = this.selectType === 2 ? 3 : 1;//抹擦
                else if (this.selectType === 1) this.isPattern = 2;//勾选
                if ([1, 3].includes( this.isPattern )) {
                    this.toRepair( this.upCansTxt, this.downXy );
                    this.toRepair( this.hiddenCansTxt, this.downXy, 1 );
                } else if (this.isPattern === 2) {
                    this.toLineTo( this.upCansTxt, this.downXy, 0 );
                    this.toLineTo( this.hiddenCansTxt, this.downXy, 0, 1 );
                }
            },
            moves(e){
                const ev=e.touches[0];
                const moveXy={
                    x: (ev.clientX - this.oContent.left) * this.cans.width / this.mainContain.offsetWidth,
                    y: (ev.clientY - this.oContent.top) * this.cans.height / this.mainContain.offsetHeight,
                }
                if (this.isPattern === 1) {
                    this.toRepair( this.upCansTxt, moveXy );
                    this.toRepair( this.hiddenCansTxt, moveXy, 1 );
                } else if (this.isPattern === 2) {
                    this.toLineTo( this.upCansTxt, moveXy, 1 );
                    this.toLineTo( this.hiddenCansTxt, moveXy, 1, 1 );
                }
            },
            ups(e){
                const ev=e.changedTouches[0];
                if (this.isPattern === 2) {
                    this.toLineTo( this.upCansTxt, ev.clientX - this.oContent.left, 2 );
                    this.toLineTo( this.hiddenCansTxt, ev.clientY - this.oContent.top, 2, 1 );
                }
                if(this.isPattern)this.upfixImg();
                this.isPattern = 0;

            },
            upfixImg(k){//修复
                Toast.loading({mask: true, message: '处理中...', duration: 0} )
                // console.log( this.hideCan.toDataURL() );
                let fromData = new FormData();
                fromData.set( 'width', this.Original_Obj.width );
                fromData.set( 'height', this.Original_Obj.height );
                fromData.set( 'flag', k ? 1 : 0 );
                fromData.set( 'image', this.bg_Original );
                this.hiddenCans.toBlob( (blob) => {
                    fromData.set( 'mask', blob );
                    redirMatting(fromData).then(res=>{
                        if(!res.code){
                            if(!k){
                                const idx = this.historyList.indexOf( this.bg_Original );
                                if (idx !== this.historyList.length - 1) this.historyList.splice( idx + 1, this.historyList.length );
                                this.bg_Original = res.data;
                                this.historyList.push( this.bg_Original );
                                this.redInit();
                            }else {
                                this.images=[res.data];
                                this.show=true;
                            }
                            Toast.clear();
                        }
                    }).finally(()=>{

                    })
                }, 'image/jpeg' );
            },
            toRepair(cans, downXy, k) {//操作提取
                cans.save();
                cans.beginPath();
                cans.fillStyle = k ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                cans.arc( downXy.x, downXy.y, 2 * this.pensize, 0, Math.PI * 2, false );
                cans.clip();
                cans.fillRect( 0, 0, this.Original_Obj.width, this.Original_Obj.height );
                // else cans.clearRect( 0, 0, this.oriImgObg.width, this.oriImgObg.height );
                cans.restore()

            },
            toLineTo(cans, downXy, k, j) {
                if (!k) {
                    cans.beginPath();
                    cans.strokeStyle = j ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                    cans.fillStyle = j ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                    cans.lineWidth = 4;
                    cans.moveTo( downXy.x, downXy.y );
                    if (!j) cans.setLineDash( [5] );
                } else if (k === 1) {
                    cans.lineTo( downXy.x, downXy.y );
                    cans.stroke();
                } else if (k === 2) {
                    cans.closePath();
                    if (j) cans.fill();
                    else cans.stroke();
                }

            },
            repeatUp() {
                this.$refs.upImg.click()
            },
            initCans() {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.Original_Obj=oImg;
                    [this.cans.width, this.upCans.width, this.hiddenCans.width] = [oImg.width, oImg.width, oImg.width];
                    [this.cans.height, this.upCans.height, this.hiddenCans.height] = [oImg.height, oImg.height, oImg.height];
                    this.cansTxt.drawImage( oImg, 0, 0 );
                    this.hiddenCansTxt.fillStyle = '#000';
                    this.hiddenCansTxt.fillRect( 0, 0, oImg.width, oImg.height );
                    let canWh = document.querySelector( '.main' ), w, h;
                    if (oImg.width > oImg.height) {
                        w = oImg.width > canWh.offsetWidth ? canWh.offsetWidth : oImg.width;
                        h = oImg.width > canWh.offsetWidth ? canWh.offsetWidth * oImg.height / oImg.width : oImg.height;
                    } else {
                        w = oImg.height > canWh.offsetHeight ? canWh.offsetHeight * oImg.width / oImg.height : oImg.width;
                        h = oImg.height > canWh.offsetHeight ? canWh.offsetHeight : oImg.height;
                    }
                    if (w > canWh.offsetWidth) {
                        h = canWh.offsetWidth * h / w;
                        w = canWh.offsetWidth;
                    }
                    if (h > canWh.offsetHeight) {
                        w = canWh.offsetHeight * w / h;
                        h = canWh.offsetHeight;
                    }
                    this.mainContain.style.width = w + 'px';
                    this.mainContain.style.height = h + 'px';
                    Toast.clear();
                    this.$nextTick(()=>{
                        this.oContent=document.querySelector( `.mainimg` ).getBoundingClientRect();
                    })
                };
                oImg.src = this.Original.url + `?id=${Math.random()}`;
            },
            initImgData() {//初始化参数
                [this.cans, this.upCans, this.hiddenCans] = [document.getElementById( 'cans' ), document.getElementById( 'upCans' ), document.createElement( 'canvas' )];
                [this.cansTxt, this.upCansTxt, this.hiddenCansTxt] = [this.cans.getContext( '2d' ), this.upCans.getContext( '2d' ), this.hiddenCans.getContext( '2d' )];
                this.mainContain = document.querySelector( '.mainimg' );
                this.Original = JSON.parse( window.localStorage.getItem( 'otherUrl2' ) );
                if(!this.Original)return;
                this.bg_Original = this.Original.url;
                this.historyList = [this.Original.url];
                this.initCans()
            },
        },
        mounted() {
            this.initImgData();
            document.addEventListener( 'touchmove', this.moves )
            document.addEventListener( 'touchend', this.ups )
        },
        destroyed() {
            document.removeEventListener( 'touchmove', this.moves )
            document.removeEventListener( 'touchend', this.ups )
        }
    }
</script>

<style scoped lang="scss">
    .h_repairImg {
        flex-direction: column;
        height: 100%;

        .setB {
            position: fixed;
            height: .9rem;
            font-size: .32rem;
            line-height: .9rem;
            color: #fff;
            top: 0;
            left: 50%;
            z-index: 999;
            transform: translateX(-50%);

            i:nth-child(2) {
                display: inline-block;
                transform: rotateY(180deg);
                margin: 0 .5rem;
            }
        }
    }

    .main .mainimg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 8;
        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }

        #upCans {
            z-index: 99;
        }
    }

    .main {
        justify-content: center;
        position: relative;
        flex: 1;
        border-color: #f5f5f5;
    }

    .main img {
        display: block;
        width: 100%;
    }

    .btn {
        padding: .2rem .4rem;
        background-color: #fff;

        .van-button {
            background-color: $repir;
            border-color: $repir;
        }
    }

    .afterUp {
        border-top: 1px solid #eee;
        padding: .25rem .4rem .5rem;
        background-color: #fff;
        font-size: .18rem;
        box-shadow: 0 .1rem .3rem #979797;

        .tags {
            justify-content: space-around;
            text-align: center;
            margin-bottom: .46rem;
            align-items: center;
            /*&> div:nth-child(2){*/
            /*    margin: 0 1rem;*/
            /*}*/
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
                line-height: .6rem;
                font-size: .32rem;
                border: 1px solid #9c9c9c;
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
                border-color: $repir;
                color: $repir;

                i {
                    border-color: $repir;
                }
            }
        }

        .btn {
            color: #fff;
            padding: 0;
            justify-content: space-between;

            .van-button {
                background-color: $repir;
                color: #fff;
                width: 48%;
                border-color: $repir;

                &:first-child {
                    background-color: #fff;
                    color: $repir;
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
            color: $repir;
            border-color: $repir;
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
                border-bottom: 2px solid $repir;
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
                    border: 1px solid $repir;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .bgselect {
                border: 2px solid $repir;
            }
        }

        .bth {
            text-align: center;
            font-size: .34rem;
            color: $repir;
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
        background-color: #fff;
        padding:1.1rem .4rem;
        font-size: .28rem;
        line-height: 1;
        p{
            margin-bottom: .3rem;
        }
        .posss{
            width: 80%;
            position: relative;
        }
        span {
            position: absolute;
            top: 50%;
            right: 0;
            color: #1f75fc;
            font-size: .28rem;
            transform:translate(150%,-50%);
        }
    }
</style>
