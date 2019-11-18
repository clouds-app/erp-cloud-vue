<template>
    <div>
         <tabCommon moudleType='Sale'></tabCommon>
    </div>
</template>

<script>
import tabCommon from '@/components/cl-erp/tabCommon'
export default {
    components:{tabCommon},
     mounted() {
        console.log('========Sale====mounted======')
    },
}
</script>