import axios from 'axios';

// 防止重复提交，利用 axios 的 cancelToken
const pending: any[] = []; // 声明一个数组用于存储每个 Ajax 请求的取消函数和 Ajax 标识
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
    // 获取请求的 url
    const flagUrl = config.url;

    // 判断该请求是否在队列中
    if (pending.indexOf(flagUrl) !== -1) {
        // 如果在请求中，并存在 f, f 即 axios 提供的取消函数
        if (f) {
            f('取消重复请求');
        } else {
            pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
        }
    } else {
        // 如果不存在请求队列中，加入队列
        if (f) {
            pending.push(flagUrl);
        }
    }
};

// 创建 axios 实例
const service = axios.create({
    timeout: 5000
});

// request 拦截器
service.interceptors.request.use(
    (config: any) => {
        // neverCancel 配置项，允许多个请求
        if (!config.neverCancel) {
            // 生成 cancelToken
            config.cancelToken = new CancelToken((c: any) => {
                removePending(config, c);
            });
        }

        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

// response 拦截器
service.interceptors.response.use(
    (response: any) => {
        // 移除队列中的该请求
        removePending(response.config);

        // 获取返回数据，并处理
        return response;
    },
    (error: any) => {
        // 异常处理
        return Promise.reject(error);
    }
);

export default service;
