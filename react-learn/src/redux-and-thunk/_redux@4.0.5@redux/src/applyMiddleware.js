/*
 * @Author: your name
 * @Date: 2020-12-31 10:33:07
 * @LastEditTime: 2021-01-05 17:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \redux\examples\async\node_modules\_redux@4.0.5@redux\src\applyMiddleware.js
 */
import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  // ? enhancer(createStore)(reducer, preloadedState)
  // ? createStore中调用applyMiddleware
  return createStore => (...args) => {
    const store = createStore(...args)//?创建 不带中间件的store
    let dispatch = () => {//? 定义一个新的 dispatch
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      //? 定义 给中间件 传入的参数；
      //? 同时在dispatch中传入 reducers 和 preloadedState初始值
      getState: store.getState,
      // ?  这个dispatch中的 dispatch(...args)调用的是let 定义的dispatch，也就是dispatch = compose()()最后修改过的dispatch
      dispatch: (...args) => dispatch(...args)

    }

    // ? 遍历所有中间件函数，传入middlewareAPI参数
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // ? 把所有接收了middlewareAPI的中间件函数，传入compose函数中
    // ? 此时的中间件函数 格式 next => action => {}

    // ? 中间件数量为0 ： arg => arg 通过 (store.dispatch)调用
    // ? dispatch= store原始的dispatch不做改变

    // ? 中间件数量为1 ：
    // ? funcs[0]
    // ? 变为 (store.dispatch)调用

    // ?  store.dispatch => action =>{} 

    // ?  dispatch = action =>{ 了以直接访问到 store原始的dispatch } 

    // ?  thunk为例：
    /**
      action => {
          if (typeof action === 'function') {
            
            // extraArgument 没传值
            // dispatch, getState ==== middlewareAPI
            
            return action(dispatch, getState, extraArgument);
            
          }

          return store.dispatch(action);
          
        };

     */


     

    dispatch = compose(...chain)(store.dispatch)// ? 1

    return {
      ...store,
      dispatch
      //? 返回修改过的dispatch，因为引入了thunk，所以如果dispatch中传入:例如：dispatch(fetchPostsIfNeeded(selectedSubreddit))
      //? 一个func :则会调用调用该函数 action(dispatch, getState, extraArgument) 其中 dispatch, getState ==== middlewareAPI
      //?           并且传入这三个参数：(因为thunk初始化未传入extraArgument，所以该值为空。)
      //?           fetchPostsIfNeeded运行后会返回 (dispatch, getState) => {}。
      //?           这个函数会接受一个dispatch 是这样的dispatch: (...args) => dispatch(...args)
      //?           这个middlewareAPI.dispatch()调用会返回一个 修改过的 dispatch(...args);
      //? 一个obj ：调用dispatch()并传入该obj， 直接修改store         
      //?      总结： 如果dispatch()传入一个func那么thunk就会调用它，并把运行结果传入dispatch，直到dispatch接收的是一个对象时，运行 直接修改store     
      //? 
    }
  }
}

//? 调用:
// app.js
// componentDidMount() {

  const { dispatch, selectedSubreddit } = this.props

  dispatch(fetchPostsIfNeeded(selectedSubreddit))
  
  
// }

// ? actions中

const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    return dispatch(fetchPosts(subreddit))
}

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}
const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})


// ? thunk :达成异步调用方法的 func函数形式; dispatch(func(params))
// ? const fetchPostsIfNeeded = subreddit => (dispatch, getState) => { dispatch(xxxxxxx)}
// ? dispatch(fetchPostsIfNeeded(subreddit))