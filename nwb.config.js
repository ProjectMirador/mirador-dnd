module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorDnd',
      externals: {
        react: 'React'
      }
    }
  }
}
