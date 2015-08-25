import THREE from "three";

export default class SpriteMaterial extends THREE.ShaderMaterial {
	constructor(options) {
		super({
			vertexShader: `
				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				void main() {
					gl_FragColor = vec4(0, 1, 0, 1);
				}
			`
		});
	}
}