const axios = require("axios");

export async function ProcessIDs (nums: Array<any>){
    const tkn:string = 'MTA3NDM0NDg5NTM2MTMzMTMwMQ.G-Xu_h.uLZ-r_lyvYrQdMpB6qJRxxeZziEfivaDYtzbI4'
    const canvas_tkn:string = '11299~aAHiTClQDxCZ43sUm0l9l5fHWtxMmaDy8D24PffKzrNrNdO7HXQKBO1dLuLkeDpz'
    if (nums.length === 0) return null;
    // [['Math26B',{...}],['Stat129', {...}]];
    return nums.map(id => {
        axios.get(`https://csus.instructure.com/api/v1/courses/` + id, {
            headers: {Authorization: ` Bearer ${canvas_tkn}`}
        }).then((response: { data: { name: any; }; }) => {
            console.log(response.data);
            return [response.data.name, response.data];
        }).catch((e: any) => {
            console.error(e);
        });
    });
}
