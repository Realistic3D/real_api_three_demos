import {AreaLight} from "../real_api/real.three.min";

export async function AddAreaLight(scene) {
    const config = {
        intensity: 20,
        color: {
            h: 52,
            s: 100,
            v: 99
        }
    }
    const width = 20;
    const height = 20;
    const light = new AreaLight(scene, width, height, config);
    // light.scale.set(1, 1, 1);
    light.position.set(0, 20, 0);
}
