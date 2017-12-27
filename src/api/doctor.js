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