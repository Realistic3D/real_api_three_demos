import * as REAL from "../real_api/real.three.min";
import {UpdateServices} from "./render_updates";


export async function RenderThree(scene) {
    const realAPI = getRealAPP();
    AddListeners(scene, realAPI);
}
export async function LoginUser(realAPI) {
    const login = await REAL.LoginRealAPI(realAPI, UpdateServices, ErrorLogin);
    switch(login) {
        case REAL.LoginStatus.SUCCESS:
            // console.log("Login request sent");
            break;
        case REAL.LoginStatus.JOB:
            console.log("Please wait for old result to export");
            break;
        case REAL.LoginStatus.USER:
            console.log("Please wait for connection to be established");
            break;
        case REAL.LoginStatus.ALREADY:
            // console.log("Already logged in, just ignore");
            break;
    }
}
export async function RenderScene(realAPI, scene, camera) {
    if(!realAPI.isLoggedIn) {
        console.log("Please login first")
        return;
    }
    const exp = await REAL.RenderScene(realAPI, scene, camera);
    switch (exp) {
        case REAL.ConvertStatus.SUCCESS:
            console.log("Exporting success");
            break;
        case REAL.ConvertStatus.FAILED:
            console.log("Exporting failed");
            break;
        case REAL.ConvertStatus.NOT_LOGGED:
            console.log("Please login first");
            break;
        case REAL.ConvertStatus.ALREADY:
            console.log("Already exporting");
            break;
    }
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
        product,
        {
            test: true
        }
    );
}

export function AddListeners(scene, realAPI){
    window.addEventListener("keydown", async (e) => {
        await OnKeyEnter(e, scene.scene, scene.camera, realAPI)
    }, false);
}
async function OnKeyEnter(e, scene, camera, realAPI) {
    const key = e.key;
    // if(e.key === "Enter") await ExportClick(realAPI);
    // else if(e.key === "1") await DownloadResult(realAPI);
    switch (key) {
        case "Enter":
            break;
        case "t":
            console.log(camera.position);
            console.log(camera.lookAt);
            console.log(camera);
            break;
        case "l":
            // console.log("Login");
            await LoginUser(realAPI);
            break;
        case "e":
            await RenderScene(realAPI, scene, camera)
            break;
        //     case "n":
        //         console.log("Creating new job");
        //         await realAPI.askService(Status.NewJob)
        //         break;
    }
}
function ErrorLogin() {
    console.error("There is problem with login");
}
