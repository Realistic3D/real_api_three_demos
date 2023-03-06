
export async function LoadLocal(file) {
    const reader = new FileReader();
    reader.addEventListener(
        'load',
        (event) => {
            const size = sizeMBs(file.size);
            const nameExt = extractName(file.name);
            if(nameExt.length !== 2) return;
            const name = nameExt[0];
            const ext = nameExt[1];
            const text = event.target.result;
            const info = `Name = ${name}, EXT = ${ext}, SIZE = ${size} MBs`;
            DebugInfo(info);
        }
    );
    reader.readAsText(file);
}
function DebugInfo(msg) {
    // const css = "text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 13px;";
    // color: green, font-weight: bold
    const css = "text-shadow: 0.3px 0.3px 0.3px black";
    console.log(`%c${msg}`, css);
}
function sizeMBs(byteSize) {
    const size = byteSize / (1024 * 1024);
    return size.toFixed(3);
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
