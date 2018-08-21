import React, { Component } from 'react'
import i18n from '../utils/i18next' // eslint-disable-line
import { I18n } from 'react-i18next'
import './styles.css'

class MessageCard extends Component {
    render() {
        return (
            <I18n>
                {(t, { i18n }) => (
                    <div className="messagecard">
                        <h1 className="title">{t('No internet connection')}</h1>
                    </div>
                )}
            </I18n>
        )
    }
}

export default MessageCard
