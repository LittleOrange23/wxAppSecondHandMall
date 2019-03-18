const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async(ctx) => {
  const info = await mysql('goods').select('*')
  console.log(ctx)
  ctx.state.data = {
    list: info
  }
}