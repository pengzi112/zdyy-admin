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
