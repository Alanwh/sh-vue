# sh-vue
多项目应用基于同一套脚手架(vue-cli 3.0)开发,方便项目管理维护和公共部分复用

### 依赖安装
```
npm install
```

### 开发编译
```
npm run dev:aps
npm run dev:tbs
npm run dev:lego
```

### 生产编译
```
npm run build:aps
npm run build:tbs
npm run build:lego
```

### 代码规范
* 基于 eslint standard 标准
* 所以的vue组件名首字母必须大写
* 严禁使用 jquery

### 文件结构
<table>
  <thead>
    <tr>
      <td>文件夹</td>
      <td>作用</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>aps-vue</td>
      <td>aps 项目前端代码库</td>
    </tr>
    <tr>
      <td>tbs-vue</td>
      <td>tbs 项目前端代码库</td>
    </tr>
    <tr>
      <td>lego-vue</td>
      <td>lego 项目前端代码库</td>
    </tr>
    <tr>
      <td>common</td>
      <td>前端通用组件/工具函数</td>
    </tr>
    <tr>
      <td>conf</td>
      <td>webpack 配置抽离</td>
    </tr>
    <tr>
      <td>mock</td>
      <td>mock 数据模块</td>
    </tr>
    <tr>
      <td>dist</td>
      <td>最终编译文件， 按项目目录区分</td>
    </tr>
  </tbody>
</table>