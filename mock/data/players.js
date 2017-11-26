import Mock from 'mockjs';
let PlayerList = [];
for(let i =1;i<=100;i++){
    PlayerList.push(Mock.mock({
        'bluepandaid|+1':2017112,
        'userid|+1':1,
        username:Mock.Random.cname()
    }))
}

const Players = [
    {
        bluepandaid:20171121,
        userid:1,
        username:'Player1',
        serverid:'S2',
        create_time:'2017-11-21 12:00:00',
        last_login_time:'2017-11-25 12:00',
        status:'正常'
    },
    {
        bluepandaid:20171122,
        userid:2,
        username:'Player2',
        serverid:'S1',
        create_time:'2017-11-21 12:00:00',
        last_login_time:'2017-11-25 12:00',
        status:'正常'
    },
    {
        bluepandaid:20171123,
        userid:3,
        username:'Player3',
        serverid:'S1',
        create_time:'2017-11-21 12:00:00',
        last_login_time:'2017-11-25 12:00',
        status:'正常'
    },
];
export {PlayerList,Players}
