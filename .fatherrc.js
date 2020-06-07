export default {
  entry: ['src/Toast','src/Foo'],
  cjs: 'rollup',
  esm: 'rollup',
  umd: {
    name: 'foo'
  },
  doc: {
    base: '/library'
  }
}
