<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="门诊名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所在地区:">
        <el-select v-model="form.province" placeholder="请选择省" style="margin-right: 30px;">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.city" placeholder="请选择市" style="margin-right: 30px;">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.country" placeholder="请选择区">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="门诊电话:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="营业时间:">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="门诊靓照:">
        <uploadImg :maxLength='6' class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item label="门诊logo:">
        <uploadImg :maxLength='1' class="editor-upload-btn" @successCBK="imageLogo"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        form: {
          name: '',
          province: '',
          city: '',
          country: '',
          address: '',
          phone: '',
          date1: '',
          date2: '',
        }
      }
    },
    methods: {
      imageShow(arr) {
        console.log(arr);
      },
      imageLogo(arr) {
        console.log(arr);
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

