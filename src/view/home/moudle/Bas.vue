<template>
    <div>
         <tabCommon moudleType='Bas'></tabCommon>
    </div>
</template>

<script>
import tabCommon from '@/components/cl-erp/tabCommon'
export default {
    components:{tabCommon},
    mounted() {
        console.log('========Bas====mounted======')
    },
}
</script>