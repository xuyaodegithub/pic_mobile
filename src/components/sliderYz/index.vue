<template>
    <div class="all" v-if="visible">
        <div class="title">
            请完成安全验证
            <van-icon name="cross"  @click="close()"/>
        </div>
        <div class="ybutt">
            <div class="imgss">
                <div class="is_small" :style="{left:iLeft+5+'px'}" :class="{'addTr' : !openMoves}">
                    <img  :src="imgInfo.target"
                          alt="" @touchstart.prevent="downs">
                </div>
                <van-icon name="replay"  @click="initImg()"/>
                <!--                <i class="el-icon-loading loadings" v-show="loadings"></i>-->
                <img :src="imgInfo.img"
                     alt="" class="is_big">
            </div>
            <div class="moveDom" ref="imgs">
                <p :style="{width:ws}" :class="{'addTr' : !openMoves,'s2' : status===1,'s3' : status===2,}"></p>
                <van-icon name="arrow" :class="{'addTr' : !openMoves, 'el-icon-check' : status===2,'el-icon-right' : !status,'el-icon-close' : status===1,'hovers' : openMoves}" :style="{left:iLeft+'px'}" ref="movess" @touchstart.prevent="downs"/>
                向右拖动滑块填充拼图
            </div>
        </div>
    </div>
</template>

<script>
    var k,j
    import {userGetCaptcha, userGetvalidate} from '@/apis'
    import { Toast } from 'vant'
    export default {
        name: "index",
        props:{
            visible:Boolean
        },
        data() {
            return {
                ws: 0,
                openMoves: false,
                iLeft: 0,
                initX: 0,
                status: 0,//状态 0未验证 1验证未通过 2验证通过
                imgInfo: {},
                loadings: true,
                oxtx: '',
            }
        },
        computed: {},
        watch: {
            status(newVal) {
                if (newVal === 1 || newVal === 2) {
                    setTimeout( () => {
                        this.status = 0;
                        this.iLeft = 0;
                        this.ws = 0;
                        if(newVal!==2)this.initImg()
                        if(newVal === 2){
                            this.close()
                            this.$emit( 'success', this.imgInfo.id );
                        }
                    }, 500 )
                 }
            },
            visible(newVal,oldVal){
                if(newVal)this.initImg()
            }
        },
        methods: {
            close(){
                this.$emit( 'update:visible', false );
            },
            initImg() {
                Toast.loading( {mask: false, duration: 0,loadingType:'spinner'} );
                userGetCaptcha().then( res => {
                    if (!res.code) {
                        this.imgInfo = res.data
                        this.getImgMsg()
                    }
                    Toast.clear()
                } )
            },
            validateResult() {
                let data = {
                    id: this.imgInfo.id,
                    x: Math.ceil( (this.iLeft + 5) * this.oxtx / document.getElementsByClassName('is_big')[0].offsetWidth)
                }
                userGetvalidate( data ).then( res => {
                    if (!res.code) {
                        // this.$message( {type: 'success', message: '验证成功'} )
                        this.status = 2;
                    } else this.status = 1
                } )
            },
            downs(e) {
                 k=e.touches[0].clientX
                this.openMoves = true;
                this.initX = e.touches[0].clientX - this.$refs.movess.getBoundingClientRect().left
            },
            moves(e) {
                if (!this.openMoves) return;
                const cBoxW = this.$refs.imgs.getBoundingClientRect().left;
                const l = e.touches[0].clientX - cBoxW;
                if (l - this.initX >= this.$refs.imgs.offsetWidth - this.$refs.movess.offsetWidth) {
                    this.ws = '100%';
                    this.iLeft = this.$refs.imgs.offsetWidth - this.$refs.movess.offsetWidth;
                } else if ((l - this.initX) <= 0) {
                    this.ws = 0;
                    this.iLeft = 0;
                } else {
                    this.ws = (l - this.initX) / this.$refs.imgs.offsetWidth * 100 + '%';
                    this.iLeft = l - this.initX;
                     j=e.touches[0].clientX;
                    // console.log(k,j)
                }
            },
            ups(e) {
                if (!this.openMoves) return;
                this.openMoves = false;
                this.validateResult()
                // if(this.iLeft<this.$refs.imgs.offsetWidth-this.$refs.movess.offsetWidth){
                //     this.status= 1
                // }else if(this.iLeft===this.$refs.imgs.offsetWidth-this.$refs.movess.offsetWidth) this.status= 2
            },
            getImgMsg() {
                let oneImg = new Image();
                oneImg.src = this.imgInfo.img;
                oneImg.onload = () => {
                    this.oxtx = oneImg.width
                }
            }
        },
        mounted() {
            // console.log(this.$listeners)
            window.addEventListener( 'touchmove', this.moves )
            window.addEventListener( 'touchend', this.ups )
        },
        destroyed() {
            window.removeEventListener( 'touchmove', this.moves )
            window.removeEventListener( 'touchend', this.ups )
        }
    }
</script>

<style scoped lang="scss">
    .all {
        z-index: 9;
        width: 80%;
        padding-bottom: .4rem;
        background-color: #fff;
        box-shadow: 0 0 .2rem rgba(0, 0, 0, .3);
        margin: 0 auto;
        font-size: .32rem;
        line-height: 1rem;
        position: fixed;
        top: 3rem;
        left: 50%;
        margin-left: -40%;

        .ybutt {
            padding: 0 .3rem;
        }

        .title {
            border-bottom: 1px solid #e4e7eb;
            margin-bottom: .3rem;
            padding: 0 .6rem;

            .van-icon {
                position: absolute;
                top: .3rem;
                right: .2rem;
                font-size: .36rem;
            }
        }

        .imgss {
            position: relative;
            margin-bottom: .3rem;

            .van-icon {
                position: absolute;
                top: .2rem;
                right: .2rem;
                font-size: .5rem;
                color: #fff;
                text-shadow: 0 0 .1rem rgba(0, 0, 0, .5);
            }

            .is_big {
                display: block;
                width: 100%;
            }

            .is_small {
                position: absolute;
                top: 0;
                left: .1rem;
                height: 100%;
                width:12% ;
                img{
                    height: 100%;
                    width: 100%;
                }
                /*box-shadow: 0 0 5rem rgba(0,0,0,.3);*/
            }
        }
    }

    .addTr {
        transition: all .3s;
    }

    .moveDom {
        font-size: .24rem;
        color: #45494c;
        background-color: #ebebeb;
        line-height: .8rem;
        position: relative;
        text-align: center;

        i {
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            font-size: .28rem;
            line-height: .76rem;
            width: .76rem;
            border: 1px solid #cecece;
            background-color: #fff;

            &:hover {
                background-color: #1991fa;
                color: #fff;
            }

            &.el-icon-close:hover {
                background-color: #f57a7a;
            }

            &.el-icon-check:hover {
                background-color: #7ac23c;
            }

        }

        .el-icon-close, .s2 {
            background-color: #f57a7a;
        }

        .s2 {
            border-color: #f57a7a;
        }

        .el-icon-check, .s3 {
            background-color: #7ac23c;
            color: #fff;
        }

        .s3 {
            border-color: #7ac23c;
        }

        .hovers {
            background-color: #1991fa;
            color: #fff;
        }

        p {
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 0;
            height: .76rem;
            width: 0;
            background-color: skyblue;
            color: #fff;
            border: 1px solid #1991fa;
            border-right: 0;
        }
    }
</style>
