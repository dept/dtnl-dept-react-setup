const { setAliasConfig } = require('../config/alias')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          propFilter: props => {
            if (props.parent) {
              if (props.parent.fileName.includes('styled-system')) {
                return false
              }

              if (props.parent.name === 'DOMAttributes') return false
              if (props.parent.name === 'AriaAttributes') return false
              if (props.parent.name === 'HTMLAttributes') return false
            }

            return true
          },
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  setAliasConfig(config)

  return config
}
