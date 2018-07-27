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
     * @type {object}
     */
    config = {
        /** @type {Array | string} */
        IMG_SRC: defaultCloudImg,
        MAX_SKY_LEVEL: null,
        MIN_SKY_LEVEL: null,
    };

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
        isNumber(this.config.MAX_SKY_LEVEL) || (this.config.MAX_SKY_LEVEL = this.img.height)
        isNumber(this.config.MIN_SKY_LEVEL) || (this.config.MIN_SKY_LEVEL = this.canvas.height / 2 - this.img.height)

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
     * @param {number} [distance=0]
     */
    update(distance=0) {
        if (this.remove) {
            return
        }

        this.xPos += distance
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
        return this.xPos + this.img.width >= 0
            && this.xPos <= this.canvas.width
    }
}

export default Cloud
