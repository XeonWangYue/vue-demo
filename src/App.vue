<script setup lang="ts">

import Util1 from "./components/util1.vue";
import FilePreview from "./components/file-preview.vue";
import FileUpload from "./components/file-upload.vue";

const tab = ref();
const src = ref("");
</script>


<template>
  <el-tabs v-model="tab">
    <el-tab-pane label="权限录入">
      <util1></util1>
    </el-tab-pane>
    <el-tab-pane label="文件预览">
      <el-input v-model="src"></el-input>
      <file-preview v-if="src!=''"
                    :file-src="src"
                    file-name="123.doc"
                    :show="true"
      ></file-preview>
    </el-tab-pane>
    <el-tab-pane label="文件上传">
      <file-upload></file-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
html body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

</style>
