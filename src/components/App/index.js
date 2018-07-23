import React, { Component } from 'react'
import './styles.css'

import Game from '../Game'
import MessageCard from '../MessageCard'

class App extends Component {
    render() {
        return (
            <div className='container'>
                <div className='wrapper'>
                    <Game />
                    <MessageCard />
                </div>
            </div>
        )
    }
}

export default App
