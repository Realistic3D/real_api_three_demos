import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DebugError} from "../core/debug_core";

export async function GltfLocalLoader(filePath, callback) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(filePath,
        async (mesh)=> {await callback && callback(mesh)},
        (e) => {DebugError(e)});
}
