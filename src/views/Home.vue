<template>
  <section>
    <Pager :pageSize="20" :count="200" />
    <EpCascader />
    <CommonDialogComp />
  </section>
</template>

<script setup lang='ts'>
import { Pager, EpCascader, CommonDialogComp } from 'mpzj-sell-lib';

console.log(Pager);
</script>

<style scoped lang='scss'>
</style>
