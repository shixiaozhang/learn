import request from '@/utils/request'

export default {
    changePassword: form => {
        return request({
            url: '/api/user/resetownpassword',
            method: 'post',
            data: form
        })
    },

    sendForgetPsdCode: nameForm => {
        return request({
            url: '/api/user/sendverifycode',
            method: 'post',
            data: nameForm
        })
    },

    resetPassword: form => {
        return request({
            url: '/api/user/forgetownpassword',
            method: 'post',
            data: form
        })
    }

}