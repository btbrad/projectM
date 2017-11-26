import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import PlayerInfoQuery from '../components/PlayerInfoQuery.vue'
import PlayerInfo from '../components/PlayerInfo.vue'

Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'登录',
            component:Login
        },
        {
            path:'/',
            name:'home',
            component:Home,
            meta:{
                needLogin:true
            },
            children:[
                {path:'/PlayerInfoQuery', component:PlayerInfoQuery, name:'角色查询',meta:{needLogin:true}},
                {path:'/PlayerInfo', component:PlayerInfo, name:'角色信息',meta:{needLogin:true}},
            ]
        },
    ]
});

router.beforeEach((to,from,next)=>{
    if(to.meta.needLogin){
        console.log('需要登录！');
        let user = JSON.parse(window.sessionStorage.getItem('access-user'));
        if(!user){
            next({path:'/login'})
        }
        next()
    }else {
        window.sessionStorage.removeItem('access-user');
        next()
    }
});

export default router;
