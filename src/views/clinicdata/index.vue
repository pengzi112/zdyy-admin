<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="门诊名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所在地区:" required>
        <el-select v-model="form.provice_id" placeholder="请选择省" @change="getCity" style="margin-right: 30px;">
          <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in provinceList"></el-option>
        </el-select>
        <el-select v-model="form.city_id" placeholder="请选择市" @change="getCounty" style="margin-right: 30px;">
          <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in cityList"></el-option>
        </el-select>
        <el-select v-model="form.area_id" placeholder="请选择区">
          <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in areaList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:" prop="detail">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>
      <el-form-item label="经纬度:" prop="jingwei">
        <el-col :span="4">
          <el-input v-model="form.jingwei" @click.native="onMap" class="getMap" readonly="readonly"></el-input>
        </el-col>
        <el-col :span="10" :offset="1" v-if="mapVisible">
          <loadMap @successLXY="mapLocation"></loadMap>
        </el-col>
      </el-form-item>
      <el-form-item label="营业时间:" required>
        <el-col :span="6">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time1" style="width: 100%;"></el-time-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="门诊靓照:" prop="clinic_img">
        <uploadImg :maxLength='6' class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item label="门诊logo:" prop="clinic_logo">
        <uploadImg :maxLength='1' class="editor-upload-btn" @successCBK="imageLogo"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
  import loadMap from '@/views/map/index'
  import { getToken } from '@/utils/auth'
  import { getArea } from '@/api/clinic'
  export default {
    components: {
      uploadImg,
      loadMap
    },
    data() {
      return {
        form: {
          name: '',
          provice_id: '',
          city_id: '',
          area_id: '',
          detail: '',
          jingwei: '点击获取经纬度',
          phone: '',
          business_time: '',
          clinic_img: [],
          clinic_logo: {},
          time1: '',
          time2: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入诊所名称', trigger: 'blur'},
          ],
          provice_id: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city_id: [
            { required: true, message: '请选择市', trigger: 'change' }
          ],
          area_id: [
            { required: true, message: '请选择县/区', trigger: 'change' }
          ],
          clinic_img: [
            {type: 'array', required: true, message: '请选择靓照', trigger: 'change'}
          ],
          clinic_logo: [
            {required: true, message: '请选择logo', trigger: 'change'}
          ],
          time1: [
            { type: 'date', required: true, message: '请选择初始时间', trigger: 'change' }
          ],
          time2: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          jingwei: [
            { required: true, message: '请选择经纬度', trigger: 'change' }
          ],
        },
        mapVisible: false, // 地图显示隐藏
        provinceList: [], // 省份列表
        cityList: [], // 城市列表
        areaList: [], // 区域列表
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        getArea(0).then(response => {
          this.provinceList = response;
        });
      },
      getCity(val) {
        getArea(val).then(response => {
          this.cityList = response;
        });
      },
      getCounty(val) {
        getArea(val).then(response => {
          this.areaList = response;
        });
      },
      onMap() {
        this.mapVisible = !this.mapVisible;
      },
      mapLocation(msg) {
        let msgJson = JSON.parse(msg);
        this.form.jingwei = msgJson.lng + ',' + msgJson.lat;
      },
      imageShow(arr) {
        for(var i = 0; i < arr.length; i++) {
          this.form.clinic_img.push(arr[i].file)
        }
      },
      imageLogo(arr) {
        this.form.clinic_logo = arr[0].file;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = Object.assign({}, this.form);
            console.log(para);
          }
        })
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

<style>
  .line{
    text-align: center;
  }
  .getMap .el-input__inner{
    cursor: pointer !important;
  }
</style>

