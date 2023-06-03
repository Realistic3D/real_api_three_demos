import * as REAL from "real_api"

export async function TestAny(scene) {
    const camera = scene.camera;
    const threeScene = scene.scene;
    const light = new REAL.AreaLight(10, 10);
    light.rotation.y = Math.PI;
    light.position.z += 2.5;
    threeScene.add(light);
    light.color = 0xFFDA7A;
    light.intensity = 0.5;
    // console.log(light);
    // console.log(light.parse());
    // console.log(light.stringify());
    const realScene = await REAL.Scene(threeScene, camera);
    console.log(realScene);
}
