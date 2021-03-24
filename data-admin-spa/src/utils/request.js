import store from '@/store'
import { getToken, getRefreshToken, setToken } from '@/utils/auth';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 500000
})

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

function getNewTokenByRefreshToken() {
  return service.get('api/auth/token',
    {
      headers: {
        'X-Authorization': 'Bearer ' + getRefreshToken()
      },
      isRefreshTokenRequest: true
    }
  )
}


service.interceptors.request.use(
  config => {
    if (config.headers['X-Authorization']) {
      return config
    }
    if (store.getters.token) {
      config.headers['X-Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const result = response.data;
    const dppMsg = result.msg || result.message;
    const requestMethod = response.config.method;
    if (result.hasOwnProperty('success') && requestMethod != 'get') {
      if (result.success && dppMsg) {
        Message.success(dppMsg);
      } else if (!result.success && dppMsg) {
        Message.error(dppMsg);
      }
    }
    return Promise.resolve(response.data);
  },
  error => {
    let msg = error.response ? error.response.data.message || error.response.statusText : error.message;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          let config = error.config;
          if (store.getters.token) {
            if (!config.isRefreshTokenRequest) {
              // get new token
              return getNewTokenByRefreshToken().then(res => {
                const newToken = res.token;
                setToken(newToken);
                config.headers['X-Authorization'] = 'Bearer ' + newToken;
                config.baseURL = '';
                return service(config);
              })
            } else {
              // refresh token timeout.
              msg = 'Your token is timeout, Please login.'
              store.dispatch('FedLogOut');
              location.reload();
            }
          } else {
            // username or password wrong.
          }
          break;
        default:
          break;
      }
    }

    console.log(msg);

    Message({
      message: msg,
      type: 'error',
      showClose: true,
      duration: 3000
    })

    return Promise.reject(error)
  }
)

export default service
