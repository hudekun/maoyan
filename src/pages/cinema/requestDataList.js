import Api from '../../ajax/Api'
import request from '../../ajax/request'

export const requestDataList=(params)=>{
    return async(dispatch)=>{

        //请求数据
        let response= await request.get(Api.MOVIEONINFOLIST,params)
        //处理数据
        let data = response.movieList.map(item=>{
            return{
                id:item.id,
                name:item.nm
            }
        })
        console.log(data)
     //    设置全局数据
        dispatch({
            type:"resData",
            value:data
        })
    }
}
