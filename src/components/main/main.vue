<template>
    <Layout style="height: 100%" class="main">
      <Header class="header-con">
         <Row>
            <Col  span="5">
             <logoInfo></logoInfo>
            </Col>
            <Col  span="14">
            <topMenu></topMenu>
            </Col>
            <Col  span="5">
            <userInfo></userInfo>
            </Col>
        </Row>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
</template>
<script>
import logoInfo from '@/components/cl-erp/logoInfo'
import topMenu from '@/components/cl-erp/topMenu'
import userInfo from '@/components/cl-erp/userInfo'
import './main.less'
export default {
  name: 'Main',
  components: {
   logoInfo,
   topMenu,
   userInfo
  },
  data () {
    return {
     
    }
  },

  methods: {
  
 
  }
}
</script>
<style >
  .main .content-wrapper {
    padding: 0 18px;
    height: calc(100% - 80px);
    overflow: auto;
}
</style>
