import {DebugError, DebugSpecial, DebugInfo, SizeMBs} from "./debug_core";
import {GLTFLocalLoader} from "../loaders/gltf_buffer_loader";
import {BlenderLocalLoader} from "../loaders/blender_loader";

export async function UploadModel(app, event) {
    const files = event.target.files;
    if(!files.length) return;
    const file = files[0];
    await LoadLocal(app, file);
}
export async function LoadLocal(app, file) {
    const reader = new FileReader();
    reader.addEventListener(
        'load',
        async (event) => {
            const size = SizeMBs(file.size);
            const nameExt = extractName(file.name);
            if(nameExt.length !== 2) {
                DebugError("Error! File type not supported.");
                return;
            }
            const name = nameExt[0];
            const ext = nameExt[1];
            if (!isValidExt(ext)) {
                DebugError("Error! File type not supported.");
                return;
            }
            const text = event.target.result;
            const info = `Name = ${name}, EXT = ${ext}, SIZE = ${size} MBs`;
            DebugSpecial(info);
            switch (ext) {
                case "glb":
                case "gltf":
                    await GLTFLocalLoader(app, text);
                    break;
                case "blend":
                    await BlenderLocalLoader(app, text);
                    break;
            }
        }
    );
    // reader.readAsText(file);
    reader.readAsArrayBuffer(file);
}
function isValidExt(ext) {
    const extension = ext.toString().toLowerCase();
    return ["stl", "obj", "fbx", "glb", "gltf", "blend"].includes(extension);
}
function extractName(fileName) {
    const spl = fileName.toString().split(".");
    const length = spl.length;
    switch (length) {
        case 0: return [];
        case 1: return [spl[0]];
        default: return [spl[0], spl[1]];
    }
}
