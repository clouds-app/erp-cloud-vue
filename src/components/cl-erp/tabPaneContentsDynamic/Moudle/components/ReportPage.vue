<template>
    <div class="pageDiv">
        <Page 
            :current="current" 
            :total="total" 
            :page-size='pageSize' 
            @on-change='pageChange' 
            simple 
        />
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:{
      //当前页码
      current:{
        type:Number||String,
        default:1
      },
      //总页数
      total:{
          type:Number||String,
          default:20
      },
      //每页条数
      pageSize:{
          type:Number||String,
          default:20
      }
  },
  components: {},

  methods: {
    pageChange(data){
      this.$emit('change',data)
    },
  }
}
</script>

<style scoped>
.pageDiv{
  margin-right: 30px;
}
</style>