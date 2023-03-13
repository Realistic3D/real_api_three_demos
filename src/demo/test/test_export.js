// import JSZip from "jszip";
// import {USDZExporter} from "three/examples/jsm/exporters/USDZExporter";
import * as REAL from "../real_api/real.three.min"
import {GetBin} from "../real_api/real.three.min";
import {ShowPivot} from "../tools/Render";


export async function TestExport(scene, camera) {
    ShowPivot(scene, false);
    await REAL.ToRealScene(scene, camera, (model) => {
        const bin = GetBin(model);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(bin);
        link.download = 'scene.glb';
        document.body.appendChild(link);
        link.click();
    });
    ShowPivot(scene);
}

export async function TestExportGLB(scene, camera) {
    // const realName = camera.name;
    // const oldParent = camera.parent;
    // const isChild = oldParent === scene;
    //
    // if(!isChild) {
    //     scene.add(camera);
    //     camera.name = "RealEYE";
    // }
    //
    // const exporter = new GLTFExporter();
    // const options = {binary: true};
    // console.log("PARSING");
    // exporter.parse(
    //     scene,
    //     async (model) => {
    //         console.log(model);
    //
    //         const zip = new JSZip();
    //         zip.file( 'Scene.glb', model);
    //         const blob = await zip.generateAsync({type: 'blob'})
    //
    //         const link = document.createElement('a');
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = 'scene2.zip';
    //         document.body.appendChild(link);
    //         link.click();
    //     },
    //     (e) => {
    //         console.log(e)
    //     },
    //     options
    // )
}


export async function TestExportOBJ(scene, camera) {
    // const realName = camera.name;
    // const oldParent = camera.parent;
    // const isChild = oldParent === scene;
    //
    // if(!isChild) {
    //     scene.add(camera);
    //     camera.name = "RealEYE";
    // }
    //
    // // create a USD exporter object
    // const exporter = new USDZExporter();
    // const usd = await exporter.parse(scene, {binary: true});
    // console.log(usd)
    //
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(new Blob([usd], {type: 'application/octet-stream'}));
    // link.download = 'scene.usdz';
    // document.body.appendChild(link);
    // link.click();
}
