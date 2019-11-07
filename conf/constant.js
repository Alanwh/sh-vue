// 是否启用 mock 数据
const USE_MOCK = false

// 配置 title
const PAGE_TITLE = {
  'aps': 'ASP后台管理系统',
  'tbs': '记账后台管理系统',
  'lego': '乐高后台管理系统'
}
// 测试服务器 ip 地址
const PROXY_URL = {
  'aps': 'http://10.93.161.17:8080',
  'tbs': 'http://10.209.33.41',
  'lego': 'http://10.209.33.41'
}

module.exports = {
  PAGE_TITLE,
  PROXY_URL,
  USE_MOCK
}
