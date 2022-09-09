<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useTestStore } from '../store/modules/test';
  import { storeToRefs } from 'pinia';
  import api from '@/api';
  
  const props = defineProps<{
    msg: string
  }>()

  const testStore = useTestStore()

  const { counter, name } = storeToRefs(testStore)
  
  const count = ref(0)

  const tableData = ref([{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]);

  console.log(count, count.value, props.msg, testStore);

  const request = async () => {
    const resp =  await api.getLogin(2);
    console.log(resp);
  }

  onMounted(async () => {
    // api.getLogin(1);
    // await api.getUser();
    // await api.getUser();
    // await api.getUser();
    api.getUser();
  })
  </script>
  
<template>
  <div>
    <h3>{{ msg }}</h3>

    <el-card class="card">
      <el-button type="primary" class="mr-20" size="mini" @click="count++">count is {{ count }}</el-button>
      <el-button type="success" size="mini" @click="testStore.setCounter(counter + 1)">counter is {{ counter }}</el-button>
      <i class="el-icon-close"></i>
      <p>
        Edit
        <code>{{ name }}</code> to test HMR
      </p>
    </el-card>
    <el-table
      :data="tableData"
      style="width:  80%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-button type="danger" size="small" @click="request">接口请求</el-button>
  </div>

</template>
  
<style scoped>
.read-the-docs {
  color: #888;
}
</style>