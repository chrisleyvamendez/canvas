const axios = require("axios");

const ProcessIDs = async (nums: Array<String>): Promise<any> => {
    const TOKEN:string = String(process.env.CANVAS_TOKEN);
    if (nums.length === 0) return null;
    const data = nums.map(id => {
        axios.get(`https://csus.instructure.com/api/v1/courses/` + id,{
            headers: {Authorization: ` Bearer ${TOKEN}`}
        }).then(response =>{
            return [response.data.name, response.data];
        }).catch(e => {
            console.error(e);
        });
    })
    // [['Math26B',{...}],['Stat129', {...}]];
    return data;
}

module.exports = { 
    ProcessIDs
}
