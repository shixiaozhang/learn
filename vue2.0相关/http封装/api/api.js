import { post, get,put, postWithHead } from './http'
import Qs from 'qs'

const headerConfig = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }

/**
 * 登录接口
 * url:/api/login
 * @param {object} params as {tel:string, code:string}
 * @returns {object}
 */
export const login = params => post('/api/login/', params)
/**
 * 验证码接口
 * url:/api/sendcode
 * @param {object} params as {tel:string}
 * @returns {object}
 */
export const sendCode = params => post('/api/sendcode/', params)


/**
 * 获取收藏记录接口
 * url:/api/collect
 * @param {object} params as {user_id:string}
 * @returns {object}
 */
export const collectGet = params => get('/api/collect/', params)

/**
 * 删除收藏记录接口
 * url:/api/collect
 * @param {object} params as {user_id:string，collect_id:string}
 * @returns {object}
 */
export const collectPut = params => put('/api/collect/', params)

/**
 * 添加收藏记录接口
 * url:/api/collect
 * @param {object} params as {user_id:string,collect_info:object,Type:number}
 * @returns {object}
 */
export const collectPost = params => post('/api/collect/', params)

/** 
 * 账户间关联查询
 * url:/api/selectr
 * @param {object} params as {account1:string，
 *                            account2:string ，
 *                            chain：eth(链名) ，
 *                            price：string，
 *                            start_time：2020-03-06（可选）
*                             end_time：2020-03-10（可选）
*                             start_piece：880（最低价，可选）
*                             end_price：999（最高价，可选）
 *                            }
 * @returns {object}
 */
export const selectr = params => get('/api/selectr/', params)


/**
 * 获取追踪记录接口
 * url:/api/track
 * @param {object} params as {user_id:string,collect_info:object,Type:number}
 * @returns {object}
 */
export const trackGet = params => get('/api/track/', params)
 
/**
 * 添加追踪记录接口
 * url:/api/track
 * @param {object} params as {user_id:string,collect_info:object,Type:number}
 * @returns {object}
 */
export const trackPost = params => post('/api/track/', params)

/**
 * 删除追踪记录接口
 * url:/api/track
 * @param {object} params as {user_id:string，collect_id:string}
 * @returns {object}
 */
export const trackPut = params => put('/api/track/', params)

/**history
 * 获取浏览记录接口
 * url:/api/history
 * @param {object} params as {user_id:string,collect_info:object,Type:number}
 * @returns {object}
 */
export const historyGet = params => get('/api/history/', params)
 
/**
 * 添加浏览记录接口
 * url:/api/history
 * @param {object} params as {user_id:string,collect_info:object,Type:number}
 * @returns {object}
 */
export const historyPost = params => post('/api/history/', params)

/**
 * 删除浏览记录接口
 * url:/api/history
 * @param {object} params as {user_id:string，collect_id:string}
 * @returns {object}
 */
export const historyPut = params => put('/api/history/', params)


/**
 * 修改用户名
 * url:/api/changename
 * @param {object} params as {user_id:string，User_name：string}
 * @returns {object}
 */
export const changename = params => post('/api/changename/',params)


/**
 * 修改手机号
 * url:/api/changetel
 * @param {object} params as {tel:string,new_tel:string,code:string}
 * @returns {object}
 */
export const changetel = params => post('/api/changetel/',params)





/**
 * 修改头像
 * url:/api/icon
 * @param {object} params as {icon:img}
 * @returns {object}
 */
export const icon = params => post('/api/icon/',params,headerConfig)


 


export const chain = {

              /**
             * 获得红榜排名
             * url:/dpi/chain/getactiveredrank/
             * @returns {object}
             */
            getactiveredrank: () => get('/dpi/chain/getactiveredrank/'),


            /**
             * 获得黑榜排名
             * url:/dpi/chain/getactiveblackrank/
             * @returns {object}
             */
            getactiveblackrank: () => get('/dpi/chain/getactiveblackrank/'),


            /**
             * 获得公链账户日活
             * url:/dpi/chain/getchainactive/
             * @param {object} params as {"chain":bch,"time_unit":1h}
             * @returns {object}
             */
            getchainactive: params => get('/dpi/chain/getchainactive/', params),


//------------------------------------
            /**
             * 公链交易量top10
             * url:/cpi/chain/getheardform/
             * @returns {object}
             */
            getheardform: () => get('/cpi/chain/getheardform/'),
            
            /**
             * 公链交易量top10-公链实时转账记录
             *  @param {object} params as {chain_name=公链名}
             * url:/cpi/chain/getchaintransactions/
             * @returns {object}
             */
            getchaintransactions: params => get('/cpi/chain/getchaintransactions/',params),

           
            /**
             * 公链交易量top10-获取表主体信息
             * url:/cpi/chain/getbodyform/
             *  @param {object} params as {chain_name=公链名&Time_tange=时间(1H/6H/12H/24H/3D/week/month/year)}
             * @returns {object}
             */
            getbodyform: params => get('/cpi/chain/getbodyform/',params),


            /**
             * 获取交易表top10
             * url:/cpi/chain/getexchangetop10/
             *  @param {object} params as {chain_name=公链名}
             * @returns {object}
             */
            getexchangetop10Get: params => get('/cpi/chain/getexchangetop10/',params),

                /**
             * 获取交易表top10图
             * url:/cpi/chain/getexchangetop10/
             *  @param {object} params as {chain_name=公链名&exchange_name=交易所名&time_range=时间}
             * @returns {object}
             */
            getexchangetop10Post: params => post('/cpi/chain/getexchangetop10/',params),


             /**
             * 大额交易top10
             * url:/cpi/chain/getlargetstop10/
             *  @param {object} params as {chain_name=公链名&time_range=时间1H/6H...}
             * @returns {object}
             */
            getlargetstop10Get: params => get('/cpi/chain/getlargetstop10/',params),



             /**
             * 单一用户查询
             * url:/cpi/chain/getaccount/
             *  @param {object} params as {chain_name=链名&min_price=最小金额&max_price=最大金额&start_time=开始时间&end_time=结束时间&account_hash=用户hash}
             * @returns {object}
             */
            getaccount: params => get('/cpi/chain/getaccount/',params),
// -------------------------

            /**
             * 公链交易查询
             * url:/epi/chain/Query/
             *  @param {object} params as {chain_name=公链名& 
             *                              Specified_amount=指定金额& 
             *                              start_time1=起始时间&
             *                              end_time1=终止时间
             *                              start_money=起始金额&
             *                              end_money=终止金额&
             *                              start_time1=起始时间&
             *                              end_time1=终止时间}
             * @returns {object}
             */
            Query: params => get('/epi/chain/Query/',params),


             /**
             * 交易所账户查询
             * url:/epi/chain/chain_exchange/
             *  @param {object} params as {chain_name=公链名& 
             *                              start_time=起始时间
             *                             end_time=终止时间}
             * @returns {object}
             */
            chain_exchange: params => get('/epi/chain/chain_exchange/',params),


              /**
             * 交易所账户公链hash查询
             * url:/epi/chain/exchange_name/
             *  @param {object} params as {chain_name=公链名& 
             *                              exchange_name=交易所名
             *                              }
             * @returns {object}
             */
            exchange_name: params => get('/epi/chain/exchange_name/',params),


            
            /**
             * 公链交易量走势查询头部
             * url:/epi/chain/chain_volume/
             *  @param {object} params as {chain_name=公链名}
             * @returns {object}
             */
            chain_volume: params => get('/epi/chain/chain_volume/',params),


             /**
             * 公链交易量走势查询点图数据
             * url:/epi/chain/time_data/
             *  @param {object} params as {time=时间,Time=1h/6h/12h/24h/3D/1W/1M/1Y}
             * @returns {object}
             */
            time_data: params => get('/epi/chain/time_data/',params),


            
             /**
             * 公链交易量走势查询虚假交易数据
             * url:/epi/chain/fake_recoding/
             *  @param {object} params as {chain_name=公链名称&
            *                              assign_price=指定金额
            *                              start_money=起始金额&
            *                              end_money=终止金额
            *                              start_time=开始时间&
            *                              end_time=结束时间}
             * @returns {object}
             */
            fake_recoding: params => get('/epi/chain/fake_recoding/',params),


            
            
             /**
             * 公链交易量走势查询真实交易数据
             * url:/epi/chain/real_recoding/
             *  @param {object} params as {chain_name=公链名称&
            *                              assign_price=指定金额
            *                              start_money=起始金额&
            *                              end_money=终止金额
            *                              start_time=开始时间&
            *                              end_time=结束时间}
             * @returns {object}
             */
            real_recoding: params => get('/epi/chain/real_recoding/',params),


           /**
            * 公链交易量走势查询总交易数据
            * url:/epi/chain/total_recoding/
            *  @param {object} params as {chain_name=公链名称&
            *                              assign_price=指定金额
            *                              start_money=起始金额&
            *                              end_money=终止金额
            *                              start_time=开始时间&
            *                              end_time=结束时间}
            * @returns {object}
            */
            total_recoding: params => get('/epi/chain/total_recoding/',params),



           
}


/**
 * 用户信息
 * url:/api/user/userInfo
 * @method getUserInfo
 * @returns {object}
 */
export const getUserInfo = () => post('/api/user/userInfo')

/**
 * 获取落地公司列表
 * @method getSubCompanyList
 * @param { Object } data as {pageSize: String, pageNum: String, orderByColumn: String, isAsc: String}
 * @return {JSON}
 */
export const getSubCompanyList = data => post('/api/wanrongCompany/list', Qs.stringify(data), headerConfig)

/**
 * 新建企业注册企业账号
 * @method addCompany
 * @param { Object } XDTO [注册的公司资料及账号名与密码]
 */
export const addCompany = XDTO => post('/api/company/add', XDTO)

/**
 * 获取企业列表
 * @method getCompanyList
 * @param { Object } data []
 */
export const getCompanyList = data => post('/api/company/list', Qs.stringify(data), headerConfig)

/**
 * 获取企业详情
 * @method getCompanyDetail
 * @param { String } data [公司id]
 */
export const getCompanyDetail = data => post('/api/company/detail', data)

/**
 * 获取渠道商列表
 * @method getAgentList
 * @param { Object } data [空对象]
 */
export const getAgentList = data => post('/api/agent/list', Qs.stringify(data), headerConfig)

/**
 * 获取渠道商列表
 * @method editCompany
 * @param { Object } data [修改后的数据]
 */
export const editCompany = data => post('/api/company/edit', data)

/**
 * 获取薪酬订单列表
 * @method getOrderList
 * @param { Object } data [待处理或者已处理的状态和页码]
 */
export const getOrderList = data => post('/api/order/list', Qs.stringify(data), headerConfig)

/**
 * 获取薪酬订单详情
 * @method getOrderDetail
 * @param { Object } data [订单号:orderId]
 */
export const getOrderDetail = data => post('/api/order/detail', data)

/**
 * 订单-发放明细列表
 * @method getSalaryList
 * @param { Object } data [订单号:orderId,页码和页面数据条数]
 */
export const getSalaryList = data => post('/api/salary/list', Qs.stringify(data), headerConfig)

/**
 * 获取当前企业余额
 * @method getCompanyMoney
 * @param { Number } companyId [企业id]
 * @param { Number } wrCompanyId [落地公司id]
 * @param { String } payType [发薪方式]
 */
export const getCompanyMoney = data => post('/api/companyMoney/money', Qs.stringify(data), headerConfig)

/**
 * 落地公司确认薪酬订单发放
 * @method getCompanyMoney
 * @param { Number } companyId [企业id]
 * @param { Number } wrCompanyId [落地公司id]
 * @param { String } payType [发薪方式]
 * @param { Number } amount [实发金额]
 * @param { Number } orderId [薪酬订单号]
 */
export const confirm = data => post('/api/order/confirm', data)

/**
 * 新建落地公司
 * @method addWrCompany
 * @param { Object } data [新建信息]
 */
export const addWrCompany = (data) => post('/api/wanrongCompany/add', data)

/**
 * 落地公司详情
 * @method getWrCompanyDetail
 * @param { Object } data [公司id]
 */
export const getWrCompanyDetail = (data) => post('/api/wanrongCompany/detail', data)

/**
 * 落地公司编辑
 * @method editWrCompany
 * @param { Object } data [表单信息]
 */
export const editWrCompany = (data) => post('/api/wanrongCompany/edit', data)

/**
 * 落地公司余额列表
 * @method wrCompanyBalance
 * @param { Object } data [分页相关]
 */
export const wrCompanyBalance = (data) => post('/api/companyMoney/wrCompanyList', Qs.stringify(data), headerConfig)

/**
 * 企业余额列表
 * @method companyBalance
 * @param { Object } data [分页相关]
 */
export const companyBalance = (data) => post('/api/companyMoney/list', Qs.stringify(data), headerConfig)

/**
 * 获取渠道商列表
 * @method geAgentList
 * @param { Object } data [分页相关]
 */
export const geAgentList = (data) => post('/api/agent/list', Qs.stringify(data), headerConfig)

/**
 * 获取充值订单列表
 * @method geRechargeList
 * @param { Object } data [分页相关]
 */
export const geRechargeList = (data) => post('/api/recharge/list', Qs.stringify(data), headerConfig)

/**
 * 近7天薪酬发放
 * @method getRecently
 */
export const getRecently = () => post('/api/order/money')

/**
 * 资金明细-今日数据
 * @method getMoneyDate
 */
export const getMoneyDate = (data) => post('/api/companyMoney/date', Qs.stringify(data), headerConfig)

/**
 * 渠道商详情
 * @method getAgentDetail
 * @param {Number} data [agentId:渠道商id]
 */
export const getAgentDetail = data => post('/api/agent/detail', data)

/**
 * 新建渠道商
 * @method addAgent
 * @param {Number} data [表单数据]
 */
export const addAgent = data => post('/api/agent/add', data)

/**
 * 渠道商所属企业列表
 * @method addAgentCompanyList
 * @param {Object} data [分页与渠道商id]
 */
export const addAgentCompanyList = data => post('/api/agent/companyList', Qs.stringify(data), headerConfig)

/**
 * 渠道商所属企业列表
 * @method getUserList
 * @param {Object} data [分页与排序]
 */
export const getUserList = data => post('/api/user/list', Qs.stringify(data), headerConfig)

/**
 * 渠道商编辑
 * @method editAgent
 * @param {Object} data [表单参数]
 */
export const editAgent = data => post('/api/agent/edit', data)

/**
 * 账号详情
 * @method getUserDetail
 * @param {Object} data [accountId]
 */
export const getUserDetail = data => post('/api/user/detail', Qs.stringify(data), headerConfig)

/**
 * 账号编辑
 * @method editUser
 * @param {Object} data [修改参数]
 */
export const editUser = data => post('/api/user/edit', Qs.stringify(data), headerConfig)

/**
 * 账号编辑
 * @method editUserInfo
 * @param {Object} data [修改参数]
 */
export const editUserInfo = data => post('/api/user/editUser', data)

/**
 * 重置密码
 * @method reset
 * @param {Object} data [修改参数]
 */
export const reset = data => post('/api/user/reset', Qs.stringify(data), headerConfig)

/**
 * 电签列表
 * @method signedList
 * @param {Object} data [分页相关]
 */
export const signedList = data => post('/api/personnel/list', Qs.stringify(data), headerConfig)

/**
 * 电签详情
 * @method signedDetail
 * @param {String} data [电签订单号]
 */
export const signedDetail = data => post('/api/personnel/detail', Qs.stringify(data), headerConfig)

/**
 * 统计单个订单的各类数据(总数量,成功数,失败数)
 * @method orderInfo
 * @param {Object} data as {orderId: Number}
 */
export const orderInfo = data => post('/api/salary/info', Qs.stringify(data), headerConfig)

/**
 * 发放明细导出
 * @method exportList
 * @param {Object} data as {orderId: Number}
 */
export const exportList = data => post('/api/salary/export', Qs.stringify(data), headerConfig)

/**
 * 确认充值
 * @method editRecharage
 * @param {Object} data [当前行]
 */
export const editRecharage = data => post('/api/recharge/edit', data)

/**
 * 资金明细列表
 * @method moenyList
 * @param {Object} data [分页相关]
 */
export const moenyList = data => post('/api/companyMoney/detailed', Qs.stringify(data), headerConfig)

/**
 * 资金明细订单详情
 * @method moenyDetail
 * @param {Object} data as {relationalId: String, type: String}
 */
export const moenyDetail = data => post('/api/companyMoney/detail', data)

/**
 * 导出电签
 * @method exportSigned
 * @param {Object} data as {signOrderNo: String}
 * @return {JSON}
 */
export const exportSigned = data => post('/api/personnel/export', Qs.stringify(data), headerConfig)

/**
 * 电签未完成信息导出
 * @method exportWait
 * @param {Object} data as {signOrderNo: String}
 * @return {JSON}
 */
export const exportWait = data => post('/api/personnel/exportWait', Qs.stringify(data), headerConfig)

/**
 * 单个图片文件上传,返回文件名和文件相对路径
 * @method uploadDoc
 * @param {Object} data as {file: File}
 * @return {JSON}
 */
export const uploadDoc = data => post('/api/common/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })

/**
 * 批量取消
 * @method cancels
 * @param {Object} data as {signOrderNo: String}
 * @return {JSON}
 */
export const cancels = data => post('/api/personnel/cancel', Qs.stringify(data), headerConfig)

/**
 * 重发通知
 * @method notice
 * @param {Object} data as {signOrderNo: String}
 * @return {JSON}
 */
export const notice = data => post('/api/personnel/notice', Qs.stringify(data), headerConfig)

/**
 * 图片查看
 * @method uploadImg
 * @param {Object} data as {fileName: String}
 * @return {JSON}
 */
export const uploadImg = data => get('/api/query/uploadImg', {
  params: data,
  responseType: 'arraybuffer'
})

/**
 * 合同下载
 * @method downLoadContract
 * @param {Object} data as {yhtContractId: String}
 * @return {JSON}
 */
export const downLoadContract = data => post('/api/personnel/downLoadContract', Qs.stringify(data), headerConfig)

/**
 * 合同批量下载
 * @method downLoadContractAll
 * @param {Object} data as {signOrderNo: String}
 * @return {JSON}
 */
export const downLoadContractAll = data => post('/api/personnel/downLoadContractAll', Qs.stringify(data), headerConfig)

/**
 * 按落地公司id分页来查询银行账户入账流水
 * @method queryBankFlowPaged
 * @param {Object} data
 * @return {JSON}
 */
export const queryBankFlowPaged = data => post('/api/queryBankFlowPaged', Qs.stringify(data), headerConfig)

/**
 * 系统环境检测
 * @method systemEnvCheck
 * @return {JSON}
 */
export const systemEnvCheck = data => postWithHead('/api/systemEnvCheck')

/**
 * 发放明细列表
 * @method xcSalaryList
 * @param {Object} data
 * @return {JSON}
 */
export const xcSalaryList = data => post('/api/salary/xcSalaryList', Qs.stringify(data), headerConfig)

/**
 * 角色列表
 * @method roleList
 * @param {Object} data
 * @return {JSON}
 */
export const roleList = data => post('/api/user/roleList', Qs.stringify(data), headerConfig)

/**
 * 新增账号
 * @method addUser
 * @param {Object} data
 * @return {JSON}
 */
export const addUser = data => post('/api/user/addUser', Qs.stringify(data), headerConfig)

/**
 * 用户权限列表
 * @method menuList
 * @return {JSON}
 */
export const menuList = data => post('/api/user/menuList')

/**
 * 角色详情
 * @method menuList
 * @return {JSON}
 */
export const roleDetail = data => post('/api/user/roleDetail', Qs.stringify(data), headerConfig)

/**
 * 权限列表
 * @method powerList
 * @return {JSON}
 */
export const powerList = data => post('/api/user/powerList', Qs.stringify(data), headerConfig)

/**
 * 新建角色
 * @method addRole
 * @return {JSON}
 */
export const addRole = data => post('/api/user/addRole', Qs.stringify(data), headerConfig)

/**
 * 新建角色
 * @method editRole
 * @return {JSON}
 */
export const editRole = data => post('/api/user/editRole', Qs.stringify(data), headerConfig)

/**
 * 角色状态修改
 * @method editRoleStatus
 * @return {JSON}
 */
export const editRoleStatus = data => post('/api/user/editRoleStatus', Qs.stringify(data), headerConfig)

/**
 * 发放明细导出
 * @method exportAll
 * @return {JSON}
 */
export const exportAll = data => post('/api/salary/exportAll', Qs.stringify(data), headerConfig)

/**
 * 落地公司禁用/启用
 * @method editSubStatus
 * @return {JSON}
 */
export const editSubStatus = data => post('/api/wanrongCompany/editStatus', Qs.stringify(data), headerConfig)

/**
 * 落地公司禁用/启用
 * @method editAgentStatus
 * @return {JSON}
 */
export const editAgentStatus = data => post('/api/agent/editStatus', Qs.stringify(data), headerConfig)

/**
 * 操作日志
 * @method logList
 * @return {JSON}
 */
export const logList = data => post('/api/log/list', Qs.stringify(data), headerConfig)

/**
 * 操作日志详情
 * @method logDetail
 * @param {Object} data as {operId:string}
 * @return {JSON}
 */
export const logDetail = data => post('/api/log/detail', Qs.stringify(data), headerConfig)

/**
 * LOGO列表
 * @method logoList
 * @return {JSON}
 */
export const logoList = data => post('/api/logo/list', Qs.stringify(data), headerConfig)

/**
 * 新增LOGO
 * @method addLogo
 * @param {Object} data as {operId:string, logo: string}
 * @return {JSON}
 */
export const addLogo = data => post('/api/logo/add', Qs.stringify(data), headerConfig)

/**
 * 新增LOGO
 * @method delLogo
 * @param {Object} data as {logoId:string}
 * @return {JSON}
 */
export const delLogo = data => post('/api/logo/remove', Qs.stringify(data), headerConfig)

/**
 * 编辑LOGO
 * @method editLogo
 * @param {Object} data as {logoId:string}
 * @return {JSON}
 */
export const editLogo = data => post('/api/logo/edit', Qs.stringify(data), headerConfig)

/**
 * 用户自己修改密码
 * @method resetByOldPassword
 * @param {Object} data
 * @return {JSON}
 */
export const resetByOldPassword = data => post('/api/user/resetByOldPassword', Qs.stringify(data), headerConfig)

/**
 * 薪酬订单取消
 * @method cancelPay
 * @param {Object} data as {orderId: String}
 * @return {JSON}
 */
export const cancelPay = data => post('/api/order/cancel', Qs.stringify(data), headerConfig)

/**
 * 发薪排行
 * @method ranking
 * @param {string} type
 * @return {JSON}
 */
export const ranking = data => post('/api/order/ranking', Qs.stringify(data), headerConfig)

/**
* 请求验证码图片(无参数)
* url:/api/createCaptcha
* @return {JSON}
*/
export const createCaptcha = params => post('/api/createCaptcha')

/**
* @description 用户登录角色查询
* url:/api/createCaptcha
* @return {JSON}
*/
export const LoginInfo = params => post('/api/common/info', Qs.stringify(params), headerConfig)

/**
* @description 管理员登录验证码
* url:/api/wrWebSendSms
* @return {JSON}
*/
export const wrWebSendSms = params => post('/api/wrWebSendSms', Qs.stringify(params), headerConfig)

/**
* @description 单点登入
* url:/api/common/userToken
* @return {JSON}
*/
export const userToken = () => post('/api/common/userToken', Qs.stringify(), headerConfig)

/**
* @description 轮询
* url:/api/common/ifLogin
* @return {JSON}
*/
export const ifLogin = () => post('/api/common/ifLogin', Qs.stringify(), headerConfig)

/**
* @description 开票类目列表
* url:/api/receipt/invoiceTypeList
* @return {JSON}
*/
export const invoiceTypeList = (data) => post('/api/receipt/invoiceTypeList', Qs.stringify(data), headerConfig)

/**
* @description 发票申请列表
* url:/api/receipt/list
* @return {JSON}
*/
export const receiptList = (data) => post('/api/receipt/list', Qs.stringify(data), headerConfig)

/**
* @description 发票申请导出
* url:/api/receipt/export
* @return {JSON}
*/
export const exportI = (data) => post('/api/receipt/export', Qs.stringify(data), headerConfig)

/**
* @description 按状态统计发票申请数据
* url:/api/receipt/countReceipt
* @return {JSON}
*/
export const countReceipt = (data) => post('/api/receipt/countReceipt', Qs.stringify(data), headerConfig)

/**
* @description 确认开票
* url:/api/receipt/confirm
* @return {JSON}
*/
export const confirmB = (data) => post('/api/receipt/confirm', Qs.stringify(data), headerConfig)

/**
* @description 完成开票
* url:/api/receipt/complete
* @return {JSON}
*/
export const completeB = (data) => post('/api/receipt/complete', Qs.stringify(data), headerConfig)

/**
* @description 驳回开票
* url:/api/receipt/reject
* @return {JSON}
*/
export const rejectB = (data) => post('/api/receipt/reject', Qs.stringify(data), headerConfig)

/**
* @description 开票详情
* url:/api/receipt/detail
* @return {JSON}
*/
export const receiptDetail = (data) => post('/api/receipt/detail', Qs.stringify(data), headerConfig)

/**
* @description 开票详情-发薪列表
* url:/api/receipt/orderList
* @return {JSON}
*/
export const receiptOrderList = (data) => post('/api/receipt/orderList', Qs.stringify(data), headerConfig)

/**
* @description 开票详情-薪酬订单数据汇总
* url:/api/receipt/countOrderList
* @return {JSON}
*/
export const countOrderList = (data) => post('/api/receipt/countOrderList', Qs.stringify(data), headerConfig)

/**
* @description 服务费率列表
* url:/api/servicecharge/list
* @return {JSON}
*/
export const chargeList = (data) => post('/api/servicecharge/list', Qs.stringify(data), headerConfig)

/**
* @description 服务费率编辑
* url:/api/servicecharge/edit
* @return {JSON}
*/
export const editServiceCharge = (data) => post('/api/servicecharge/edit', data)

/**
* @description 服务费结算
* url:/api/servicecharge/servicechargeSettlement
* @return {JSON}
*/
export const servicechargeSettlement = (data) => post('/api/servicecharge/servicechargeSettlement', Qs.stringify(data), headerConfig)

/**
* @description 渠道商结算
* url:/api/servicecharge/agentSettlement
* @return {JSON}
*/
export const agentSettlement = (data) => post('/api/servicecharge/agentSettlement', Qs.stringify(data), headerConfig)

/**
* @description 服务费结算明细导出
* url:/api/servicecharge/exportAll
* @return {JSON}
*/
export const exportSer = (data) => post('/api/servicecharge/exportAll', Qs.stringify(data), headerConfig)

/**
* @description 服务费结算数据汇总导出
* url:/api/servicecharge/exportSummary
* @return {JSON}
*/
export const exportSummary = (data) => post('/api/servicecharge/exportSummary', Qs.stringify(data), headerConfig)

/**
* @description 渠道商结算-导出明细数据
* url:/api/servicecharge/agentSettlementExportAll
* @return {JSON}
*/
export const agentSettlementExportAll = (data) => post('/api/servicecharge/agentSettlementExportAll', Qs.stringify(data), headerConfig)

/**
* @description 渠道商结算-导出汇总数据
* url:/api/servicecharge/agentSettlementExportSummary
* @return {JSON}
*/
export const agentSettlementExportSummary = (data) => post('/api/servicecharge/agentSettlementExportSummary', Qs.stringify(data), headerConfig)

/**
* @description 渠道商结算-服务费费率列表
* url:/api/servicecharge/agentServiceRatelist
* @return {JSON}
*/
export const agentServiceRatelist = (data) => post('/api/servicecharge/agentServiceRatelist', Qs.stringify(data), headerConfig)

/**
* @description 服务费结算-明细
* url:/api/servicecharge/servicechargeSettlementDetailed
* @return {JSON}
*/
export const settlementDetailed = (data) => post('/api/servicecharge/servicechargeSettlementDetailed', Qs.stringify(data), headerConfig)

/**
* @description 渠道商结算-明细
* url:/api/servicecharge/agentSettlementDetailed
* @return {JSON}
*/
export const agentSettlementDetailed = (data) => post('/api/servicecharge/agentSettlementDetailed', Qs.stringify(data), headerConfig)

/**
* @description 预结算概况
* url:/api/servicecharge/preSettlement
* @return {JSON}
*/
export const preSettlement = (data) => post('/api/servicecharge/preSettlement', Qs.stringify(data), headerConfig)

/**
* @description 预结算概况汇总
* url:/api/servicecharge/countPreSettlement
* @return {JSON}
*/
export const countPreSettlement = (data) => post('/api/servicecharge/countPreSettlement', Qs.stringify(data), headerConfig)

/**
* @description 导出预结算概况列表
* url:/api/servicecharge/preSettlementExport
* @return {JSON}
*/
export const preSettlementExport = (data) => post('/api/servicecharge/preSettlementExport', Qs.stringify(data), headerConfig)
