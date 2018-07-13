import React, { Component } from 'react'
import './styles.css'

import Runner from '../Runner'
import MessageCard from '../MessageCard'

class App extends Component {
    render() {
        return (
            <div className='container'>
                <div className='wrapper'>
                    <Runner />
                    <MessageCard />
                </div>
            </div>
        )
    }
}

export default App
