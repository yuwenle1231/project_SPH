import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from  '@/pages/AddCartSuccess'

export default
[
    {
        path:'/',
        redirect:'/home', //重定向，项目跑起来时，立马定向到'/home'
        meta:{show:true}  //路由的元信息，可以自定义一些属性   这里是选择 是否展示footer
    },
    {
        path:'/home', //只是切换路由时网址里面的显示地址
        component:Home,
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true}
    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{show:true}  
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}  
    },
    {
        path:'/shopcart',
        // name:'ShopCart',
        component:ShopCart,
        meta:{show:true}  
    },
]