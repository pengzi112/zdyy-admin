<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="门诊名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所在地区：" required>
        <el-col :span="5">
          <el-form-item prop="provice_id">
            <el-select v-model="form.provice_id" placeholder="请选择省" @change="getCity" style="margin-right: 30px;">
              <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in provinceList"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="city_id">
            <el-select v-model="form.city_id" placeholder="请选择市" @change="getCounty" style="margin-right: 30px;">
              <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in cityList"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="area_id">
            <el-select v-model="form.area_id" placeholder="请选择区">
              <el-option :label="item.cityName" :value="item.codeid" :key="item.codeid" v-for="(item, index) in areaList"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="详细地址：" prop="detail">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>
      <el-form-item label="门诊电话：" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="经纬度：" prop="jingwei">
        <el-col :span="4">
          <el-input v-model="form.jingwei" @click.native="onMap" class="getMap" readonly="readonly" placeholder="点击获取经纬度"></el-input>
        </el-col>
        <el-col :span="10" :offset="1" v-if="mapVisible">
          <loadMap @successLXY="mapLocation"></loadMap>
        </el-col>
      </el-form-item>
      <el-form-item label="营业时间：" required>
        <el-col :span="6">
          <el-form-item prop="time1">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time1" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-form-item prop="time2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="门诊靓照：" prop="clinic_img">
        <uploadImg :maxLength='6' :imgList="imgList" class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item label="门诊logo：" prop="clinic_logoRule">
        <uploadImg :maxLength='1' :imgList="logoList" class="editor-upload-btn" @successCBK="imageLogo"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
  import loadMap from '@/views/map/index'
  import { getToken } from '@/utils/auth'
  import { parseTime } from '@/utils/index'
  import { getInfo } from '@/api/login'
  import { getArea, clinicUpload } from '@/api/clinic'
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElCol from "element-ui/packages/col/src/col";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm,
      ElCol,
      ElFormItem,
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
          jingwei: '',
          phone: '',
          business_time: '',
          clinic_img: [],
          clinic_logo: {},
          clinic_logoRule: [], // 验证logo是否上传
          time1: '',
          time2: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入诊所名称', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入诊所电话', trigger: 'blur'},
            { min: 11, max: 11, message: '请输入正确号码', trigger: 'blur' }
          ],
          provice_id: [
            {type: 'number', required: true, message: '请选择省份', trigger: 'change' }
          ],
          city_id: [
            {type: 'number', required: true, message: '请选择市', trigger: 'change' }
          ],
          area_id: [
            {type: 'number', required: true, message: '请选择县/区', trigger: 'change' }
          ],
          clinic_img: [
            {type: 'array', required: true, message: '请选择靓照', trigger: 'change'}
          ],
          clinic_logoRule: [
            {type: 'array', required: true, message: '请选择logo', trigger: 'change'}
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
            { required: true, message: '请选择经纬度', trigger: 'blur' }
          ],
        },
        mapVisible: false, // 地图显示隐藏
        provinceList: [], // 省份列表
        cityList: [], // 城市列表
        areaList: [], // 区域列表
        imgList: [], // 靓照数组
        logoList: [], // logo
        isEdit: false, // 是否为编辑页
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        getArea(0).then(response => {
          if (response.errorCode === 200) {
            this.provinceList = response.result;
          } 
        });
        getInfo().then(response => {
          let data = response.result;
          if(data.id) {
            this.isEdit = true;
            this.form.name = data.name;
            this.form.provice_id = data.provice_id;
            this.getCity(this.form.provice_id);
            this.form.city_id = data.city_id;
            this.getCounty(this.form.city_id);
            this.form.area_id = data.area_id;
            this.form.detail = data.detail;
            this.form.phone = data.phone;
            this.form.jingwei = data.jingwei;
            this.form.business_time = data.business_time;
            let timeData = data.business_time.split(',');
            let timeStart = "2017-12-12 " + timeData[0];
            this.form.time1 = new Date(timeStart);
            let timeEnd = "2017-12-12 " + timeData[1];
            this.form.time2 = new Date(timeEnd);
            this.form.clinic_logo = data.clinic_logo;
            this.form.clinic_logoRule.push(data.clinic_logo);
            let clinic_imgStr = data.clinic_img;
            let imgArr = clinic_imgStr.split(',');
            for (var i = 0; i < imgArr.length; i++) {
              let imgObj = {url: imgArr[i]};
              this.imgList.push(imgObj);
              this.form.clinic_img.push(imgArr[i]);
            }
            let logo = {url: data.clinic_logo};
            this.logoList.push(logo);
          } else {
            this.isEdit = false;
          }
        })
      },
      getCity(val) {
        getArea(val).then(response => {
          if(response.errorCode === 200) {
            this.cityList = response.result;
          }
        });
      },
      getCounty(val) {
        getArea(val).then(response => {
          if (response.errorCode === 200) {
            this.areaList = response.result;
          }
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
        console.log(arr);
        for(var i = 0; i < arr.length; i++) {
          this.form.clinic_img.push(arr[i].file)
        }
      },
      imageLogo(arr) {
        this.form.clinic_logoRule.push(arr[0].file);
        this.form.clinic_logo = arr[0].file;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = Object.assign({}, this.form);
            let timeStart = parseTime(para.time1);
            let timeEnd = parseTime(para.time2);
            para.business_time = timeStart.slice(11) + ',' + timeEnd.slice(11);
            delete para['time1'];
            delete para['time2'];
            delete para['clinic_logoRule'];
            let param = new FormData();
            param.append('name', para.name);
            param.append('provice_id', para.provice_id);
            param.append('city_id', para.city_id);
            param.append('area_id', para.area_id);
            param.append('detail', para.detail);
            param.append('jingwei', para.jingwei);
            param.append('phone', para.phone);
            param.append('business_time', para.business_time);
            if(this.isEdit) {
              param.append('update', 'Y');
            }
            for (var i = 0; i < para.clinic_img.length; i++) {
              param.append('clinic_img[]', para.clinic_img[i]);
            }
            param.append('clinic_logo', para.clinic_logo);
            clinicUpload(param).then(response => {
              if (response.errorCode === 200) {
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  duration: 1000
                });
              }
            });
          }
        })
      },
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

