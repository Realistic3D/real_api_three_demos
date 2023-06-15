import * as REAL from "real_api";

export async function AreaLight(scene, camera) {
    const w = 2.5;
    const h = 2.5;
    const al1 = new REAL.AreaLight(w, h);
    al1.rotation.y = Math.PI;
    al1.position.set(-1.25, h/2, -1);

    const al2 = new REAL.AreaLight(w*2, h*2, 0xDBC200, 3);
    al2.rotation.x = -Math.PI/2;
    al2.rotation.y = Math.PI;
    al2.position.set(-1.25, h/2+1, -2);

    scene.add(al1);
    scene.add(al2);

    const realScene = await REAL.Scene(scene, camera);
    addEventListener("keydown", (e) => {
        const key = e.key;
        switch (key) {
            case "Enter":
                camera.position.set(-2.014905319458354, 1.1248532104650968, -1.7298936599365602);
                camera.rotation.x = -0.12237144143761476;
                camera.rotation.y = -0.4987288008491354;
                camera.rotation.z = -0.058757644068964957;
                console.log(camera.position, camera.rotation)
                console.log(e)
                break;
        }
    })
}
