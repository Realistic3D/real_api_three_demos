import * as THREE from "../../node_modules/three/build/three.module.js"
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";


export async function LoadExample2(scene) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'jsm/libs/draco/' );
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader( dracoLoader );
    const gltf = await gltfLoader.loadAsync( './models/gltf/kira.glb' );

    gltf.scene.traverse( n => {

        if ( n.name === 'head' ) OOI.head = n;
        if ( n.name === 'lowerarm_l' ) OOI.lowerarm_l = n;
        if ( n.name === 'Upperarm_l' ) OOI.Upperarm_l = n;
        if ( n.name === 'hand_l' ) OOI.hand_l = n;
        if ( n.name === 'target_hand_l' ) OOI.target_hand_l = n;

        if ( n.name === 'boule' ) OOI.sphere = n;
        if ( n.name === 'Kira_Shirt_left' ) OOI.kira = n;

        if ( n.isMesh ) n.frustumCulled = false;

    } );

}
