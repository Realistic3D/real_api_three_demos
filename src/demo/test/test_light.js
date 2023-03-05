import * as THREE from "three";
import * as REAL from "../real_api/real.three.min";

export function TestLight (scene) {
    const config = {
        intensity: 20,
        color: {
            h: 52,
            s: 100,
            v: 99
        }
    }
    const areaLight = new REAL.AreaLight(scene, 2, 1, config);
    areaLight.position.set(0, 1, 0);
    // areaLight.rotation.set(0, Math.PI/2, 0);
    console.log(areaLight);
    console.log(areaLight.properties);
    // console.log(areaLight.realInfo());
}
