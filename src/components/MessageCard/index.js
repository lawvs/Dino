import React from 'react'
import { I18n } from 'react-i18next'

import i18n from '../utils/i18next' // eslint-disable-line
import './styles.css'

const MessageCard = () => {
    const errorCode = 'ERR_INTERNET_DISCONNECTED'
    const suggests = [
        'Checking the network cables, modem and router',
        'Reconnecting to Wi-Fi',
    ]

    return (
        <I18n>
            {t => (
                <div className="messagecard">
                    <h1 className="title">{t('No internet connection')}</h1>
                    <p>{t('Try')}</p>
                    <ul>
                        {suggests.map(s => (
                            <li key={s}>{t(s)}</li>
                        ))}
                    </ul>
                    <div className="error-code">{errorCode}</div>
                </div>
            )}
        </I18n>
    )
}

export default MessageCard
