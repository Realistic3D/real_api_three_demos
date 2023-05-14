import {ShiftPivot} from "../core/model_core";
import {DebugInfo, DebugSpecial} from "../core/debug_core";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export async function GLTFLocalLoader(app, text) {
    const loader = new GLTFLoader();
    loader.parse(
        text, '',
        // called when the resource is loaded
        async ( gltf ) => { await LoadScene(app, gltf); },
        function ( error ) {console.log( 'An error happened' );},
        function ( xhr ) {
            DebugSpecial( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
    );
}
async function LoadScene(app, mesh) {
    const scene = app.scene;
    DebugInfo("LOADED");
    const model = GLTFParser(mesh);
    model.position.x -= 10;
    model.position.y += 10;
    model.position.z += 15;
    // scene.dragObjects.push(model);
    app.ray.hitObjects.push(model);
    // AddAxes(scene, model);
    scene.add(model);
}
export function GLTFParser(mesh, ignorePivot = false) {
    const model = mesh.scene;
    model.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 16;
            if(o.material.opacity < 1) o.material.transparent = true;
        }
    });
    if(ignorePivot) return model;
    return ShiftPivot(model);
}
