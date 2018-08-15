// @ts-check
import CloudManager from './cloudManager'
import { loadImages } from './imageLoader'
import Trex from './trex'
import GroundManager from './groundManager'

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
    /** @type {GroundManager} */
    groundManager
    /** @type {Trex} */
    tRex
    /** @type {number} */
    currentSpeed
    /** @type {number} requestAnimationFrame */
    reqId
    /** @type {number?} calc frame rate /second */
    time
    /** @type {number} for speed update /second */
    accelerationTime = 0
    /** @type {boolean} */
    isPlay = false
    /** @type {number} */
    distanceRan = 0
    /** @type {Map} */
    keyMap = new Map()

    /** @type {{ID: string, WIDTH: number, HEIGHT: number, BG_COLOR: string, INIT_SPEED: number, ACCELERATION: number, ACCELERATION_INTERVAL: number, MAX_SPEED: number, KEYCODE_JUMP: string}} */
    config = {
        ID: '', // canvas id
        WIDTH: 600,
        HEIGHT: 150,
        BG_COLOR: '', // canvas background
        INIT_SPEED: 300, // pixel/s
        ACCELERATION: 5,
        ACCELERATION_INTERVAL: 1, // s
        MAX_SPEED: 800,
        // event.code
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
        this.groundManager = new GroundManager(this.canvas)
        // distance meter
        // draw t-rex
        this.tRex = new Trex(this.canvas)
        this.tRex.drawFirstFrame() // first frame

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

        this.handleKey()
        if (this.isPlay) {
            this.canvasCtx.clearRect(
                0,
                0,
                this.config.WIDTH,
                this.config.HEIGHT
            )
            // draw
            this.drawBackGround()
            this.cloudManager.update(deltaTime, this.currentSpeed)
            this.groundManager.update(deltaTime, this.currentSpeed)
            this.tRex.update(deltaTime)
            // check collision
            this.checkCollision() && (this.isPlay = false)
            // distance update
            this.distanceRan += this.currentSpeed * deltaTime
            // speed update
            this.accelerationTime += deltaTime
            if (
                this.currentSpeed < this.config.MAX_SPEED &&
                this.accelerationTime >= this.config.ACCELERATION_INTERVAL
            ) {
                this.currentSpeed +=
                    this.config.ACCELERATION *
                    (this.accelerationTime / this.config.ACCELERATION_INTERVAL)
                this.accelerationTime = 0
            }
        }

        if (!this.isPlay) {
            // TODO draw restart icon
        }

        if (!this.updatePending) {
            this.updatePending = true
            this.reqId = requestAnimationFrame(this.update.bind(this))
        }
    }

    checkCollision() {
        return this.groundManager.obstacleList.some(obstacle =>
            obstacle.isOverlap(this.tRex)
        )
    }

    restart() {
        this.isPlay = true
        this.distanceRan = 0
        this.time = performance.now() / 1000
        this.accelerationTime = 0
        this.keyMap.clear()

        // reset
        this.cloudManager.reset()
        this.groundManager.reset()
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
