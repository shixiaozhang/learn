<!--
 * @Author: your name
 * @Date: 2021-01-26 17:17:26
 * @LastEditTime: 2021-06-11 10:29:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux-async\containers\redux 书写步骤.md
-->
redux 书写步骤：

actions    -- 

components --

containers --

reducers   --



1、定义 action ：用于传入 reducer 的参数定义： 

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,   //要修改的动作
  subreddit                 //要传入的值
})

2、定义 reducer：用于定义 传入 action 时要修改的 store的某部分；
import { combineReducers } from 'redux'
import { INVALIDATE_SUBREDDIT } from './actions'

   要用到api ：combineReducers({
                    xxx,
                    xxx,
                })
    先定义函数类似的： function(state={},action){//state是默认值，action是要修改的动作
                    switch (action.type) {
                        case INVALIDATE_SUBREDDIT:
                        return {
                            ...state,
                            didInvalidate: true
                        }
                        default:
                        return state
                    }

                }
    多个reducer 要用：combineReducers整合 整合的reducer的格式就是store 的格式，整合的函数名会用作 store 中该值得key

3、 使用connect 绑定dispatch 和修改传入 react 的返回值；

    

    const mapStateToProps = state => {//这个函数可以获取整个state也就是 上边store；用于筛选数据;也可以获取props
            const { selectedSubreddit, postsBySubreddit } = state
         
            return {
                selectedSubreddit,
                postsBySubreddit
            }
        }

    export default connect(mapStateToProps)(App)//暴露出去当成新app组件


4、最后在index中引入redux的  createStore, applyMiddleware 和react-redux 的Provider：和一个总的reducer ；还有一些需要的中间件


        const middleware = [ thunk ]//中间件按照数组顺序从后朝前运行

        const store = createStore(
            reducer,
            applyMiddleware(...middleware)//注入中间件
        )
        render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        )
这样之后再所有的子组件的props中都可以获取到dispath方法和store的值


补充：bindActionCreators是redux的一个API，作用是将单个或多个ActionCreator转化为dispatch(action)的函数集合形式。

            export function addTodo(text) {
                return {
                    type: 'ADD_TODO',
                    text
                }
            }
            bindActionCreators({addTodo,removeTodo}, dispatch);
            经过bindActionCeators的处理变为：

            {
                addTodo : text => dispatch(addTodo('text'));
                removeTodo : id => dispatch(removeTodo('id'));
            }

            如果传入单个actionCreator，则返回的是一个包裹dispatch的函数，而不是一个对象。

            通常用在mapDispatchToProps中，向组件传递action方法：

            export default connect(
                (state,props) => { return state },
                (dispatch, ownProps) => { return {actions: bindActionCreators(acts,dispatch)} }
            )(Article);

            通过actions对象调用方法，就可以dispatch所有的action