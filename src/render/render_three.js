import * as REAL from "../real_api/real.three-min.js"
import {AddListeners} from "./utils/event_utils.js";

export async function RenderThree(scene) {
    const realAPI = getRealAPP();
    AddListeners(scene, realAPI);
}

function getRealAPP() {
    const product = new REAL.RealProduct(
        "Real3D",
        "HF0mRDz6R60EIwEMxZit",
        0
    );
    return new REAL.RealAPI(
        "Real3D",
        "HDQ8ygWidtm9yosQ270m",
        "0HYZ77ntJpnHxInjtBh3",
        product
    );
}
