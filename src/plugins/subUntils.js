import Vue from 'vue'
import '../style/public.css';
import filters from '../filters/filters'
import wechat from 'weixin-js-sdk'
Vue.prototype.$wechat=wechat
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
})


import { Uploader,Button,ImagePreview,Cell, CellGroup,Icon,Toast,Popup,Tab,Tabs,Field,RadioGroup, Radio  } from 'vant';
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
