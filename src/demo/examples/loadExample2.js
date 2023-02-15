import * as THREE from "three"
import GLTFLoader from 'three-gltf-loader';


export async function LoadExample2(scene) {
    // const model = "./models/gltf/PrimaryIonDrive.glb";
    const model = "./models/gltf/Dusine/dusine.glb";
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model, (mesh)=> {
        const renderer = scene.renderer;

        const base = mesh.scene;
        const camera = scene.camera;
        console.log(base)
        // const scale = 1000;
        // base.scale.set(scale, scale, scale);

        renderer.toneMappingExposure = 2.3
        renderer.shadowMap.enabled = true;
        renderer.outputEncoding = THREE.sRGBEncoding;

        base.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                if(o.material.map) o.material.map.anisotropy = 16;
            }
        });

        scene.add(base);
        const target = new THREE.Vector3(30.5, 43.5, -32.5);
        camera.position.copy(target);
        scene.controls.target.set(target.x, target.y, target.z + 1);
        // scene.camera.position.z = 5;
        AddLights(scene);


    }, null, (e) => {
        console.log(e);
    });
}

function AddLights(scene) {
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);

    // const light = new THREE.SpotLight(0xffa95c,1);
    // light.position.set(-50,50,50);
    // light.castShadow = true;
    // scene.add( light );
}
