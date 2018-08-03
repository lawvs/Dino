// @ts-check
import CloudManager from './cloudManager'
import { loadImages } from './imageLoader'
import Trex from './trex'

/**
 * T-Rex runner.
 * @export
 */
class Runner {
    /** @type {HTMLElement} canvas container element */
    outerContainerEl
    /** @type {HTMLCanvasElement} */
    canvas
    /** @type {CanvasRenderingContext2D} */
    canvasCtx
    /** @type {CloudManager} */
    cloudManager
    /** @type {Trex} */
    tRex
    /** @type {number} */
    currentSpeed
    /** @type {number} */
    reqId
    /** @type {number} */
    time
    /** @type {boolean} */
    isPlay = false
    /** @type {Map} */
    keyMap = new Map()

    /** @type {object} */
    config = {
        ID: '', // canvas id
        WIDTH: 600,
        HEIGHT: 150,
        BG_COLOR: '', // canvas background
        INIT_SPEED: 6,
        ACCELERATION: 0.001,
        MAX_SPEED: 13,
        GRAVITY: 0.6,
        KEYCODE_JUMP: 'Space',
    }

    /**
     * @param {object} container outer containing Element
     * @param {object} options
     */
    constructor(container, options) {
        this.outerContainerEl = container
        this.config = {
            ...this.config,
            ...options,
        }
    }

    async init() {
        try {
            await loadImages()
        } catch (error) {
            console.error('image material failed to load')
            return
        }
        const { ID, WIDTH, HEIGHT, INIT_SPEED } = this.config
        this.canvas = document.createElement('canvas')
        ID && (this.canvas.id = ID)

        this.canvas.width = WIDTH
        this.canvas.height = HEIGHT
        this.canvasCtx = this.canvas.getContext('2d')

        this.currentSpeed = INIT_SPEED

        // background
        this.drawBackGround()
        // clouds
        this.cloudManager = new CloudManager(this.canvas)
        // ground
        // obstacles
        // distance meter
        // draw t-rex
        this.tRex = new Trex(this.canvas)

        this.outerContainerEl.appendChild(this.canvas)
        this.startListening()
        this.update()
    }

    startListening() {
        document.addEventListener('keydown', e => this.onKeyDown(e))
        // document.addEventListener('keyup', e => this.onKeyUp(e))
    }

    /** @param {KeyboardEvent} e */
    onKeyDown(e) {
        this.keyMap.set(e.code, true)
        event.preventDefault()
    }

    /** @param {KeyboardEvent} e */
    onKeyUp(e) {
        this.keyMap.delete(e.code)
        e.preventDefault()
    }

    handleKey() {
        this.keyMap.forEach((value, key) => {
            switch (key) {
            case this.config.KEYCODE_JUMP:
                if (!this.isPlay) {
                    this.restart()
                }
                this.tRex.jump()
                break
            default:
                break
            }
        })
        this.keyMap.clear()
    }

    update() {
        this.updatePending = false // lock

        const now = performance.now() / 1000 // s
        const deltaTime = now - (this.time || now)
        this.time = now
        const deltadDistance = this.currentSpeed * deltaTime

        this.handleKey()
        if (this.isPlay) {
            this.canvasCtx.clearRect(0, 0, this.config.WIDTH, this.config.HEIGHT)
            // draw
            this.drawBackGround()
            this.cloudManager.update(-1 * deltadDistance)
            this.tRex.update(deltaTime)
        }

        if (!this.updatePending) {
            this.updatePending = true
            this.reqId = requestAnimationFrame(this.update.bind(this))
        }
    }

    restart() {
        this.isPlay = true
        this.keyMap.clear()
    }

    drawBackGround() {
        const { BG_COLOR, WIDTH, HEIGHT } = this.config
        if (BG_COLOR) {
            this.canvasCtx.fillStyle = BG_COLOR
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
        }
    }
}

export default Runner
