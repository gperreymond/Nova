/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import { render } from 'react-dom'

import 'normalize.css'
import './css/main.css'
import Application from './Application'

import Debug from 'debug'
const debug = Debug('nova:admin:Application')
if (process.env.DEBUG === true) window.localStorage.debug = 'nova:youtube:*'

debug('render application')
render(<Application />, document.getElementById('root'))
