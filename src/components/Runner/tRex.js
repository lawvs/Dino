// @ts-check
/// <reference path='./index.d.ts'/>
import Sprite from './sprite'
import defaultTrexImg from './images/trex.png'

class Trex extends Sprite {
    /** @type {number} */
    jumpVelocity = 0
    /** @type {number} */
    groundY
    /** @type {boolean} */
    isJump = false

    /**
     * object config
     * @type {{IMG_SRC: Array | string, X_POS: number, Y_POS: number, GROUND_HEIGHT: number, GRAVITY: number, JUMP_SPEED: number}}
     */
    config = {
        IMG_SRC: defaultTrexImg,
        X_POS: null,
        Y_POS: null,
        GROUND_HEIGHT: 20,
        GRAVITY: 1500,
        JUMP_SPEED: 450,
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Trex
     */
    constructor(canvas, options = {}) {
        super(canvas, options)
        this.config = {
            ...this.config,
            ...options,
        }
        this.xPos = this.config.X_POS || 0
        this.groundY =
            this.canvas.height - this.img.height - this.config.GROUND_HEIGHT
        this.yPos = this.groundY
    }

    /**
     * update the cloud position
     * @param {number} [deltaTime = 1 / 16]
     */
    update(deltaTime = 1 / 16) {
        // jump
        if (this.isJump) {
            this.yPos -= this.jumpVelocity * deltaTime
            this.jumpVelocity -= this.config.GRAVITY * deltaTime
        }
        if (this.yPos >= this.groundY) {
            this.yPos = this.groundY
            this.jumpVelocity = 0
            this.isJump = false
        }
        this.draw()
    }

    /**
     * @param {number} [speed=this.config.JUMP_SPEED]
     */
    jump(speed = this.config.JUMP_SPEED) {
        if (this.isJump) {
            return
        }
        this.isJump = true
        this.jumpVelocity = speed
    }
}

export default Trex
