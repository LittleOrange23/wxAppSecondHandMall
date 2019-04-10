// 工具函数库
import qcloud from 'wafer2-client-sdk'
import config from './config'

export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      data,
      method,
      header: {
        'content-type': 'application/json' // 默认值
      },
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        }
        else
          reject(res.data)
      }
    })
  })
}