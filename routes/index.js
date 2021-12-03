const router  = require('koa-router')()
const routeList = require('./routes');
const paramValidator = require('../middlewares/paramValidator');

routeList.forEach(item => {
  const { method, path, controller, valid } = item;
  //  router 第一个参数是 path， 后面跟上路由级中间件 controller（上面编写的路由处理函数），valid被校验的参数
  router[method](path, paramValidator(valid), controller);
});

module.exports = router
