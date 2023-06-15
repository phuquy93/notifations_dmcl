import request from '@/utils/request'

let domain = "https://apiat.stdmcl.com:11443/api/v1"

export async function login(data) {


  const options = {
    method: "GET",
  };

  let res = await fetch(
    domain + "/loginuser?username=" + data.username + "&password=" + data.password,
    options
  ).then((res) => res.json());


  return res;

  // return request({
  //   url: 'https://apiat.stdmcl.com:12443/api/v1/loginuser?username=EM1000005628&password=123.654',
  //   method: 'get',

  // })
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
