<template>
    <div class="people">
        <v-header></v-header>
        <div class="main">
            <img :src="imgurl" alt="">
        </div>
        <div class="btn">
            <van-uploader :after-read="afterRead">
                <van-button round type="info" block icon="photo-o">上传图片</van-button>
            </van-uploader>
        </div>

    </div>
</template>

<script>
    import vHeader from '@/components/h_header'
    import people from '@/assets/images/bride.jpg'
    import { EXIF } from 'exif-js'
    export default {
        name: "index",
        data(){
            return {
                imgurl:people,
                imgInfo:1
            }
        },
        components:{
            vHeader
        },
        methods:{
            afterRead(file, detail){
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
                    // this.canvasImg(file.content,file.file.name)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .main img{
        display: block;
        width: 100%;
    }
    .btn{
        padding: .2rem .4rem;
        background-color: #fff;
        .van-button{
            background-color: $to;
            border-color: $to;
        }
    }
</style>
