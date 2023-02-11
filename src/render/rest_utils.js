import axios from "axios";
import * as REAL from "../real_api/real.three.min.js"


export async function ExportRestAPI(realAPI, uri, scene) {
    console.log("Rest API URI to upload within 15 minutes");
    console.log(uri)
    try {
        const request = await axios.put(uri, scene);
        return request.status === 200;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
export async function RestTest(scene) {
    // REAL.GetModel(scene, async (model) => {
    //     const bin = REAL.GetBin(model);
    //     console.log(bin)
    //     const uri = "http://real3.oss-accelerate.aliyuncs.com/rss/rapi/20230205035903940901985802.r3d?security-token=CAISpQN1q6Ft5B2yfSjIr5WNftHGi4Zk3pq%2BdXzhjEJgOrxpt4HNuzz2IHlEdXdgCOwXs%2FoxnGxU7%2F0blq5JRpZBbHTlNT20AXTbqVHPWZHInuDoxytt6vT8a%2Fn6aXPS2MvVfJ8tJbG5U%2FyxalfCuzZuyL%2FhD1uLVECkNpv7QvcFCM8LRVuRdiFbAdpsIQ9vyqodLmCDDeuxFRToj2HMbi9voREupm5jzq69z8aAiGLZl0ao8vIJjZn6IZW4RsJoXu94SMzn8%2BFqXLfK0yNMwhNOlt9xl7cW1jrbmdufDlJNyh6CUZLT6cY9FBJlQaI4FqVYhfP494N%2FofeBr5nr4QtGPuxJdyXRSYuxy8%2FJepiuLc1rTavnEWnG0d2TDp7xsgg1Gyt5UjlHYN08MHR9JAUxQzXBUM%2Bd9UvNfx2oRtr4sto%2F2oEnyE7zr5jYZQqVTrydimFaGOdhMBxzbUBJhzO%2FKfVYKVUUST49WebFHbcURQtFtKblsTfVUiBd1XxNt5X8HaiP6vFBOdSjD88Yj9JBOM0d6nFLVVn%2BT%2Bm0jUMZZMbH4hemYGGPGoABHcy%2FyDrtXlKmviCS6kR2wXfHK3gb8am3rznMKi2HJKPGl2s6JNUP411sprAgYyOAxt6wWZUUB%2FoMyos0lHAKFj0IVHb7%2FB63cB9IbdmHxXZVwa7dHXSS39XCwCDFjLUXqc5yxyR%2FCyISnQf5n95ToXRKEaDgn%2BNz2WUeR5IwK1g%3D&OSSAccessKeyId=STS.NV85krfYEiXUwZPhB563EXDfY&Expires=1676127884&Signature=LlaNpLENumkQipkuRx8Id9KFDlM%3D";
    //     // console.log("Rest API URI to upload within 15 minutes");
    //     // console.log(uri)
    //     try {
    //         const request = await axios.put(uri, bin);
    //         return request.status === 200;
    //     }
    //     catch (e) {
    //         console.error(e);
    //         return false;
    //     }
    // });
}