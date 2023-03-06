export function DebugSpecial(msg) {
    DebugInfo(msg, "green")
}
export function DebugInfo(msg, color="black") {
    // const css = "text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 13px;";
    // color: green, font-weight: bold
    const css = `text-shadow: 0.3px 0.3px 0.3px ${color}`;
    console.log(`%c${msg}`, css);
}
export function DebugError(msg) {
    const css = "text-shadow: 0.0px 0.0px 0.0px red";
    console.log(`%c${msg}`, css);
}
export function SizeMBs(byteSize) {
    const size = byteSize / (1024 * 1024);
    return size.toFixed(3);
}
