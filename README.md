# 开发一个组件库
>本文的目标是带你开发一个组件库，并走通开发、测试、文档、打包还有发布流程。
[参考链接](https://github.com/clock157/blog/issues/1)

##准备环境
> 创建目录
> mkdir umi-library-demo && cd     umi-library-demo
>初始化
> yarn create umi --library
>安装依赖
> yarn
>yarn run dev
>浏览器访问 http://127.0.0.1:8001/  即可看到我们的组件开发环境。

## 组件打包

组件开发测试完成后，需要打包成不同的产物以适应不同的场景。默认使用 `rollup` 打包生成三个格式的包:

- cjs: CommonJs，能被 Node 和 打包工具如 webpack 使用。
- esm: ES Module，支持静态分析可以 tree shaking。
- umd: Universal Module Definition 通用包，既能像 cjs 一样被使用，也可以发布到 cdn，通过 script 的方式被浏览器使用。

使用命令

yarn doc:build 
yarn doc:deploy 发布组件文档



## LICENSE

MIT
