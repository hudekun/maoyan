import Api from '../../ajax/Api'
import request from '../../ajax/request'

const initalState = {
      name:'lisi',
      flag:false
}

const DETAIL_FILMS_API = 'get_Detail_api'
const ADDRESS_FILMS_API = 'get_Address_api'
const CINEMA_DATA='get_cinemas_api'

const reducer = (state=initalState,action)=>{
   switch(action.type){
        case DETAIL_FILMS_API:
            return{
                ...state,
                detail:action.value
            }
        case ADDRESS_FILMS_API:
            return{
                ...state,
                addressData:action.value
            }
        case 'set_flag':
            return{
                ...state,
                flag:action.value
            }
        case CINEMA_DATA:
            return{
                ...state,
                cinemas:action.value
            }
        default:
            return state
   }
}

export default reducer


//action
const setDetail=(res)=>{
    return{
        type:'get_Detail_api',
        value:res
    }
}
//地址
const setAddress=(res)=>{
    return{
        type:'get_Address_api',
        value:res
    }
}
//请求影院数据
const setCinema=(res)=>{
    // console.log(res)
    return{
        type:'get_cinemas_api',
        value:res
    }
}





//数据请求
export const reqDetail=(param)=>{
    return async (dispatch)=>{
        let res = await request.get(Api.MOVIE_DETAIL,{
            movieId:param
        })
        // console.log(res)
        dispatch(setDetail(res.detailMovie))
    }
}
//地址请求
export const reqAddressData=()=>{
    return async (dispatch)=>{
        let res = await request.get(Api.FILTER_CINEMA)
        // console.log(res)
        dispatch(setAddress(res))
    }
}
//市区请求影院数据
export const reqUpdateListData=(param)=>{
    return async (dispatch)=>{
        let res = await request.post(Api.CITY_API_DATA,{
            forceUpdate:param
        })
        console.log(res.cinemas)
        dispatch(setCinema(res.cinemas))
    }
}
//开关
export const setFlagData=(flag)=>{
    console.log(flag)
    return{
        type:'set_flag',
        value:flag
    }
}