import request from '@/utils/request'

export function login(phone, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      phone: phone,
      password: password
    }
  })
}

export function getInfo() {
  return request({
    url: '/index/getClinic',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
