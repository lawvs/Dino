import { zipObject } from 'lodash'
import { createInstance } from 'i18next'
import { reactI18nextModule } from 'react-i18next'

import en_US from '../../i18n/en-US.json'
import ja_JP from '../../i18n/ja-JP.json'
import zh_CN from '../../i18n/zh-CN.json'

const LOCALES = ['zh-CN', 'ja-JP', 'en-US']
const resources = [zh_CN, ja_JP, en_US].map(t => {
    return { translation: t }
})
const mainRes = zipObject(LOCALES, resources)

const standardizeLocale = language => {
    if (LOCALES.includes(language)) return language
    switch (language.substr(0, 2).toLowerCase()) {
    case 'zh':
        return 'zh-CN'
    case 'ja':
        return 'ja-JP'
    default:
        return 'en-US'
    }
}

const language = standardizeLocale(navigator.language)

const i18next = createInstance()
i18next.use(reactI18nextModule).init({
    lng: language,
    resources: mainRes,
})

export const t = i18next.getFixedT()
export default i18next
