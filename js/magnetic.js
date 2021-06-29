const ui = {
	btn: document.querySelector('.c-magnetic-btn'),
}

const state = {
	bounds: ui.btn.getBoundingClientRect(),
	threshold: parseInt(ui.btn.dataset.threshold),
	ratio: parseInt(ui.btn.dataset.ratio),
	isMagnetic: false,
	mouse: {
		x: 0,
		y: 0
	},
	ease: {
		x: 0,
		y: 0,
		scale: 1,
		value: ui.btn.dataset.ease
	},
	transform: {
		x: 0,
		y: 0,
		scale: 1,
		max: ui.btn.dataset.max
	},
	width: window.innerWidth,
	height: window.innerHeight,
	history: false,
	scale: ui.btn.dataset.scale
}

const mouseMove = ({ pageX, pageY }) => {
	Object.assign(state, {
		mouse: {
			x: pageX,
			y: pageY
		},
		isMagnetic: isMagnetic(pageX, pageY)
	})
}

const resize = () => {
	Object.assign(state, {
		bounds: ui.btn.getBoundingClientRect(),
		width: window.innerWidth,
		height: window.innerHeight
	})
}

const isMagnetic = (x, y) => {
	const { bounds } = state
	const centerX = bounds.left + (bounds.width / 2)
	const centerY = bounds.top + (bounds.height / 2)
	const a = Math.abs(centerX - x)
	const b = Math.abs(centerY - y)
	const c = Math.sqrt(a * a + b * b)
	const isHover = c < (bounds.width / 2) + state.threshold
	if (!state.history && isHover) {
		ui.btn.classList.add('is-hover')
		Object.assign(state, {
			threshold: state.threshold * state.ratio,
			history: true
		})
	} else if (state.history && !isHover) {
		ui.btn.classList.remove('is-hover')
		Object.assign(state, {
			threshold: state.threshold / state.ratio,
			history: false
		})
	}
	return isHover
}

const run = () => {
	requestAnimationFrame(run)
	const { isMagnetic, transform, mouse, width, height, ease, max, scale } = state
	transform.x = isMagnetic ? (mouse.x - width / 2) / width * transform.max : 0
	transform.y = isMagnetic ? (mouse.y - height / 2) / height * transform.max : 0
	transform.scale = isMagnetic ? scale : 1
	ease.x += (transform.x - ease.x) * ease.value
	ease.y += (transform.y - ease.y) * ease.value
	ease.scale += (transform.scale - ease.scale) * ease.value

	Object.assign(ui.btn.style, {
		transform: `
		 translate(
			${ease.x.toFixed(2)}px,
			${ease.y.toFixed(2)}px
		 )
		 translateZ(0)
		 scale(
			${(ease.scale).toFixed(2)}
		 )`
	})
}

const init = () => {
	document.addEventListener('mousemove', mouseMove)
	window.addEventListener('resize', resize)
	run()
}
init()