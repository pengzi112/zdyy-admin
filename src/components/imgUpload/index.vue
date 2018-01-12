<template>
    <div class="upload-container">
        <el-upload
            class="common-upload"
            action="https://httpbin.org/post"
            :multiple="true"
            :limit="3"
            accept="image/*"
            :on-exceed="handleExceed"
            :file-list="imgList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-change="fileChange">
            <i class="el-icon-plus" v-if="!isEdit"></i>
            <el-button size="small" type="primary" class="clickBtn" v-if="isEdit">重新上传</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>

export default {
  props: {
    maxLength: {
      type: Number,
      default: '1'
    },
    imgList: {
      type: Array,
      default: function() {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listObj: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      // console.log(arr)
      this.$emit('successCBK', arr)
    },
    handleExceed(file) {
      this.$message('单次最多上传3张图片');
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].file = file.raw
          this.listObj[objKeyArr[i]].hasSuccess = true
          // return
        }
      }
      this.handleSubmit();
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          // return
        }
      }
      this.handleSubmit();
    },
    fileChange(file, fileList) {
      console.log(file);
    },
    beforeUpload(file) {
      let fileArr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (fileArr.length > (this.maxLength - 1)) {
        this.$message('累计最多上传'+this.maxLength+'张图片')
        return false
      } else {
        const _self = this
        const _URL = window.URL || window.webkitURL
        const fileName = file.uid
        this.listObj[fileName] = {}
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function() {
            _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
          }
          resolve(true)
        })
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .upload-container {
    .common-upload{
      .el-upload{
        width: 148px;
        height: 148px;
        .el-icon-plus{
          line-height: 148px;
        }
      }
    }
    
  }
</style>
