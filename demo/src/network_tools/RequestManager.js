import * as REAL from "real_api";
import axios from "axios";
import {ErrorResponse} from "../tools/debug_tools";


export class RequestManager {
    constructor() {
        this.uri = `https://${REAL.Domain}/rapi/ask_service`;
        // this.uri = `http://localhost:8001/rapi/ask_service`;
    }
    async postResponse(params) {
        const response = await axios.post(this.uri, params);
        if(response.status === 200) {
            const resData = response.data;
            if(isDict(resData.data)) return resData.data;
            return ErrorResponse(resData.msg);
        }
        ErrorResponse(JSON.stringify(response));
    }
    async downloadImg(jobUrl) {
        let imageUrl;
        try {
            const response = await axios.get(jobUrl, { responseType: 'blob' });
            const blob = response.data;
            imageUrl = URL.createObjectURL(blob);
        } catch (error) {
            ErrorResponse(error);
            ErrorResponse("Failed to download image:");
            return;
        }
        return imageUrl;
    }

    async putResponse(uri, scene){
        try {
            const request = await axios.put(uri, scene);
            return request.status === 200;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}

function isDict(value) {
    try {
        if(typeof value === 'object' && value !== null) return true;
        const parsedData = JSON.stringify(JSON.parse(value));
        return true;
    } catch (error) {
        // console.log(error);
        return false;
    }
}
