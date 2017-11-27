<template>
    <div class="result">
        <!--<p>{{this.tableData}}</p>-->
        <h3>基本信息</h3>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="角色名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userid"
                    label="角色ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="bluepandaid"
                    label="平台ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="serverid"
                    label="所在服务器"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    label="建角时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="last_login_time"
                    label="最后更新时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="账号状态"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="">封交易所</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="onBan">封号</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="">禁言</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="">踢下线</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h3>道具列表</h3>
        <el-table
                :data="tableData[0].item"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="道具名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="道具类别"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="道具数量">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {reqBanplayer} from '../api/api'
    import {reqPlayers} from "../api/api";

    export default {
        name: 'PlayerInfo',
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            let result = sessionStorage.getItem('result');
            if (result) {
                result = JSON.parse(result);
                console.log(sessionStorage);
                console.log(result);
                this.tableData = result;
                console.log('----------------------------------' + this.tableData[0].item);
            }
        },
        methods: {
            onBan() {
                console.log(this.tableData[0].status + "----" + this.tableData[0].userid);
                this.$confirm(' 确认封号吗？', '提示', {}).then(() => {
                    let userid = this.tableData[0].userid;
                    console.log(userid);
                    let status = '封号';
                    var para = {userid, status};
                    reqBanplayer(para).then((res) => {
                        let {msg, code} = res.data;
                        console.log(code);
                        if (code === 200) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            })
                            this.refresh();
                        } else {
                            console.log('封号失败！');
                        }
                    })
                })
            },
            refresh(){
                let userid = this.tableData[0].userid;
                let serverid = this.tableData[0].serverid;
                let name = this.tableData[0].username;
                let bluepandaid = this.tableData[0].bluepandaid;
                let param= {
                    name,
                    bluepandaid,
                    userid,
                    serverid
                };
                console.log(param);
                reqPlayers(param).then((res)=>{
                    console.log(res);
                    this.tableData = res.players;
                    sessionStorage.setItem('result',JSON.stringify(res.players));
                })
            }
        }
    }
</script>

<style scoped>

</style>
