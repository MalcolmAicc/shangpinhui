module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', 
    ["@babel/preset-env", { "modules": false }]
  ],
  // elementui配置按需引入
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk",
      },
    ],
    // [
    //   "transform-runtime",
    //   {
    //     "helpers": false,
    //     "polyfill": false,
    //     "regenerator": true,
    //     "moduleName": "babel-runtime"
    //   }
    // ]
  ]
}
