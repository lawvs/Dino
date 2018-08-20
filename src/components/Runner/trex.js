// @ts-check
/// <reference path='./index.d.ts'/>
import Sprite from './sprite'
import defaultTrexImg from './images/trex.png'
import tRexFistFrameImg from './images/trex_first_frame.png'
import tRexDuck1Img from './images/trex_duck_1.png'
import tRexDuck2Img from './images/trex_duck_2.png'
import tRexCrashImg from './images/trex_crash.png'

/**
 * trex status enum
 * @readonly
 */
const STATUS = Object.freeze({
    START: 'START',
    JUMP: 'JUMP',
    DUCK_1: 'DUCK_1',
    DUCK_2: 'DUCK_2',
    CRASH: 'CRASH',
})

/**
 * @extends Sprite
 */
class Trex extends Sprite {
    /** @type {number} */
    jumpVelocity = 0
    /** @type {number} */
    groundY
    /** @type {string} */
    status
    /** @type {number} */
    duckTime = 0

    /**
     * object config
     * @type {{IMG_SRC: Array | string, STATUS: object, DUCK_INTERVAL: number, X_POS: number, Y_POS: number, GROUND_HEIGHT: number, GRAVITY: number, JUMP_SPEED: number, SPEED: number}}
     */
    config = {
        IMG_SRC: defaultTrexImg,
        STATUS: {
            START: { img: tRexFistFrameImg },
            JUMP: { img: defaultTrexImg },
            DUCK_1: { img: tRexDuck1Img },
            DUCK_2: { img: tRexDuck2Img },
            CRASH: { img: tRexCrashImg },
        },
        DUCK_INTERVAL: 0.1,
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
        this.status = STATUS.START
    }

    /**
     * update position
     * @param {number} [deltaTime = 1 / 16]
     * @override
     */
    update(deltaTime = 1 / 16) {
        // move at the beginning of the first game
        if (this.status !== STATUS.JUMP && this.xPos < this.config.X_POS) {
            this.xPos += this.config.SPEED * deltaTime
            if (this.xPos > this.config.X_POS) {
                this.xPos = this.config.X_POS
            }
        }
        // jump
        if (this.status === STATUS.JUMP) {
            this.yPos -= this.jumpVelocity * deltaTime
            this.jumpVelocity -= this.config.GRAVITY * deltaTime
        }
        // Landing
        if (this.yPos > this.groundY) {
            this.yPos = this.groundY
            this.jumpVelocity = 0
            this.status = STATUS.DUCK_1
            this.duckTime = 0
        }
        // duck
        this.duckTime += deltaTime
        if (this.duckTime > this.config.DUCK_INTERVAL) {
            this.switchDuck()
            this.duckTime = 0
        }

        this.draw()
    }

    switchDuck() {
        if (this.status === STATUS.DUCK_1) {
            this.status = STATUS.DUCK_2
            return
        }
        if (this.status === STATUS.DUCK_2) {
            this.status = STATUS.DUCK_1
            return
        }
    }

    /**
     * @param {String | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} [img = this.config.STATUS[this.status].img]
     * @override
     */
    draw(img = this.config.STATUS[this.status].img) {
        super.draw(img)
    }

    /**
     * @param {number} [speed=this.config.JUMP_SPEED]
     */
    jump(speed = this.config.JUMP_SPEED) {
        if (this.status === STATUS.JUMP) {
            return
        }
        this.status = STATUS.JUMP
        this.jumpVelocity = speed
    }

    crash() {
        this.status = STATUS.CRASH
    }

    start() {
        this.status = STATUS.JUMP
    }
}

export default Trex
