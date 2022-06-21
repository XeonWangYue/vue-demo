<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { FormInstance } from "element-plus";

const data = ref([]);
const form = reactive({})

onMounted(async () => {
  let res = await axios.get("/api-test/find");
  data.value = res.data;
})
const formRef = ref<FormInstance>()

const addHandler = async () => {
  await axios.put("/api-test/add", form);
  let res = await axios.get("/api-test/find");
  data.value = res.data;
}
const deleteHandler = async () => {
  await axios.delete("/api-test/delete", form);
  let res = await axios.get("/api-test/find");
  data.value = res.data;
}
const modifyHandler = async () => {
  await axios.put("/api-test/modify", form);
  let res = await axios.get("/api-test/find");
  data.value = res.data;
}

const reset = () => {
  Object.keys(form).map(k => {
    delete form[k]
  })
  formRef.value?.resetFields();
}

</script>

<template>
  {{ form }}
  <el-form
    v-model="form"
    ref="formRef"
  >
    <el-form-item label="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="action">
      <el-input v-model="form.action"></el-input>
    </el-form-item>
    <el-form-item label="root">
      <el-input v-model="form.root"></el-input>
    </el-form-item>
    <el-form-item label="type">
      <el-input v-model="form.type"></el-input>
    </el-form-item>
    <el-form-item label="parent">
      <el-input v-model="form.parent"></el-input>
    </el-form-item>
    <el-form-item label="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="label">
      <el-input v-model="form.label"></el-input>
    </el-form-item>
    <el-form-item label="url">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
    <el-button @click="reset">重置</el-button>
    <el-button @click="addHandler" type="primary">添加</el-button>
    <el-button @click="deleteHandler" type="danger">删除</el-button>
    <el-button @click="modifyHandler" type="primary">修改</el-button>
  </el-form>

  <el-table
    :data="data"
    height="500px"
  >
    <el-table-column prop="id"></el-table-column>
    <el-table-column prop="action"></el-table-column>
    <el-table-column prop="root"></el-table-column>
    <el-table-column prop="type"></el-table-column>
    <el-table-column prop="parent"></el-table-column>
    <el-table-column prop="description"></el-table-column>
    <el-table-column prop="label"></el-table-column>
    <el-table-column prop="url"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>