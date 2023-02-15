const axios = require("axios");

async function getClassName() {
  const tokenId  ='get from github'
  const id = "103232";
  const result = await GetName(id, token);
  return result;
}

const GetName = async (id, tokenId) => {
  try {
    axios
      .get(`https://csus.instructure.com/api/v1/courses/` + id, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      })
      .then((response) => {
        console.log(response.data.name);
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.error(e);
  }
};


module.exports = { 
    getClassName
}