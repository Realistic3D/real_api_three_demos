import {LoginUser} from "./export_utils.js";

async function OnKeyEnter(e, scene, camera, realAPI) {
    const key = e.key;
    // if(e.key === "Enter") await ExportClick(realAPI);
    // else if(e.key === "1") await DownloadResult(realAPI);
    switch (key) {
        case "Enter":
            break;
        case "t":
            break;
        case "l":
            console.log("Login");
            await LoginUser(realAPI);
            // const jobs = realAPI.jobInfo.jobs;
            // console.log("Your jobs", jobs);
            break;
    //     case "e":
    //         await ExportScene(realAPI, scene, camera)
    //         // console.log(realAPI.isLoggedIn)
    //         break;
    //     case "n":
    //         console.log("Creating new job");
    //         await realAPI.askService(Status.NewJob)
    //         break;
    }
}

export function AddListeners(scene, realAPI){
    window.addEventListener("keydown", async (e) => {
        await OnKeyEnter(e, scene.scene, scene.camera, realAPI)
    }, false);
}