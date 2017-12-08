<template>
    <div class="upload-container">
        <el-upload
            action="https://httpbin.org/post"
            :multiple="true"
            :limit="3"
            accept="image/*"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :show-file-list="true"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
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
    }
  },
  data() {
    return {
      listObj: {},
      fileList: [],
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
    .el-upload{
      width: 146px;
      height: 146px;
      .el-icon-plus{
        line-height: 146px;
      }
    }
  }
</style>
