import React, { Component } from 'react'

import Game from '../Game'
import MessageCard from '../MessageCard'
import './styles.css'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <Game />
                    <MessageCard />
                </div>
                <div /> {/* placeholder */}
            </div>
        )
    }
}

export default App
