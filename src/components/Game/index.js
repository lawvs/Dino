import React, { Component } from 'react'

import { Runner } from '../Runner'
import './styles.css'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            outerContainerEl: null,
        }
    }

    componentDidMount() {
        const config = {
            id: 'runner',
            width: this.outerContainerEl.offsetWidth,
        }
        const runner = new Runner(this.outerContainerEl, config)
        runner.init()
    }

    render() {
        return (
            <div ref={node => this.outerContainerEl = node} className='runnerwrapper'>
            </div>
        )
    }
}

export default App
