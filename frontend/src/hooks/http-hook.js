const UseHttp =  async (url, method = "GET", body = "", header = {}) => {
  let data;
  const URL = "http://127.0.0.1:3000/";
  try {
    const Response = await fetch(URL+url,{
        method : method,
        headers: header,
        body: !!body ? JSON.stringify(body) : null
    })
    data = await Response.json();
    if (!Response.ok){
      throw new Error(data.message)
    }
  } catch (err) {
    console.log(err.message);
  }
  return data;
};

export default UseHttp;