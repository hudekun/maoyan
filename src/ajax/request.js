 import  'whatwg-fetch'
const get= async (url,params={})=>{
    params = {
        ...params,
        token: ''
    };
     let paramsStr='';
      Object.entries(params).forEach(item=>{
        paramsStr += item[0]+ "=" +encodeURIComponent(item[1]) + '&';
     })
     let response = await fetch(`${url}?${paramsStr}`,{
         method:"GET"
     })
     let data = await response.json();
    //  console.log(data)
     return data
}
const post = async (url,params)=>{
    let response = await fetch(url,{
        method:"POST",
        body:JSON.stringify(params)
    })
    let data = await response.json();
    return data
}
export default{
    get,
    post
}