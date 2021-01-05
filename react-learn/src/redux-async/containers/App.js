/*
 * @Author: your name
 * @Date: 2020-12-31 10:32:02
 * @LastEditTime: 2021-01-05 20:58:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async\src\containers\App.js
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }
  constructor(props) { 
    super(props);

    const {dispatch} = props;

    // 这是一个很好的 bindActionCreators 的使用示例：
    // 你想让你的子组件完全不感知 Redux 的存在。
    // 我们在这里对 action creator 绑定 dispatch 方法，
    // 以便稍后将其传给子组件。

    this.boundActionCreators = bindActionCreators({selectSubreddit}, dispatch);
    console.log(this.boundActionCreators);
    // {
    //   addTodo: Function,
    //   removeTodo: Function
    // }
  }
  // const selectSubreddit = subreddit => ({
  //   type: SELECT_SUBREDDIT,
  //   subreddit
  // })
  // const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  //   if (shouldFetchPosts(getState(), subreddit)) {
  //     return dispatch(fetchPosts(subreddit))
  //   }
  // }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    console.log(this.props,11);
    console.log(fetchPostsIfNeeded(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      console.log(this.props,11);
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = nextSubreddit => {
    this.boundActionCreators.selectSubreddit(nextSubreddit)
    console.log(11111);
    // this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
