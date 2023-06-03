// import JSZip from "jszip";
// import {USDZExporter} from "three/examples/jsm/exporters/USDZExporter";
import * as REAL from "../real_api/real.three.min"
import {GetBin} from "../real_api/real.three.min";
import {ShowPivot} from "../tools/Renderer";


export async function TestExport(scene, camera) {
    const pivots = [];
    scene.traverse((child) => {
        if(child.name === "REAL_PIVOT") {
            const parent = child.parent;
            const children = child.children;
            pivots.push({
                pivot: child,
                children: [...children]
            })
            for (const child1 of children) {
                parent.attach(child1);
            }
            parent.remove(child);
        }
    });
    console.log("Exporting")
    REAL.ParseTest(scene, camera, (model, error) => {
        if(error) {
            console.error(error);
            return;
        }
        const bin = REAL.GetBin(model);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(bin);
        link.download = 'scene.glb';
        document.body.appendChild(link);
        link.click();
    })
    for (const curPivot of pivots) {
        const {pivot, children} = curPivot;
        if(!children || !pivot) return;
        scene.attach(pivot);
        for (const child of children) {
            pivot.attach(child);
        }
    }
}

export async function TestExportGLTF(scene, camera) {
    const areaLights = [];
    scene.traverse((child)=> {
        if(child.userData.type === "REAL_AREA_LIGHT") areaLights.push(child);
    });

    for (const child of areaLights) {
        const parent = child.parent;
        parent.remove(child);

        const areaLight = new THREE.Group();
        areaLight.name = "REAL_AREA_LIGHT";
        areaLight.scale.copy(child.scale);
        areaLight.position.copy(child.position);
        areaLight.rotation.copy(child.rotation);

        const myClass = child.userData.myClass;
        const info = JSON.parse(myClass.realInfo());
        for (const key in info) {
            const group = new THREE.Group();
            const value = info[key];
            group.name = `${key}|${JSON.stringify(value)}`;
            areaLight.add(group);
        }

        parent.add(areaLight);
        console.log(areaLight)
    }

    // const exporter = new GLTFExporter();
    // exporter.parse(scene, (mesh) => {
    //     const bin = REAL.GetBin(mesh);
    //     const link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(bin);
    //     link.download = 'scene.glb';
    //     document.body.appendChild(link);
    //     link.click();
    // },  (e) => {
    //     console.error(e)
    // }, {
    //     binary: true
    // });
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
