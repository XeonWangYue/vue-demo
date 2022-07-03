import axios, { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";


/**
 * @author Chen Q.
 * @abstract 封装axios
 * @param config
 * @returns {Promise<Any>}
 */

export function request(config: AxiosRequestConfig<any>) {
    return new Promise((resolve, reject) => {

        //创建axios实例
        const instance = axios.create({
            timeout: 10000,
            headers: {
                "content-type": "application/json;charset=utf-8",
            },
        });

        //请求拦截器
        instance.interceptors.request.use(
            (config) => {
                //如果有token，就将token放入头部
                return config;
            },
            (err) => {
                console.log("requestUtil - 发送请求时出现错误：", err);
                throw err; // error 需要 throw 而非 return，才能在后续被 catch -- LH
            }
        );

        //响应拦截器
        instance.interceptors.response.use(
            (res) => {
                //如果头部附带token，则将token刷新
                return res.data;
            },
            (err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = "请求出错";
                            break;
                        case 401:
                            err.message = "无权限";
                            break;
                        case 403:
                            err.message = "鉴权失败，请重新登录以存取这个功能";
                            break;
                        case 404:
                            err.message = "请求错误，未找到该资源";
                            break;
                        case 405:
                            err.message = "方法错误";
                            break;
                        case 500:
                            err.message = "服务器错误";
                            break;
                        case 503:
                            err.message = "服务未发现";
                            break;
                    }
                } else {
                    err.message = "连接服务器失败";
                }
                ElMessage.error({
                    message: err.message,
                });
                console.log("requestUtil - 接收请求时捕获到了错误：", err);
                throw err; // error 需要 throw 而非 return，才能在后续被 catch -- LH
            }
        );

        instance(config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
