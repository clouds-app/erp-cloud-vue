<template>
  <div class="toolbar-container">
        <Card :bordered="false" dis-hover>
        <Row>
          <Col span="16">
            <functionBtnList :currrentRowItem="$attrs.currrentRowItem" @isLoaddingDone="$listeners.isLoaddingDone" :requestBaseUrl="$attrs.requestBaseUrl" :uniqueId="$attrs.uniqueId"/>
          </Col>
          <Col span="8">
            <searchForm  :queryParamsDefault="$attrs.queryParamsDefault"/>
          </Col>
        </Row>
      </Card>
  </div>
</template>
<script>
import functionBtnList from '../components/functionBtnList.vue'
import searchForm from '../components/searchForm.vue'

export default {
    name:'htmlInfo',
    components: {
        functionBtnList,searchForm
      },
}
</script>

<style>
</style>
