import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {Users} from "./data/user";
import {Players} from "./data/players"

export default {
    start(){
        let mock = new MockAdapter(axios);

        mock.onPost('/api/login').reply(arg=>{
            let {username, password} = JSON.parse(arg.data);
            return new Promise((resolve,reject)=>{
                let user = null;
                setTimeout(()=>{
                    let hasUser = Users.some(u=>{
                        if(u.username === username && u.password === password){
                            user = JSON.parse(JSON.stringify(u));
                            delete user.password;
                            return true
                        }
                    })
                    if (hasUser){
                        resolve([200, {code: 200, msg: '请求成功', user}])
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}])
                    }
                }, 1000)
            })
        });

        mock.onGet('/api/players').reply(config =>{
            console.log(config);
            let username = config.name;
            let bluepandaid = Number(config.bluepandaid);
            let userid = Number(config.userid);
            let serverid = config.serverid;
            let mockPlayers = Players.filter(player =>{
                if(( (player.bluepandaid===bluepandaid) || (player.userid===userid) || (player.username=== username ) ) && (player.serverid===serverid)){
                    return true
                }
                return false;
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        players:mockPlayers
                    }])
                },500)
            })
        });

        mock.onGet('/api/players/ban').reply(config =>{
            console.log(config);
            let{userid,status} = config.params;
            Players.some(u =>{
                console.log(userid);
                console.log(status);
                if (u.userid===userid){
                    console.log('!!!');
                    u.status = status;
                    return true;
                }else{
                    return false
                }
            })
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    resolve([200,{code:200,msg:'封号成功'}])
                },500)
            })
        })
    }
}
