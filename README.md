项目介绍: 使用jwt进行注册登录,目前有创建小组,加入小组,个人信息查询等功能,后续会进行补充; 包含 vue js 云函数/云数据库 本项目基于元岛0.5进行用户体验优化后的版本;原项目地址:https://github.com/midorg-com/midorg tags 0.5.0

第一版内容:

目前修改: 前端改动: 1 微信小程序前端页面部分全部改成vue 2 加入jwt登陆注册模块 3 登陆后直接加入,不需要填写表单 4 加入用户信息模块 5 加入时间戳转换的js

后端改动: 1 增加了用户信息查询函数

已知问题: 1 目前前端页面仅在网页1/4屏调试,还不支持多端适配(地区选择仅支持微信你小程序); 2 查询模块where({})查询不到对象内内容,先用全部查询后在函数内筛查;

20230227 第二版
更新
  新增 留言板功能 可以回复 修改 删除 发布留言；
  新增小商城跳转按钮 增加添加分类 商品展示 规格表单提交 其余功能暂时未完成
  暂时废弃mrfz模块，改用网页版实现
优化
  优化了界面内css的写法
  部分页面改用vue3编写
计划
  以后修改会另写文档
  补充剩下功能
  优化重复逻辑
  
