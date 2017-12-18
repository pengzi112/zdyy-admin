<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目分类:">
        <el-tree
          :data="data"
          :props="defaultProps"
          :highlight-current="true"
          :show-checkbox="true"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-form-item>
      <el-form-item label="原价:">
        <el-input v-model="form.beforePrice"></el-input>
      </el-form-item>
      <el-form-item label="折扣价:">
        <el-input v-model="form.afterPrice"></el-input>
      </el-form-item>
      <el-form-item label="项目照片:">
        <uploadImg :maxLength='6' @successCBK="imageShow"></uploadImg>
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
          beforePrice: '',
          afterPrice: '',
          type: [],
        },
        data: [{
          label: '铸造支架全口类',
          disabled: true,
          children: [{
            label: '拔牙',
            disabled: true,
            children: [{
              label: '上牙',
            }, {
              label: '下牙'
            }]
          }]
        }, {
          label: '烤瓷类',
          disabled: true,
          children: [{
            label: '二级 2-1',
            disabled: true,
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            disabled: true,
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '牙齿美容类',
          disabled: true,
          children: [{
            label: '二级 3-1',
            disabled: true,
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      imageShow(arr) {
          console.log(arr);
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

