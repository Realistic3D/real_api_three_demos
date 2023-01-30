import * as THREE from "../../node_modules/three/build/three.module.js"

export async function LoadExample1(scene) {
    const camera = scene.camera;
    const renderer = scene.renderer;
    renderer.setClearColor( 0x000000, 1 );

    const geometry = new THREE.BoxGeometry()
    const texUrl = "https://img0.baidu.com/it/u=1378729583,3513119165&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708";
    const texture = new THREE.TextureLoader().load(texUrl);
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube);

    camera.position.z = 5;
}
