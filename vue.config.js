module.exports = {
    css: {
      loaderOptions: {
        sass: {
            prependData: `@import "@/styles/_shared.scss";`
        }
      }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/ToDo-List-Vue/' : '/'
  }
  