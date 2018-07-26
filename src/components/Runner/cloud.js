// @ts-check
/// <reference path='./index.d.ts'/>
import { castArray, random, sample } from 'lodash'

import imageMap from './imageLoader'
import defaultCloudImg from './images/cloud.png'

class Cloud {
    /** @type {!HTMLCanvasElement} */
    canvas
    /** @type {!CanvasRenderingContext2D} */
    canvasCtx
    /** @type {number} */
    xPos
    /** @type {number} */
    yPos
    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} */
    img
    /** @type {boolean} */
    remove = false

    /**
     * cloud object config
     * @type {object}
     */
    config = {
        /** @type {Array | string} */
        IMG_SRC: [defaultCloudImg],
        IMG_WIDTH: null,
        IMG_HEIGHT: null,
        X_POS: null, // initial x position
        Y_POS: null, // initial y position
        SPEED: 0, // cloud speed
        MAX_SKY_LEVEL: null,
        MIN_SKY_LEVEL: null,
    };

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Cloud
     */
    constructor(canvas, options={}) {
        if (!canvas) {
            throw new Error('the parameter canvas is required!')
        }
        this.canvas = canvas
        this.canvasCtx = this.canvas.getContext('2d')
        this.config = {
            ...this.config,
            ...options,
        }
        this.config.IMG_SRC = castArray(this.config.IMG_SRC)
        this.img = imageMap.get(sample(this.config.IMG_SRC))
        if (!this.img) {
            throw new Error(`load cloud image fail! IMG_SRC: ${this.config.IMG_SRC}`)
        }
        this.config.IMG_WIDTH = this.img.width,
        this.config.IMG_HEIGHT = this.img.height,
        this.config.MAX_SKY_LEVEL = this.config.IMG_HEIGHT
        this.config.MIN_SKY_LEVEL = this.canvas.height / 2

        this.xPos = this.config.X_POS || this.canvas.width
        this.yPos = this.config.Y_POS || random(
            this.config.MAX_SKY_LEVEL,
            this.config.MIN_SKY_LEVEL
        )
    }

    /**
     * draw the cloud
     */
    draw() {
        this.canvasCtx.save()
        this.canvasCtx.drawImage(
            this.img,
            this.xPos,
            this.yPos,
        )
        this.canvasCtx.restore()
    }

    /**
     * update the cloud position
     * @param {number} [speed=0]
     */
    update(speed=0) {
        if (this.remove) {
            return
        }

        this.xPos += speed
        if (!this.isVisible()) {
            this.remove = true
            return
        }
        this.draw()
    }

    /**
     * check if the cloud is visible on the stage
     * @return {boolean}
     */
    isVisible() {
        return this.xPos + this.config.IMG_WIDTH >= 0
            && this.xPos <= this.canvas.width
    }
}

export default Cloud
