import Api from '../../ajax/Api'
import request from '../../ajax/request'


let MOVIEONINFOLIST ='movieList'
let MOVE_ID = "movie_Id"
let BANNERLIST =  'banner_list_api'
let COMING_LIST_API = 'banner_coming_list_api'


const initalState ={
    show:false,
    list:[],
    ids:[],
    bannerList:[],
    loading:false,
    comingList:[],
    paging:{}
}


const reducer=(state=initalState,action)=>{
    switch(action.type){
        case  MOVIEONINFOLIST:
           return{
               ...state,
               list: [...state.list, ...action.value],
           }
        case  MOVE_ID:
            return{
                ...state,
                ids:action.value
            }
        case  BANNERLIST:
            return{
                ...state,
                bannerList:[...state.bannerList, ...action.value]
            }
        case  'set_loading':
            return{
                ...state,
                loading:action.value
            }
        case  COMING_LIST_API:
            return{
                ...state,
                comingList:[...state.comingList,...action.value]
            }
        case "set_movie_ids":
            return{
                ...state,
                movieIds:action.value
            }
        case "set_paging":
                return{
                    ...state,
                    paging:action.value
                }
                
        default:
            return state
    }
}
export default reducer




// action
const setMovieList=(params)=>{
    return{
        type:"movieList",
        value:params
    }
}
const setMovieId=(params)=>{
    return{
        type:"movie_Id",
        value:params
    }
}
const setBannerList=(params)=>{
    // console.log(params);
    
    return{
        type:BANNERLIST,
        value:params
    }
}
const setComingList=(params)=>{
    return{
        type:"banner_coming_list_api",
        value:params
        
    }
}
const setMovieIds=(params)=>{
    return{
        type:"set_movie_ids",
        value:params
        
    }
}
const setPaging=(params)=>{
       return{
        type:'set_paging',
        value:params
       }
}




// 请求数据
 export  const setloading=(params)=>{
        return{
            type:"set_loading",
            value:params
            
        }
    }
export const requestGetPlaying=()=>{
    return async (dispatch)=>{
          let response = await request.get(Api.MOVIEONINFOLIST)
          let data = response.movieList.map(item=>{
              return{
                id:item.id,
                nm:item.nm,
                img:item.img,
                rt:item.rt,
                sc:item.sc,
                showInfo:item.showInfo,
                star:item.star,
                globalReleased:item.globalReleased,
                wish:item.wish
              }
          })
          dispatch(setMovieList(data))
          let Ids =response.movieIds
          //处理数据
          dispatch(setMovieId(Ids))
    }
}
// 请求更多数据
export const requestMorePlaying=(newIDs)=>{
    return async (dispatch)=>{
          let response = await request.get(Api.MORECOMMINGLIST,{
            movieIds: newIDs
        })
        let data = response.coming.map(item=>{
            return{
              id:item.id,
              nm:item.nm,
              img:item.img,
              rt:item.rt,
              sc:item.sc,
              showInfo:item.showInfo,
              star:item.star,
              globalReleased:item.globalReleased,
              wish:item.wish
            }
        })
        dispatch(setMovieList(data))

    }
}
//请求banner数据
export const requestBannerData =()=>{
    return async (dispatch)=>{
        //拿到数据
        let response = await request.get(Api.MOSTEXPECTED,{
            token:'',
            limit:10,
            offset:''
        })
        // console.log(response)
        let paging = response.paging
        // console.log(paging)
        //处理数据
        let coming = response.coming.map(item=>{
            item.img = item.img.replace(/w.h/, '128.180');
            return item
        })
        
        // 赋值
        dispatch(setBannerList(coming))
        dispatch(setPaging(paging))
    }
    
}
//请求banner更多数据
export const reqBanMoreListOffset=(sum)=>{
    return async (dispatch)=>{
        //拿到数据
        let response = await request.get(Api.MOSTEXPECTED,{
            ci:55,
            limit:10,
            offset: sum,
            token:'',
        })
        // console.log(response)
        //处理数据
        let coming = response.coming.map(item=>{
            item.img = item.img.replace(/w.h/, '128.180');
            return item
        })
        
        // 赋值
        dispatch(setBannerList(coming))
      
    }
}
//请求bannerlist 数据
export const reqComingList=()=>{
    return async (dispatch)=>{
        let res = await request.get(Api.COMIMGLIST,{
            ci:30,
            limit:10
        })
        //处理数据
        let dataList = res.coming.map(item=>{
            item.img = item.img.replace(/w.h/, '128.180');
            return item
        })
        // console.log(dataList)
        // 派发数据
        dispatch(setComingList(dataList))
        let movieIds= res.movieIds
        dispatch(setMovieIds(movieIds))
    }
}
//请求bannerlist更多
export const reqMoreComingList=(param)=>{
    return async (dispatch)=>{
        let res = await request.get(Api.MORECOMMINGLIST,{
            ci:30,
            token: '',
            limit:10,
            movieIds:param,
        })
        let data = res.coming.map(item=>{
            item.img = item.img.replace(/w.h/, '128.180');
            return item
        })
        // console.log(data)
         dispatch(setComingList(data))
    }
}
