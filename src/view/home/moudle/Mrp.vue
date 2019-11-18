<template>
    <div>
          <tabCommon moudleType='Mrp'></tabCommon>
    </div>
</template>

<script>
import tabCommon from '@/components/cl-erp/tabCommon'
export default {
    components:{tabCommon},
     mounted() {
        console.log('========Mrp====mounted======')
    },
}
</script>