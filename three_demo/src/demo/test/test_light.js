import * as THREE from "three";
import * as REAL from "../real_api/real.three.min";

export function TestLight (scene) {
    const config = {
        intensity: 20,
        color: "FFC733"
    }
    const width = 2;
    const height = 2;
    console.log(config)
    const areaLight = new REAL.AreaLight(scene, width, height, config);
    console.log(areaLight)
    areaLight.position.set(0, 1, 0);
    // areaLight.rotation.set(0, Math.PI/2, 0);
    console.log(areaLight);
    console.log(areaLight.properties);
    // console.log(areaLight.realInfo());
}
