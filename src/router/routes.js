// 一级路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from  '@/pages/AddCartSuccess'
import Trade from  '@/pages/Trade'
import Pay from  '@/pages/Pay'
import PaySuccess from  '@/pages/PaySuccess'
import Center from  '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
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
    {
        path:'/trade',
        // name:'trade',
        component:Trade,
        meta:{show:true}  
    },
    {
        path:'/pay',
        // name:'pay',
        component:Pay,
        meta:{show:true}  
    },
    {
        path:'/paysuccess',
        // name:'pay',
        component:PaySuccess,
        meta:{show:true}  
    },
    {
        path:'/center',
        // name:'pay',
        component:Center,
        meta:{show:true},
        children:[
            {
            path:'myorder',
            component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
]