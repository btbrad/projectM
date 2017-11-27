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
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    export default {
        name: 'PlayerInfo',
        data(){
          return{
              tableData:[],
          }
        },
        created() {
            let result = sessionStorage.getItem('result');
            if (result) {
                result = JSON.parse(result);
                console.log(sessionStorage);
                console.log(result);
                this.tableData = result;
                console.log('----------------------------------'+this.tableData[0].item);
            }
        }
    }
</script>

<style scoped>

</style>
