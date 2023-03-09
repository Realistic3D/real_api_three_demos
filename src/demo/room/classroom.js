import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export async function ClassRoom(app) {
    const model = "./models/gltf/rooms/LivingRoom.glb";
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model,
        async (mesh)=> {await LoadRoom(app, mesh)},
        async (data) => {await Progress(app, data)},
        (e) => {Error(e)
    });
}
async function LoadRoom(app, mesh) {
    app.events.loadingBar = false;

    const scene = app.scene;
    const renderer = scene.renderer;
    const room = mesh.scene;
    const scale = 10;
    room.scale.set(scale, scale, scale);
    room.name = "REAL_ROOM";
    const camera = scene.camera;

    renderer.toneMappingExposure = 2.3
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor( 0x000000, 1 );

    room.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 16;
            if(o.material.opacity < 1) o.material.transparent = true;
        }
    });

    scene.add(room);

    // const target = new THREE.Vector3(-0.64, 1.5, -2.67);
    const target = new THREE.Vector3(-0.64, 15, -2.67);
    camera.position.copy(target);
    scene.controls.target.set(target.x, target.y, target.z + 1);
    AddLights(scene);
}
function AddLights(scene) {
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);
    const light = new THREE.SpotLight(0xffa95c,1);
    light.position.set(-50,500,50);
    light.castShadow = true;
    scene.add( light );
}
async function Progress(app, data) {
    const fact = 100;
    const loaded = data.loaded / data.total * fact;
    app.loadingBar(loaded);
    console.log(loaded);
}
function Error(error) {
    console.error(error);
}
