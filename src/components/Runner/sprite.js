// @ts-check
import { castArray, sample } from 'lodash'

import imageMap from './imageLoader'

class Sprite {
    /** @type {!HTMLCanvasElement} */
    canvas
    /** @type {!CanvasRenderingContext2D} */
    canvasCtx
    /** @type {number} */
    xPos = 0
    /** @type {number} */
    yPos = 0
    /** @type {number} */
    speed = 0
    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} */
    _img
    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} */
    get img() {
        if (this._img) { // loaded
            return this._img
        }
        this.config.IMG_SRC = castArray(this.config.IMG_SRC)
        const sampleSrc = sample(this.config.IMG_SRC)
        this._img = imageMap.get(sampleSrc)
        if (!this._img) {
            throw new Error(`load image fail! IMG_SRC: ${sampleSrc}`)
        }
        return this._img
    }

    /**
     * object config
     * @type {{IMG_SRC: Array | string, X_POS: number, Y_POS: number}}
     */
    config = {
        IMG_SRC: null, // todo override
        X_POS: 0, // initial x position
        Y_POS: 0, // initial y position
    };

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Trex
     */
    constructor(canvas, options={}) {
        if (!canvas) {
            throw new Error('the parameter canvas is required!')
        }
        this.canvas = canvas
        this.canvasCtx = this.canvas.getContext('2d')
    }

    draw() {
        this.canvasCtx.save()
        this.canvasCtx.drawImage(
            this.img,
            this.xPos,
            this.yPos,
        )
        this.canvasCtx.restore()
    }

    update() {
        this.draw()
    }

}

export default Sprite
