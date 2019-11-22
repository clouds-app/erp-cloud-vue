<template>
        <div>
            <Drawer v-bind="$attrs" v-on="$listeners" title="高级查询"  :value="isShowDrawer">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
            </Drawer>
        </div>
</template>
<script>
export default {
    name:'advanced-search',
    props:{
        isShowDrawer:{
            type:Boolean,
            default:false
        }, // 是否显示高级查询
    },
    data() {
        return {
            
        }
    }
    
}
</script>