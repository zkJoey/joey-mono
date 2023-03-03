// CS: false positive, need to update eslint to allow dev deps in root files
// eslint-disable-next-line import/no-extraneous-dependencies
const { addBabelPlugin, addBabelPreset, override } = require('customize-cra')

module.exports = override(
  addBabelPlugin('@emotion/babel-plugin'),
  addBabelPreset([
    '@babel/preset-react',
    { importSource: '@emotion/react', runtime: 'automatic' },
  ]),
)
