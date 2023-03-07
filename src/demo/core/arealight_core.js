import * as THREE from "three";
import {AreaLight} from "../real_api/real.three.min";
import {AddAxes} from "./axes_core";

export async function AddAreaLight(app) {
    const scene = app.scene;
    const config = {
        intensity: 20,
        color: {
            h: 52,
            s: 100,
            v: 99
        }
    }
    const width = 1;
    const height = 1;
    const light = new AreaLight(scene, width, height, config, false);
    light.position.set(0, 20, 0);
    app.ray.hitObjects.push(light.mesh);
    // light.mesh.userData.size = new THREE.Vector3(width, 0, height);
    // AddAxes(scene, light.mesh)
}
