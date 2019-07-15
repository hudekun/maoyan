import {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk'
import films from './films/index'
import filmsDetailData from './films/filmsDetailData'
import cityData from './city/index'

const reducer = combineReducers({
    films,
    filmsDetailData,
    cityData
})

// const store = createStore(reducer,applyMiddleware(thunk))
//调用redux的开发者工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//创建store仓库
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store
