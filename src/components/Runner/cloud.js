// @ts-check
/// <reference path='./index.d.ts'/>
import { isNumber, random } from 'lodash'

import Sprite from './sprite'
import defaultCloudImg from './images/cloud.png'

class Cloud extends Sprite {
    /** @type {boolean} */
    remove = false

    /**
     * cloud object config
     * @type {{IMG_SRC: Array | string, X_POS: number, Y_POS: number, MAX_SKY_LEVEL: number, MIN_SKY_LEVEL: number, RATIO: number, SPEED: number}}
     */
    config = {
        IMG_SRC: defaultCloudImg,
        X_POS: null,
        Y_POS: null,
        MAX_SKY_LEVEL: null,
        MIN_SKY_LEVEL: null,
        SPEED: 0, // cloud speed
        // outside world speed ratio. When RATIO is zero, the external speed will not affect the speed of the cloud itself
        RATIO: 0.3,
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Cloud
     */
    constructor(canvas, options = {}) {
        super(canvas)
        this.config = {
            ...this.config,
            ...options,
        }
        isNumber(this.config.MAX_SKY_LEVEL) ||
            (this.config.MAX_SKY_LEVEL = this.img.height)
        isNumber(this.config.MIN_SKY_LEVEL) ||
            (this.config.MIN_SKY_LEVEL =
                this.canvas.height / 2 - this.img.height)

        this.xPos = this.config.X_POS || this.canvas.width
        this.yPos =
            this.config.Y_POS ||
            random(this.config.MAX_SKY_LEVEL, this.config.MIN_SKY_LEVEL)
    }

    /**
     * draw the cloud
     */
    draw() {
        this.canvasCtx.save()
        this.canvasCtx.drawImage(this.img, this.xPos, this.yPos)
        this.canvasCtx.restore()
    }

    /**
     * update the cloud position
     * @param {number} [deltaTime=1/16]
     * @param {number} [speed=0]
     */
    update(deltaTime = 1 / 16, speed = 0) {
        if (this.remove) {
            return
        }
        // calc cloud movement distance
        const distance =
            deltaTime * speed * this.config.RATIO +
            deltaTime * this.config.SPEED

        this.xPos -= distance
        if (!this.isVisible()) {
            this.remove = true
            return
        }
        this.draw()
    }
}

export default Cloud
