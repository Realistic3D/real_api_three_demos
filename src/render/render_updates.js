import {EnumString, Status} from "../real_api/real.three.min.js";


export async function UpdateServices(userResponse, realAPI) {
    const msg = userResponse.msg;
    const data = userResponse.data;
    const type = userResponse.type;
    // console.log(EnumString(type), msg);
    switch (type) {
        case Status.Login:
            //Anything that you want after login, otherwise ignore it
            console.log("All render job details", realAPI.jobInfo)
            break;
        case Status.Jobs:
            realAPI.updateJobs(data);
            console.log(realAPI.jobInfo);
            break;
        case Status.NewJob:
            if(msg !== "SUCCESS") {
                console.error("Exporting failed");
                return;
            }
            console.log("EXPORTED")
            break;
        case Status.Upload:
            console.log("Upload");
            console.log(userResponse);
            break;
        case Status.Download:
            // const file = data;
            // SaveLocalFile(file, "output.jpg");
            console.log("URL to download within 15 minutes");
            break;
    }
}
