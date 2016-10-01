/* jshint asi:true */
THREE.VRRenderer = function(renderer) {

	var vrDisplay = null, frameData = new VRFrameData()

	var eyeTranslationL = new THREE.Vector3(), eyeTranslationR = new THREE.Vector3()
	var renderRectL = {}, renderRectR = {}

	var cameraL = new THREE.PerspectiveCamera(), cameraR = new THREE.PerspectiveCamera()

	cameraL.layers.enable(1)
	cameraR.layers.enable(2)

	this.start = function(display) {
		vrDisplay = display

		var eyeParamsL = vrDisplay.getEyeParameters('left'),
				eyeParamsR = vrDisplay.getEyeParameters('right')

		eyeTranslationL.fromArray(eyeParamsL.offset)
		eyeTranslationR.fromArray(eyeParamsR.offset)

		renderRectL.x = 0
		renderRectL.y = 0
		renderRectL.width = eyeParamsL.renderWidth
		renderRectL.height = eyeParamsL.renderHeight

		renderRectR.x = eyeParamsL.renderWidth
		renderRectR.y = 0
		renderRectR.width = eyeParamsR.renderWidth
		renderRectR.height = eyeParamsR.renderHeight

		window.addEventListener('vrdisplaypresentchange', function() {
			var eyeWidth = eyeParamsL.renderWidth, eyeHeight = eyeParamsL.renderHeight

			var rendererPixelRatio = renderer.getPixelRatio()
			var rendererSize = renderer.getSize()

			renderer.setPixelRatio(1)
			renderer.setSize(eyeWidth * 2, eyeHeight, false)
		})
	}

	this.render = function(scene, camera) {

		renderer.clear()
		renderer.setScissorTest(true)

		if(camera.parent === null) camera.updateMatrixWorld()

		camera.matrixWorld.decompose(cameraL.position, cameraL.quaternion, cameraL.scale)
		camera.matrixWorld.decompose(cameraR.position, cameraR.quaternion, cameraR.scale)

		cameraL.translateOnAxis(eyeTranslationL, 1)
		cameraR.translateOnAxis(eyeTranslationR, 1)

		vrDisplay.depthNear = camera.near
		vrDisplay.depthFar = camera.far

		vrDisplay.getFrameData(frameData)

		cameraL.projectionMatrix.elements = frameData.leftProjectionMatrix
		cameraR.projectionMatrix.elements = frameData.rightProjectionMatrix

		renderer.setViewport(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)
		renderer.setScissor(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height)
		renderer.render(scene, cameraL)

		renderer.setViewport(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)
		renderer.setScissor(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height)
		renderer.render(scene, cameraR)

		renderer.setScissorTest(false)
	}
}
