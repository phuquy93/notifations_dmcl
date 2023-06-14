import request from '@/utils/request'

let domain = "https://apiat.stdmcl.com:11443/api/v1"

export function login(data) {
  return request({
    url: domain + '/loginuser',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: domain + '/identity',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: domain + '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUsers(data) {
  return request({
    url: domain + '/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&soTrang=' + data.page + '&soPhanTuTrenTrang=' + data.numitem,
    method: 'get'
  })
}


export function addUsers(data) {
  return request({
    url: domain + 'api/QuanLyNguoiDung/ThemNguoiDung',
    method: 'post',
    data
  })
}
