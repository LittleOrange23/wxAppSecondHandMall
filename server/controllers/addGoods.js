
const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  const { goodsid, oppenid, title, describe, picture, price, oldprice, kind, name, phone, remark } = ctx.request.body
  console.log(goodsid, oppenid, title, describe, picture, price, oldprice, kind, name, phone, remark)
  try {
    const info = await mysql('goods').insert({goodsid, oppenid, title, describe, picture, price, oldprice, kind, name, phone, remark})
    ctx.state.data = {
      message: 'success',
      list: info
    }
  }
  catch(error) {
    ctx.state= {
      code: -1,
      data: {
        msg: '添加失败' + error.sqlMessage
      }
    }
  }
}