// @ts-check
/// <reference path='./index.d.ts'/>
import cloudImg from './images/cloud.png'

/**
 * URL to load
 * @type {string[]} img url array
 */
const imageArray = [
    cloudImg,
]

/**
 * @type {Map<string, HTMLImageElement>}
 */
const imageMap = new Map()

const promiseArray = imageArray.map(imgUrl => {
    const promise = new Promise((resolve, reject) => {
        const img = new Image()
        img.onerror = reject
        img.onload = () => {
            imageMap.set(imgUrl, img)
            resolve()
        }
        img.src = imgUrl
    })
    return promise
})

export function loadImages() {
    return Promise.all(promiseArray)
}

export default imageMap
