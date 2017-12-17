import request from '@/utils/request'

export function clinicUpload(params) {
  return request({
    url: '/index/index',
    method: 'post',
    data: {
      name: params.name,
      provice_id: params.provice_id,
      city_id: params.city_id,
      area_id: params.area_id,
      detail: params.detail,
      jingwei: params.jingwei,
      phone: params.phone,
      business_time: params.business_time,
      clinic_img: params.clinic_img,
      clinic_logo: params.clinic_logo
    }
  })
}
export function getArea(id) {
  return request({
    url: '/index/getArea',
    method: 'get',
    params: { 'id': id }
  })
}
