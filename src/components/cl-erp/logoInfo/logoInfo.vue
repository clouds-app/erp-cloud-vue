<template>

    <div class="cl-logoInfo" @click="turnToHome()">
        <img style="height:35px;" alt="Brand" :src="maxLogo" key="max-logo" />
    </div>
</template>

<script>
import baseMixin from '@/mixins'
import maxLogo from '@/assets/images/logoInfo.png'

export default {
  data () {
    return {
      maxLogo
    }
  },
  mixins: [baseMixin],
  methods: {
    turnToHome () {
      if (this.currentCurrentPage != 'home') {
        console.log('========turnToHome=====_home====setGoHome========')
        this.setGoHome()
      }
    }
  }
}
</script>

<style>

#logofont{

    width: 400px;
}

/* ul{
    float: left;
}
ul div {
     display: inline;
}
ul li{
    display: inline;

} */
.cl-logoInfo{
    cursor: pointer;
}
.info{
    margin-bottom: 10px;
}
    .companyInfo{
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        font-weight: 700;
        font-style: normal;
        font-size: 24px;
        color: #0e67b7;
    }
      .company-subInfo{
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: red;
    }
</style>
