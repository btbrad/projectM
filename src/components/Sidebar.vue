<template>
    <div>
        <ul>
            <li v-for="item in List">
                <el-button @click="goto(item.url)">{{item.name}}</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {ElButton},
        name:'Sidebar',
        props:{
            List:{
                type: Array,
                default: function () {
                    return []
                },
            }
        },
        data(){
            return{
            }
        },
        methods:{
            goto(param){
                this.$router.push(param);
            }
        }
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
</style>
