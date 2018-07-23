import React, { Component } from 'react'
import './styles.css'

import Runner from '../Runner'

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
        new Runner(this.outerContainerEl, config)
    }

    render() {
        return (
            <div ref={node => this.outerContainerEl = node} className='runnerwrapper'>
            </div>
        )
    }
}

export default App
