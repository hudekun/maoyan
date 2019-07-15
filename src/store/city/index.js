import Api from '../../ajax/Api'
import request from '../../ajax/request'

const initalState = {
    name:'city',
    city:[]
}

const reducer = (state=initalState,action)=>{
    switch(action.type){
            case CITY_CHANGE:
                return{
                    ...state,
                    city:action.value
                }
             
         default:
             return state
     }
 }

 export default reducer

//state
const CITY_CHANGE='city_change'


 //action
const setCityData=(val)=>{
   return{
       type:'city_change',
       value:val
   }
}


 //reqdata
export const reqCityData=()=>{
    console.log(123)
        return async(dispatch)=>{
            let res = await request.get(Api.CITY_API)
           dispatch(setCityData(res.cts))
        }
}