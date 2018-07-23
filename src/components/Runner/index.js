// @ts-check
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

    /** @type {Object} */
    config = {
        id: '', // canvs id
        width: 600,
        height: 150,
        bgcolor: '#f7f7f7', // canvs background
    }


    /**
     * @param {Object} container outer containing Element
     * @param {Object} options
     */
    constructor(container, options) {
        this.outerContainerEl = container
        this.config = {
            ...this.config,
            ...options,
        }
        this.init()
    }

    init() {
        const { id, width, height, bgcolor } = this.config
        this.canvas = document.createElement('canvas')
        if (id) {
            this.canvas.id = id
        }
        this.canvas.width = width
        this.canvas.height = height

        this.canvasCtx = this.canvas.getContext('2d')
        this.canvasCtx.fillStyle = bgcolor
        this.canvasCtx.rect(0, 0, width, height)
        this.canvasCtx.fill()

        this.outerContainerEl.appendChild(this.canvas)
    }
}

export default Runner
