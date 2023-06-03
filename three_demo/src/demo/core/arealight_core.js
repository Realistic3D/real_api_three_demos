import * as THREE from "three";
import {AreaLight} from "../real_api/real.three.min";
import {AddAxes} from "./axes_core";

export async function AddAreaLight(app) {
    const scene = app.scene;
    const config = {
        intensity: 20,
        color: "FFDA7A"
    }
    const width = 1;
    const height = 1;
    const light = new AreaLight(scene, width, height, config);
    light.position.set(0, 15, 35);
    light.rotation.set(Math.PI/2, 0, 0);
    light.scale.set(30, 1, 20);
    app.ray.hitObjects.push(light.mesh);
    // light.mesh.userData.size = new THREE.Vector3(width, 0, height);
    // AddAxes(scene, light.mesh)
}
