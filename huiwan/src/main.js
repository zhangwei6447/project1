import { createApp } from 'vue'
import 'vant/lib/index.css'
import './style/index.less'
import App from './pages/index.vue'
import router from './router/index'
import { pinia } from './store'
import { Circle, NavBar, Search, Icon, Swipe, SwipeItem, Button, CellGroup, Field, Form, Checkbox, ActionBar, ActionBarButton, ActionBarIcon, Tabs, Tab, SubmitBar, Loading, AddressEdit, AddressList, Uploader, Overlay, Popup, Area, Sticky, Rate, ShareSheet, ImagePreview, CheckboxGroup, Grid, GridItem ,Image,TextEllipsis,PullRefresh ,FloatingBubble  } from 'vant';

// console.log(App);
createApp(App)
    .use(router)
    .use(pinia)
    .use(myTabs)
    .use(Loading)
    .use(Checkbox)
    .use(Form)
    .use(Circle)
    .use(NavBar)
    .use(Search)
    .use(Icon)
    .use(Swipe)
    .use(SwipeItem)
    .use(CellGroup)
    .use(Field)
    .use(Button)
    .use(ActionBar)
    .use(ActionBarButton)
    .use(ActionBarIcon)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(AddressEdit)
    .use(AddressList)
    .use(Uploader)
    .use(Overlay)
    .use(Popup)
    .use(Area)
    .use(Sticky)
    .use(Rate)
    .use(ShareSheet)
    .use(ImagePreview)
    .use(CheckboxGroup)
    .use(Grid)
    .use(GridItem)
    .use(Image)
    .use(TextEllipsis )
    .use(PullRefresh )
    .use(FloatingBubble )
    .mount('#app')



// 2. 引入组件样式
import 'vant/lib/index.css';

/** 引入全局样式 Preprocessor dependency "less" not found. Did you install it? Try `npm install -D less`. -- https://ant.design/docs/spec/colors-cn */
import './style/index.less'
import myTabs from "./components";
