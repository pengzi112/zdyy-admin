import request from '@/utils/request'

export function getDoctorList() {
  return request({
    url: '/doctor/getDoctorList',
    method: 'get',
  })
}

export function getDoctor(id) {
  return request({
    url: '/doctor/getDoctor',
    method: 'get',
    params:{
    	doctor_id: id
    }
  })
}

export function deleteDoctor(data) {
  let config = { 
    headers:{'Content-Type':'multipart/form-data'},
    transformRequest:[function (defaultData) {
      return defaultData
    }]
  };
  return request.post('/doctor/deleteDoctor', data, config)
}