import * as REAL from "real_api";
import axios from "axios";


export class RequestManager {
    constructor() {
        this.uri = `https://${REAL.Domain}/rapi/ask_service`;
    }
    async postResponse(params) {
        const response = await axios.post(this.uri, params);
        if(response.status === 200) {
            const resData = response.data;
            if(isDict(resData.data)) return resData.data;
            return errorResponse(resData.msg);
        }
        errorResponse(JSON.stringify(response));
    }
    async downloadImg(jobUrl) {
        let imageUrl;
        try {
            const response = await axios.get(jobUrl, { responseType: 'blob' });
            const blob = response.data;
            imageUrl = URL.createObjectURL(blob);
        } catch (error) {
            errorResponse(error);
            errorResponse("Failed to download image:");
            return;
        }
        return imageUrl;
    }
}
function errorResponse(message) {
    console.log('%c' + message, 'color: red; font-size: 16px; font-weight: bold;');
    return 0;
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
