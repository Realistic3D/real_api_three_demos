import JSZip from "jszip";
import {USDZExporter} from "three/examples/jsm/exporters/USDZExporter";
import {ColladaExporter} from "three/examples/jsm/exporters/ColladaExporter";


export async function TestExport(scene, camera) {
    const realName = camera.name;
    const oldParent = camera.parent;
    const isChild = oldParent === scene;

    if(!isChild) {
        scene.add(camera);
        camera.name = "RealEYE";
    }

    const exporter = new ColladaExporter();
    const options = {exportTextures: true};

    const collada = exporter.parse(scene,
        async (dae) => {
            const data = dae.data;
            const textures = dae.textures;
            // console.log(data);
            // console.log(textures);

            // save the files!
            const zip = new JSZip();
            zip.file( 'Scene.dae', data);
            textures.forEach( tex => zip.file( `${ tex.directory }${ tex.name }.${ tex.ext }`, tex.data ) );
            const blob = await zip.generateAsync({type: 'blob'})
            console.log(blob);

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'scene.zip';
            document.body.appendChild(link);
            link.click();
        },
        options);
}

export async function TestExportGLB(scene, camera) {
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
        async (model) => {
            console.log(model);

            const zip = new JSZip();
            zip.file( 'Scene.glb', model);
            const blob = await zip.generateAsync({type: 'blob'})

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'scene2.zip';
            document.body.appendChild(link);
            link.click();
        },
        (e) => {
            console.log(e)
        },
        options
    )
}


export async function TestExportOBJ(scene, camera) {
    const realName = camera.name;
    const oldParent = camera.parent;
    const isChild = oldParent === scene;

    if(!isChild) {
        scene.add(camera);
        camera.name = "RealEYE";
    }

    // create a USD exporter object
    const exporter = new USDZExporter();
    const usd = await exporter.parse(scene, {binary: true});
    console.log(usd)

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([usd], {type: 'application/octet-stream'}));
    link.download = 'scene.usdz';
    document.body.appendChild(link);
    link.click();
}
