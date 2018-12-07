export default {
  plugins: [
    ['umi-plugin-block-dev', {}],
    ['umi-plugin-react', {
      dva: true,
      locale: true,
      antd: true,
    }]
  ],
}
