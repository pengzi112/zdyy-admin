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

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
