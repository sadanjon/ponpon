import THREE from "three";

export default class SpriteMaterial extends THREE.ShaderMaterial {
	constructor(options) {
		super({
			uniforms: {
				diffuseTexture: { 
					type: "t", 
					value: options.diffuseTexture
				},
				diffuseTextureScale: { 
					type: "v2",
					value: options.diffuseTextureScale || new THREE.Vector2(1, 1)
				},
				diffuseTextureOffset: { 
					type: "v2",
					value: options.diffuseTextureOffset || new THREE.Vector2(0, 0)
				}
			},
			vertexShader: `
				uniform vec2 diffuseTextureScale;
				uniform vec2 diffuseTextureOffset;

				varying vec2 v_uv;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					v_uv = diffuseTextureOffset + diffuseTextureScale * uv;
				}
			`,
			fragmentShader: `
				uniform sampler2D diffuseTexture;

				varying vec2 v_uv;

				void main() {
					gl_FragColor = texture2D(diffuseTexture, v_uv);
				}
			`
		});
		this.transparent = true;
	}
	
	setDiffuseTextureOffset(x, y) {
		this.uniforms.diffuseTextureOffset.value.set(x, y);
	}

	setDiffuseTextureScale(x, y) {
		this.uniforms.diffuseTextureScale.value.set(x, y);
	}
}