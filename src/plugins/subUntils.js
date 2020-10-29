import Vue from 'vue'
import { BrowserInfo } from '@/utils'
import '../style/public.css';
import filters from '../filters/filters'
import wechat from 'weixin-js-sdk'
import Cookies from 'js-cookie'
Vue.prototype.$wechat=wechat
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
})
if(BrowserInfo.isWeixin){//微信打开需要重定向  是为了掉jsdk支付
    if(!Cookies.get('token')){
        window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx695bf5a85133ef4c&redirect_uri=http://m.picup.shop/weixinMp/oauth2Callback&state=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base`
    }
}
Vue.prototype.addUrlQuery=(url)=>{//图片链接后加个随机数  base64格式图片原格式返回
    var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
    if(reg.test(url))return url;
    else return url+ (url.indexOf('?')>-1 ? '&' : '?') +'id='+Math.random();
}
import { Uploader,Button,ImagePreview,Cell, CellGroup,Icon,Toast,Popup,Tab,Tabs,Field,RadioGroup, Radio,Dialog,Slider   } from 'vant';
Vue.component(Uploader.name,Uploader)
Vue.component(Button.name,Button)
Vue.component(Cell.name,Cell)
Vue.component(CellGroup.name,CellGroup)
Vue.component(Icon.name,Icon)
Vue.component(Popup.name,Popup)
Vue.component(Tab.name,Tab)
Vue.component(Tabs.name,Tabs)
Vue.component(Field.name,Field)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(Radio.name,Radio)
Vue.component(Dialog.name,Dialog)
Vue.component(Slider.name,Slider)
Vue.use(ImagePreview)
Vue.use(Toast)


Vue.directive('drag',(event)=>{
    let oDiv=event;
    oDiv.onmousedown=(ev)=>{
        if( ev.target.className!=='content' ) return;
        let x=ev.clientX-oDiv.offsetLeft;
        let y=ev.clientY-oDiv.offsetTop;
        document.onmousemove=(e)=>{
            let l=e.clientX-x;
            let t=e.clientY-y;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        }
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }

})
