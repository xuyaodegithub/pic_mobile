<template>
    <section class="canvas">
        <img :src="bg" alt="">
        <div>
            <v-header></v-header>
            <div class="title">
                <img :src="fonts" alt="">
            </div>
            <div class="sm">
                <p>一键旅拍</p>
                <p>目前已有 <span>{{activeMsg.totalUse}}</span> 人参与活动</p>
            </div>
            <div class="img">
                <!--      <van-icon name="arrow-left" />-->
                <!--      <van-icon name="arrow" />-->
                <img :src="threeList[tidx]" alt="">
                <van-uploader :after-read="afterRead" ref="upload">
                    <div class="con">
                        <img :src="imgmsg" alt="">
                        <img :src="oneList[oidx]" alt="" class="oneBg" v-show="afterUp">
                    </div>
                    <span class="aginUp" v-if="afterUp">重新上传（横拍更佳）</span>
                </van-uploader>
            </div>
            <div class="flex a-i btns" :class="{'mt' : !afterUp}">
                <van-button round @click="saves">{{afterUp ? '保存图片' : '上传图片'}}</van-button>
                <van-button round @click="changeot()">换一换</van-button>
                <van-image-preview
                        close-on-popstate
                        v-model="show"
                        :images="images"
                >
                    <template  v-slot:index>按住图片3秒保存图片<van-icon name="down" /></template>
                </van-image-preview>
            </div>
        </div>
        <div class="APIs"><a href="http://www.picup.ai">www.picup.ai 提供智能抠图换背景技术API ，点击查看更多应用</a></div>
    </section>
</template>

<script>
    import vHeader from '@/components/h_header'
    import { uploadImgApi,activePeople,getMattingInfo } from '@/apis'
    import { setFiled,getFiled } from '@/utils/auth'
    import { wxJssdkData } from '@/apis/wxJssdk.js'
    import bg from '@/assets/travle/t_1.jpg'
    import fonts from '@/assets/travle/t_3.png'
    import o1 from '@/assets/travle/1.png'
    import o2 from '@/assets/travle/2.png'
    import o3 from '@/assets/travle/3.png'
    import o4 from '@/assets/travle/4.png'
    import o5 from '@/assets/travle/5.png'
    import o6 from '@/assets/travle/6.png'
    import o7 from '@/assets/travle/7.png'
    import o8 from '@/assets/travle/8.png'
    import o9 from '@/assets/travle/9.png'
    import o10 from '@/assets/travle/10.png'
    import o11 from '@/assets/travle/11.png'
    import o12 from '@/assets/travle/12.png'
    import o13 from '@/assets/travle/13.png'
    import o14 from '@/assets/travle/14.png'
    import o15 from '@/assets/travle/15.png'
    import o16 from '@/assets/travle/16.png'
    import o17 from '@/assets/travle/17.png'
    import o18 from '@/assets/travle/18.png'
    import o19 from '@/assets/travle/19.png'
    import o20 from '@/assets/travle/20.png'
    import o21 from '@/assets/travle/21.png'
    import o22 from '@/assets/travle/22.png'
    import o23 from '@/assets/travle/23.png'
    import o24 from '@/assets/travle/24.png'
    import o25 from '@/assets/travle/25.png'
    import o26 from '@/assets/travle/26.png'
    import o27 from '@/assets/travle/27.png'
    import o28 from '@/assets/travle/28.png'
    import o29 from '@/assets/travle/29.png'
    import o30 from '@/assets/travle/30.png'
    import o31 from '@/assets/travle/31.png'
    import o32 from '@/assets/travle/32.png'
    import o33 from '@/assets/travle/33.png'
    import o34 from '@/assets/travle/34.png'
    import o35 from '@/assets/travle/35.png'
    import o36 from '@/assets/travle/36.png'
    import o37 from '@/assets/travle/37.png'
    import o38 from '@/assets/travle/38.png'
    import o39 from '@/assets/travle/39.png'
    import o40 from '@/assets/travle/40.png'
    import o41 from '@/assets/travle/41.png'
    import o42 from '@/assets/travle/42.png'
    import o43 from '@/assets/travle/43.png'
    import o44 from '@/assets/travle/44.png'
    import o45 from '@/assets/travle/45.png'
    import o46 from '@/assets/travle/46.png'
    import o47 from '@/assets/travle/47.png'
    import o48 from '@/assets/travle/48.png'
    import o49 from '@/assets/travle/49.png'
    import o50 from '@/assets/travle/50.png'
    import o51 from '@/assets/travle/51.png'
    import o52 from '@/assets/travle/52.png'
    import o53 from '@/assets/travle/53.png'
    import o54 from '@/assets/travle/54.png'
    import o55 from '@/assets/travle/55.png'
    import o56 from '@/assets/travle/56.png'
    import o57 from '@/assets/travle/57.png'
    import o58 from '@/assets/travle/58.png'
    import o59 from '@/assets/travle/59.png'
    import o60 from '@/assets/travle/60.png'
    import o61 from '@/assets/travle/61.png'
    import o62 from '@/assets/travle/62.png'
    import o63 from '@/assets/travle/63.png'
    import o64 from '@/assets/travle/64.png'
    import o65 from '@/assets/travle/65.png'
    import o66 from '@/assets/travle/66.png'
    import o67 from '@/assets/travle/67.png'
    import o68 from '@/assets/travle/68.png'
    import o69 from '@/assets/travle/69.png'
    import o70 from '@/assets/travle/70.png'
    import o72 from '@/assets/travle/72.png'
    import o73 from '@/assets/travle/73.png'
    import o74 from '@/assets/travle/74.png'
    import o75 from '@/assets/travle/75.png'
    import o76 from '@/assets/travle/76.png'
    import o77 from '@/assets/travle/77.png'
    import o78 from '@/assets/travle/78.png'
    import o79 from '@/assets/travle/79.png'
    import o80 from '@/assets/travle/80.png'
    import o81 from '@/assets/travle/81.png'
    import o82 from '@/assets/travle/82.png'
    import o83 from '@/assets/travle/83.png'
    import o84 from '@/assets/travle/84.png'
    import o85 from '@/assets/travle/85.png'
    import t1 from '@/assets/travle/1.jpg'
    import t2 from '@/assets/travle/2.jpg'
    import t3 from '@/assets/travle/3.jpg'
    import t4 from '@/assets/travle/4.jpg'
    import t5 from '@/assets/travle/5.jpg'
    import t6 from '@/assets/travle/6.jpg'
    import t7 from '@/assets/travle/7.jpg'
    import t8 from '@/assets/travle/8.jpg'
    import t9 from '@/assets/travle/9.jpg'
    import t10 from '@/assets/travle/10.jpg'
    import t11 from '@/assets/travle/11.jpg'
    import t12 from '@/assets/travle/12.jpg'
    import t13 from '@/assets/travle/13.jpg'
    import t14 from '@/assets/travle/14.jpg'
    import t15 from '@/assets/travle/15.jpg'
    import t16 from '@/assets/travle/16.jpg'
    import t17 from '@/assets/travle/17.jpg'
    import t18 from '@/assets/travle/18.jpg'
    import t19 from '@/assets/travle/19.jpg'
    import t20 from '@/assets/travle/20.jpg'
    import t21 from '@/assets/travle/21.jpg'
    import t22 from '@/assets/travle/22.jpg'
    import t23 from '@/assets/travle/23.jpg'
    import t24 from '@/assets/travle/24.jpg'
    import t25 from '@/assets/travle/25.jpg'
    import t26 from '@/assets/travle/26.jpg'
    import t27 from '@/assets/travle/27.jpg'
    import t28 from '@/assets/travle/28.jpg'
    import t29 from '@/assets/travle/29.jpg'
    import t30 from '@/assets/travle/30.jpg'
    import t31 from '@/assets/travle/31.jpg'
    import t32 from '@/assets/travle/32.jpg'
    import t33 from '@/assets/travle/33.jpg'
    import t34 from '@/assets/travle/34.jpg'
    import t35 from '@/assets/travle/35.jpg'
    import t36 from '@/assets/travle/36.jpg'
    import t37 from '@/assets/travle/37.jpg'
    import t38 from '@/assets/travle/38.jpg'
    import t39 from '@/assets/travle/39.jpg'
    import t40 from '@/assets/travle/40.jpg'
    import t41 from '@/assets/travle/41.jpg'
    import t42 from '@/assets/travle/42.jpg'
    import tt from '@/assets/travle/t_2.jpg'
    import {Toast,ImagePreview,Icon } from 'vant';
    import ewm from '@/assets/images/ewm.png'
    import { EXIF } from 'exif-js'
    export default {
        name: "index",
        data(){
            return {
                ewm,
                index:0,
                bg,
                fonts,
                imgmsg:tt,
                oneList:[
                    o1,o2,o3,o4,o5,o6,o7,o8,o9,o10,o11,o12,o13,o14,o15,o16,o17,o18,o19,o20,
                    o21,o22,o23,o24,o25,o26,o27,o28,o29,o30,o31,o32,o33,o34,o35,o36,o37,o38,o39,o40,
                    o41,o42,o43,o44,o45,o46,o47,o48,o49,o50,o51,o52,o53,o54,o55,o56,o57,o58,o59,o60,
                    o61,o62,o63,o64,o65,o66,o67,o68,o69,o70,o72,o73,o74,o75,o76,o77,o78,o79,o80,
                    o81,o82,o83,o84,o85
                ],
                threeList:[t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,
                    t21,t22,t23,t24,t25,t26,t27,t28,t29,t30,t31,t32,t33,t34,t35,t36,t37,t38,t39,t40,t41,t42,
                ],
                oidx:Math.floor(Math.random()*85),
                tidx:Math.floor(Math.random()*42),
                afterUp:false,
                secBg:'',
                threeBg:'',
                activeMsg:{},
                show:false,
                images:[],
                fileId:'',
                timer:null,
                imgInfo:''
            }
        },
        created(){
            wxJssdkData(this)
        },
        mounted(){
            this.initStatus()
            // this.initImg()
        },
        components:{
            [ImagePreview.name]:ImagePreview,
            [Icon.name]:Icon,
            vHeader
        },
        methods:{
            initStatus(){
                activePeople({id:1}).then(res=>{
                    if(!res.code){
                        this.activeMsg=res.data
                        if(res.data.showBusy)  Toast({duration: 0, message: '系统繁忙，请稍后再试',mask:true,forbidClick:true})
                        else  this.initImg()
                    }
                })
            },
            afterRead(file, detail){
                // this.imgmsg=file.content
                Toast.loading({mask: true, message: '上传中...',duration:0});
                let param = new FormData(),_self=this;
                console.log(file, file.file, file.name);
                param.append('file', file.file, file.name);
                const imgs=document.createElement('img');
                imgs.src=file.content;
                imgs.onload=()=>{
                    EXIF.getData(imgs, function() {
                        _self.imgInfo = EXIF.getTag(this, "Orientation") ? EXIF.getTag(this, "Orientation") : 1;
                    });
                    this.canvasImg(file.content,file.file.name)
                }

                // uploadImgApi(param).then(res=>{
                //     if(!res.code){
                //         this.fileId = res.data.fileId;
                //         setFiled(res.data.fileId);
                //         if(res.data.status!=='success'){
                //             this.pollingImg()
                //             return
                //         }
                //       this.drawInfo(res.data.bgRemovedPreview)
                //     }else  {
                //         Toast({duration: 1500, message: res.msg})
                //         Toast.clear()
                //     }
                //
                // }).catch(err=>{
                //     Toast.clear()
                //     Toast({duration: 1500, message: err.data})
                // })
            },
            drawInfo(url){
                let img=url,oimg=this.threeList[this.tidx],can=document.createElement('canvas');
                let oImg=new Image()
                oImg.crossOrigin = '';
                oImg.onload=()=>{
                    this.threeBg=oImg
                    can.width=oImg.width;
                    can.height=oImg.height;
                    const cantext=can.getContext('2d');
                    let bgImg=new Image()
                    bgImg.crossOrigin = '';
                    bgImg.onload=()=>{
                        this.secBg=bgImg;
                        // const h=imsSetInfo[this.tidx].w*bgImg.height/bgImg.width;
                        const h=this.secBg.width <= this.secBg.height ?  this.secBg.height > 520 ? 520 : this.secBg.height : ((this.threeBg.width-100)*3/5)*this.secBg.height/this.secBg.width > 520 ? 520 : ((this.threeBg.width-100)*3/5)*this.secBg.height/this.secBg.width ;
                        const x= this.threeBg.width/2-(h*this.secBg.width/this.secBg.height)/2;
                        // const x=this.secBg.width <= this.secBg.height ? (this.threeBg.width/2-100)/5 : 0;
                        const w=h*this.secBg.width/this.secBg.height;
                        // const w=this.secBg.width <= this.secBg.height ? (this.threeBg.width-100)*3/5 : this.threeBg.width;
                        // cantext.drawImage(bgImg,imsSetInfo[this.tidx].x,this.threeBg.height-h,imsSetInfo[this.tidx].w,h);
                        console.log(h,x,w)
                        cantext.drawImage(bgImg,x,this.threeBg.height-h-150,w,h);
                        this.imgmsg=can.toDataURL("image/png");
                        this.afterUp=true;
                        Toast.clear()
                    }
                    bgImg.src=img
                }
                oImg.src=oimg
            },
            changeot(){
                this.oidx=Math.floor(Math.random()*this.oneList.length);
                this.tidx=Math.floor(Math.random()*this.threeList.length);
                let oimg=new Image(),can=document.createElement('canvas');
                oimg.crossOrigin = '';
                oimg.onload=()=>{
                    this.threeBg=oimg
                    // can.width=oimg.width;
                    // can.height=oimg.height;
                    // const cantext=can.getContext('2d');
                    // // const h=imsSetInfo[this.tidx].w*this.secBg.height/this.secBg.width;
                    // const h=this.secBg.width <= this.secBg.height ? (this.threeBg.width*3/5)*this.secBg.height/this.secBg.width : this.threeBg.width*this.secBg.height/this.secBg.width;
                    // const x=this.secBg.width <= this.secBg.height ? this.threeBg.width/5 : 0;
                    // const w=this.secBg.width <= this.secBg.height ? this.threeBg.width*3/5 : this.threeBg.width;
                    // cantext.drawImage(this.secBg,x,this.threeBg.height-h,w,h);
                    // this.imgmsg=can.toDataURL("image/png");
                }
                oimg.src=this.threeList[this.tidx]
            },
            saves(){
                if(!this.afterUp)document.getElementsByClassName('van-uploader__input')[0].click()
                else{
                    Toast.loading({mask: true, message: '图片生成中...',duration:0});
                    let oImgs=new Image(),canvas=document.createElement('canvas');
                    oImgs.crossOrigin = '';
                    oImgs.onload=()=>{
                        canvas.width=this.threeBg.width;
                        canvas.height=this.threeBg.height;
                        // const cantext=canvas.getContext('2d'),h=imsSetInfo[this.tidx].w*this.secBg.height/this.secBg.width;
                        const cantext=canvas.getContext('2d');
                        const h=this.secBg.width <= this.secBg.height ?  this.secBg.height > 520 ? 520 : this.secBg.height : ((this.threeBg.width-100)*3/5)*this.secBg.height/this.secBg.width > 520 ? 520 : ((this.threeBg.width-100)*3/5)*this.secBg.height/this.secBg.width ;
                        const x= this.threeBg.width/2-(h*this.secBg.width/this.secBg.height)/2;
                        // const x=this.secBg.width <= this.secBg.height ? (this.threeBg.width/2-100)/5 : 0;
                        const w=h*this.secBg.width/this.secBg.height;
                        cantext.drawImage(this.threeBg,0,0);
                        cantext.drawImage(this.secBg,x,this.threeBg.height-h-150,w,h);
                        cantext.drawImage(oImgs,50,585);
                        let oEwm=new Image();
                        oEwm.crossOrigin = '';
                        oEwm.onload=()=>{
                            cantext.drawImage(oEwm,905,580,130,130);
                            const imgurl=canvas.toDataURL("image/png")
                            this.images=[
                                imgurl
                            ]
                            this.show=true
                            Toast.clear()
                        }
                        oEwm.src=ewm

                    }
                    oImgs.src=this.oneList[this.oidx]
                }
            },
            pollingImg() {//轮询
                this.timer = setInterval(() => {
                    // this.getImgData()
                    getMattingInfo({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            if(res.data.status==='success'){
                                clearInterval(this.timer)
                                this.drawInfo(res.data.bgRemovedPreview)
                            }else Toast({message:`当前人数过多,正在排队等待!当前位置${res.data.queueNumber}`,duration:0,forbidClick:true})
                        } else {
                            clearInterval(this.timer)
                            Toast(res.msg)
                        }
                    })
                }, 3000)
            },
            initImg(){
                this.fileId=getFiled(1)
                if(!this.fileId)return;
                else {
                    Toast.loading({duration: 0, message: '加载中',mask:true,forbidClick:true})
                    this.pollingImg()
                }
            },
            //压缩
            canvasImg(url,name){
                let canva=document.createElement('canvas'),oImg=new Image();
                oImg.crossOrigin = '';
                oImg.onload=()=>{
                    oImg.width <= oImg.height ? canva.height=520 : canva.width=980;
                    oImg.width <= oImg.height ? canva.width=520*oImg.width/oImg.height : canva.height=980*oImg.height/oImg.width;
                    console.log(canva.width,canva.height)
                    const cantext=canva.getContext('2d')
                    cantext.drawImage(oImg,0,0,canva.width,canva.height)
                    canva.toBlob((blob)=>{
                        console.log(blob)
                        let param = new FormData();
                        param.append('file', blob, '111.jpg');
                        param.set('orientation',this.imgInfo);
                        uploadImgApi(param).then(res=>{
                            if(!res.code){
                                this.fileId = res.data.fileId;
                                setFiled(res.data.fileId,1);
                                if(res.data.status!=='success'){
                                    this.pollingImg()
                                    return
                                }
                                this.drawInfo(res.data.bgRemovedPreview)
                            }else  {
                                Toast({duration: 1500, message: res.msg})
                            }

                        }).catch(err=>{
                            Toast.clear()
                            Toast({duration: 1500, message: err})
                        })
                    },'image/jpeg')
                }
                oImg.src=url
            },
        }
    }
</script>

<style scoped lang="scss">
    .canvas{
        min-height: 100%;
        background-size: cover;
        position: relative;
        & > img{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        & > div{
            position: relative;
            z-index: 1;
        }
        .APIs{
            a{
                color: #f5f6ab;
            }
            font-size: .22rem;
            position: absolute;
            bottom: .28rem;
            left: 0;
            width: 100%;
            text-align: center;
            line-height: 1;
            z-index: 2;
        }
        .title{
            width: 5.36rem;
            margin:0 auto .4rem;
            padding-top: .7rem;
            img{
                display: block;
                width: 100%;
            }
        }
        .sm{
            color: #ffeda8;
            font-size: .32rem;
            line-height: .5rem;
            text-align: center;
            margin-bottom: .3rem;
            span{
                color: #f2dc68;
                font-weight: 600;
            }
        }
        .img{
            width: 5.35rem;
            position: relative;
            margin:0 auto;
            text-align: center;
            &>img{
                position: absolute;
                width: 100%;
                left:0;
                top: 0;
            }
            span.aginUp{
                display: inline-block;
                font-size: .26rem;
                line-height: .4rem;
                color: #fff;
                border-bottom: 1px solid #fff;
                margin-top: .23rem;
            }
            .con{
                border: 2px solid #fee8ae;
                img{
                    display: block;
                    width: 100%;
                }
                .oneBg{
                    position: absolute;
                    width: 90%;
                    bottom: 19%;
                    left: 5%;
                }
            }
            .van-icon{
                position: absolute;
                top: 50%;
                width: .8rem;
                height: .8rem;
                text-align: center;
                line-height: .8rem;
                font-size: .4rem;
                margin-top: -.6rem;
                color: #fff;
                background-color: #f7d50b;
                border-radius: 50%;
                &:first-child{
                    left: .11rem;
                }
                &:nth-child(2){
                    right: .11rem;
                }
            }
        }
        .btns{
            justify-content: center;
            padding-top: .4rem;
            .van-button{
                background: linear-gradient(to right, #fae788,#f7dd4a);
                width: 2.6rem;
                margin: .1rem;
                color: #c7651f;
                font-size: .36rem;
                font-weight: 600;
                line-height: .9rem;
                height: .9rem;
                box-shadow: 0 .1rem .1rem #d08b1b;
            }
        }
        .mt{
            margin-top: .55rem;
        }
    }
</style>
<style>
    .canvas .van-image-preview__index{
        font-size: .54rem;
        text-align: center;
    }
</style>
