if (process.env.NODE_ENV !== 'production') {
  const React = require('react')
  const ReactDOM = require('react-dom')
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}
