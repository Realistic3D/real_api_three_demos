import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {DebugInfo, DebugSpecial} from "../core/debug_core";
import * as THREE from "three";
import {ShiftPivot} from "../core/model_core";

export async function GLTFLocalLoader(scene, text) {
    const loader = new GLTFLoader();
    loader.parse(
        text, '',
        // called when the resource is loaded
        async ( gltf ) => { await LoadScene(scene, gltf); },
        function ( error ) {console.log( 'An error happened' );},
        function ( xhr ) {
            DebugSpecial( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
    );
}
async function LoadScene(scene, mesh) {
    DebugInfo("LOADED");
    const model = GLTFParser(mesh);
    model.position.y += 2;
    scene.add(model);
}
export function GLTFParser(mesh) {
    const model = mesh.scene;
    model.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 16;
            if(o.material.opacity < 1) o.material.transparent = true;
        }
    });
    return ShiftPivot(model);
}
