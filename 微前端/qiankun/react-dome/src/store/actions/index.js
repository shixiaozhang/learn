export const SET_TOKEN = 'SET_TOKEN'
export const selectToken = token => ({
    type: SET_TOKEN,
    token
})

export const getToken = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        if (username && password) {
          const token = '123456';
          dispatch(selectToken(token));
          resolve({code:200,token});
        } else {
          const msg = '请登录！';
          reject({code:300,msg});
        }
    });
  };