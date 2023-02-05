import axios from "axios";


export async function ExportRestAPI(realAPI, uri, scene) {
    console.log("Rest API URI to upload within 15 minutes");
    try {
        const request = await axios.put(uri, scene);
        return request.status === 200;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
