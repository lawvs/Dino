// @ts-check
/// <reference path='./index.d.ts'/>
import Sprite from './sprite'
import defaultTrexImg from './images/trex.png'
import tRexFistFrameImg from './images/trex_first_frame.png'

class Trex extends Sprite {
    /** @type {number} */
    jumpVelocity = 0
    /** @type {number} */
    groundY
    /** @type {boolean} */
    isJump = false

    /**
     * object config
     * @type {{FIRST_FRAME_IMG: string, IMG_SRC: Array | string, X_POS: number, Y_POS: number, GROUND_HEIGHT: number, GRAVITY: number, JUMP_SPEED: number, SPEED: number}}
     */
    config = {
        FIRST_FRAME_IMG: tRexFistFrameImg,
        IMG_SRC: defaultTrexImg,
        X_POS: 20,
        Y_POS: null,
        GROUND_HEIGHT: 20,
        GRAVITY: 2000,
        JUMP_SPEED: 550,
        SPEED: 70, // move when you start the game for the first time
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
        this.xPos = 0
        this.groundY =
            this.canvas.height - this.img.height - this.config.GROUND_HEIGHT
        this.yPos = this.config.Y_POS || this.groundY
    }

    /**
     * update position
     * @param {number} [deltaTime = 1 / 16]
     */
    update(deltaTime = 1 / 16) {
        if (!this.isJump && this.xPos < this.config.X_POS) {
            this.xPos += this.config.SPEED * deltaTime
            if (this.xPos > this.config.X_POS) {
                this.xPos = this.config.X_POS
            }
        }
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

    drawFirstFrame() {
        super.draw(this.loadImg(this.config.FIRST_FRAME_IMG))
        super.draw(this.loadImg(this.config.IMG_SRC[0]))
    }
}

export default Trex
