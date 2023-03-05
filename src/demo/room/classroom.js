import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export async function ClassRoom(scene) {
    const model = "./models/gltf/rooms/LivingRoom.glb";
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model,
        async (mesh)=> {await LoadRoom(scene, mesh)},
        async (data) => {await Progress(scene, data)},
        (e) => {Error(e)
    });
}
async function LoadRoom(scene, mesh) {
    const renderer = scene.renderer;
    const room = mesh.scene;
    room.name = "REAL_ROOM";
    const camera = scene.camera;

    renderer.toneMappingExposure = 2.3
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

    room.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 16;
            if(o.material.opacity < 1) o.material.transparent = true;
        }
    });

    scene.add(room);

    const target = new THREE.Vector3(-0.64, 1.5, -2.67);
    camera.position.copy(target);
    scene.controls.target.set(target.x, target.y, target.z + 1);
    AddLights(scene);
}
function AddLights(scene) {
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);
    const light = new THREE.SpotLight(0xffa95c,1);
    light.position.set(-50,50,50);
    light.castShadow = true;
    scene.add( light );
}
async function Progress(scene, data) {
    const fact = 100;
    const loaded = data.loaded / data.total * fact;
    console.log(loaded);
}
function Error(error) {
    console.error(error);
}
