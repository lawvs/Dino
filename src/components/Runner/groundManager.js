// @ts-check
import Ground from './ground'

class GroundManager {
    /** @type {!HTMLCanvasElement} */
    canvas
    /** @type {!CanvasRenderingContext2D} */
    canvasCtx
    /** @type {Ground[]} */
    groundList = []
    /** @type {?Ground} */
    lastGround
    /** @type {{GROUND_CONFIG: object}} */
    config = {
        GROUND_CONFIG: {},
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs GroundManager
     */
    constructor(canvas, options = {}) {
        if (!canvas) {
            throw new Error('the parameter canvas is required!')
        }
        this.canvas = canvas
        this.canvasCtx = this.canvas.getContext('2d')

        this.config = {
            ...this.config,
            ...options,
        }
    }

    /**
     * @param {number} [deltaTime]
     * @param {number} [speed]
     */
    update(deltaTime, speed) {
        this.groundList = this.groundList.filter(
            ground => ground && !ground.remove
        )
        this.groundList.forEach(ground => ground.update(deltaTime, speed))

        while (
            this.lastGround === undefined ||
            this.lastGround.xPos + this.lastGround.img.width <=
                this.canvas.width
        ) {
            this.addGround(this.config.GROUND_CONFIG)
        }
    }

    addGround(options = {}) {
        const ground = new Ground(this.canvas, options)
        if (this.lastGround) {
            ground.xPos = this.lastGround.xPos + this.lastGround.img.width
        }
        this.groundList.push(ground)
        this.lastGround = ground
    }

    reset() {
        this.groundList = []
        this.lastGround = null
    }
}

export default GroundManager
