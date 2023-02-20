import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export async function LoadExample4(scene) {
    const model = "./models/gltf/rooms/room.glb";
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model, (mesh)=> {
        const renderer = scene.renderer;
        const base = mesh.scene;
        const camera = scene.camera;
        renderer.toneMappingExposure = 2.3
        renderer.shadowMap.enabled = true;
        renderer.outputEncoding = THREE.sRGBEncoding;

        base.rotation.y = Math.PI;
        base.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                if(o.material.map) o.material.map.anisotropy = 16;
            }
        });
        scene.add(base);
        const target = new THREE.Vector3(0.78, 1, 0.65);
        camera.position.copy(target);
        scene.controls.target.set(target.x, target.y, target.z + 1);
        // scene.camera.position.z = 5;

        const axes = scene.axes;
        axes.position.set(4.78, 1, 1.65)

        AddLights(scene);

    }, null, (e) => {
        console.log(e);
    });
}

function AddLights(scene) {
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);
}
