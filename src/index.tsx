/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import { Application } from './comps/Application'

render(() => <Application />, document.getElementById('root') as HTMLElement)
