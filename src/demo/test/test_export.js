// import {GLTFExporter} from "./GLTFExporter";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";


export async function TestExport(scene, camera) {
    const realName = camera.name;
    const oldParent = camera.parent;
    const isChild = oldParent === scene;

    if(!isChild) {
        scene.add(camera);
        camera.name = "RealEYE";
    }

    const exporter = new GLTFExporter();
    const options = {binary: true};
    console.log("PARSING");
    exporter.parse(
        scene,
        (model) => {
            console.log(model);
        },
        options
    )
}
