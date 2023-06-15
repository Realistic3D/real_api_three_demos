import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export async function House(app) {
    // const model = "./models/gltf/rooms/interior_living_room.glb";
    const model = "./models/gltf/rooms/bathroom.glb";
    // const model = "./models/gltf/rooms/White living room.glb";
    // const model = "./models/gltf/rooms/ARQ BLENDER.glb";
    const loader = new GLTFLoader();
    loader.load(model,
        async (mesh)=> {await LoadRoom(app, mesh)},
        async (data) => {await Progress(app, data)},
        (e) => {Error(e)
    })
}
async function LoadRoom(app, mesh) {
    const room = mesh.scene;
    app.toggles.loadingBar = false;
    const scene = app.scene;
    room.name = "REAL_ROOM";
    const camera = scene.camera;
    room.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 16;
            if(o.material.opacity < 1) o.material.transparent = true;
        }
    });

    scene.add(room);

    const target = new THREE.Vector3(0.572, 0.887,0.826);
    camera.position.copy(target);
    scene.controls.target.set(target.x, target.y, target.z + 1);
}
async function Progress(app, data) {
    const fact = 100;
    const loaded = data.loaded / data.total * fact;
    app.loadingBar(loaded);
}
function Error(error) {
    console.error(error);
}
