import request from '@/utils/request'

export function clinicUpload(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('/index/index', data, config)
}

export function getArea(id) {
  return request({
    url: '/index/getArea',
    method: 'get',
    params: { 'id': id }
  })
}

export function getProject() {
  return request({
    url: '/doctor/getFun',
    method: 'get',
  })
}

export function doctorUpload(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('/doctor/index', data, config)
}

export function brandUpload(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('/brand/index', data, config)
}

export function projectUpload(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('/Clinic_label/index', data, config)
}
// 获取项目列表 (暂时去掉)
/* export function getProjectList() {
  return request({
    url: '/Clinic_label/getLabelList',
    method: 'get',
  })
} */

export function getProjectDetail(id) {
  return request({
    url: '/Clinic_label/getClinicLabel',
    method: 'get',
    params: {'label_id': id}
  })
}

export function deleteProject(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('Clinic_label/deleteClinicLabel', data, config)
}