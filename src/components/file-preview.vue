<!----------------------------------------------
----文件预览组件封装
--- @author Chen Q.
------------------------------------------------>
<script setup lang="ts">

import axios from "axios";

const props = defineProps({
  /**
   *  文件地址
   */
  fileSrc: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  /**
   * 文件信息地址，预留
   */
  fileInfoSrc: {
    type: String,
    required: false,
    default: ""
  },
  /**
   * 容器，'office'表示使用office预览容器，'image'表示使用图片容器，'pdf'表示使用iframe做容器，默认使用office容器
   */
  container: {
    type: String,
    required: false,
    default: "office"
  },
})

// watch(() => props.show, (newValue, oldValue) => {
//   console.log("hea")
//   if (newValue && DocsAPI && props.container === "office") {
//     new DocsAPI.DocEditor('myEditor', officeConfig);
//   }
// }, {
//   immediate: true
// })
//http://192.168.140.1/file/5/view


let strings = props.fileName.split(".");
const type = ref(strings[strings.length - 1]);
const container = ref("")
if (type.value === "docx" || type.value === "xlsx" || type.value === "xls" || type.value === "doc" || type.value === "ppt" || type.value === "pptx") {
  container.value = "office"
} else if (type.value === "png" || type.value === "jpg" || type.value === "jpeg") {
  container.value = "el"
} else if (type.value === "pdf" || type.value === "txt") {
  container.value = "pdf"
}

/**
 * 通用配置
 */
const commonConfig = reactive({
  height: "800",
  width: "100%"
})


if (props.fileInfoSrc !== '') {
  axios.get(props.fileInfoSrc)
}
/**
 * onlyoffice配置
 */
const officeConfig = reactive({
  document: {
    fileType: type.value,
    url: props.fileSrc
  },
  width: commonConfig.width,
  height: commonConfig.height,
  editorConfig: {
    "mode": "preview",
    "region": "zh-CN",
    "lang": "zh-CN",//"en-US",
    "spellcheck": false
  }
})

onMounted(() => {
  if (DocsAPI && container.value === "office") {
    var docEditor = new DocsAPI.DocEditor('myEditor', officeConfig);
  }
})


</script>


<template>
  <div v-if="props.fileSrc">
    <div id="myEditor" v-if="container === 'office'"></div>

    <iframe v-else-if="container === 'pdf'"
            :src="props.fileSrc"
            :width="commonConfig.width"
            :height="commonConfig.height"
    ></iframe>
    <el-image v-else-if="container === 'el'"
              :src="props.fileSrc"
    ></el-image>
    <el-input v-else type="textarea"></el-input>
  </div>
  <div v-else>
    <div>file src not exists</div>
  </div>
</template>

<style scoped lang="scss">

</style>