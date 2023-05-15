import * as REAL from "real_api"

export async function TestAny(scene) {
    const camera = scene.camera;
    const threeScene = scene.scene;
    const realScene = await REAL.Scene(threeScene, camera);
}
