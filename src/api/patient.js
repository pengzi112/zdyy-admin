import request from '@/utils/request'

export function getPatient() {
  return request({
    url: '/Patient/getList',
    method: 'get'
  })
}

export function updateStatus(id) {
  return request({
    url: '/Patient/updateStatus',
    method: 'post',
    data: { 'user_id': id }
  })
}