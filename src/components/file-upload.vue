<script setup lang="ts">
import SparkMD5 from "spark-md5";
import { UploadProps, UploadRawFile } from "element-plus";
import axios from "axios";
import FilePreview from "./file-preview.vue"
import { fileTypeFromBuffer } from "file-type";

const spark = new SparkMD5.ArrayBuffer()

const md5 = ref("")
const table = ref([])
const previewHandler: UploadProps['beforeUpload'] = async (file: UploadRawFile) => {

  if (file !== undefined) {
    let text = await file.text();

    let b = await file.arrayBuffer();
    let s = spark.append(b).end()

    console.log(s)
    md5.value = s;
  }
}

const getDir = async (url: string) => {
  let res = await axios.request({
    baseURL: '/api-file',
    url: "/dir",
    params: {
      dir: url
    },
    method: "GET"
  })

  table.value = res.data.data
  console.log(res)
}

const getFile = async (id: number) => {
  axios.request({
    baseURL: '/api-file',
    url: "/file/" + id + "/download",
    method: "GET",
    responseType: 'blob'
  }).then(res => {

    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(res.data);

    let contentDisposition = res.headers['content-disposition'];

    let filename = decodeURIComponent(contentDisposition.split("=")[1])
    console.log(filename);
    //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;

    downloadElement.style.display = 'none';
    downloadElement.href = href;
    downloadElement.download = filename; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象

  })
}

const type = computed((scope: any) => {
  return scope.row.mimeType === "" ? "文件夹" : scope.row.mimeType
})

const clickRow = (row: any) => {
  getFile(row.id)
}
const conetext = (row: any) => {

}

const viewFile = () => {

}
const data = ref({})
const show = ref(false)
const mimetype = ref();
</script>

<template>
  <el-dialog v-model="show" width="100wh"
             destroy-on-close
  >
    <file-preview :file-src="'http://42.192.203.132:8083/file/'+data.id+'/view'"
                  :file-name="data.name"
    ></file-preview>
  </el-dialog>
  <el-form>
    <el-form-item>
      <el-upload
        action="/api-file/file"
        :data="{dir:'',md5:md5}"
        :before-upload="previewHandler"
        :headers="{'content-type':mimetype}"
      >
        <el-button type="primary">点我上传</el-button>
      </el-upload>


    </el-form-item>
    <el-form-item label="刷新">
      <el-input></el-input>
      <el-button @click="getDir('')">刷新表格</el-button>
    </el-form-item>
    <el-form-item>
      <el-table :data="table"
                @row-dblclick="clickRow"
                @row-contextmenu="conetext"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="filename" prop="name"></el-table-column>
        <el-table-column label="size" prop="size"></el-table-column>
        <el-table-column label="type" prop="mimetype">
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-link @click="show = !show;data=scope.row;">预览</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>