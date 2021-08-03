## http请求流程图：
![img](https://static001.geekbang.org/resource/image/1f/e0/1f4f8c194b02975f6d2848b7b73175e0.png)


## Timing 参数含义：

![img](https://static001.geekbang.org/resource/image/ba/af/ba91f06503bda4b4dc4a54901bd7a8af.png)


Resource Scheduling:{
    Queueing: 排队时长：浏览器会为每个域名最多维护 6 个 TCP 连接，如果发起一个 HTTP 请求时，这 6 个 TCP 连接都处于忙碌状态，那么这个请求就会处于排队状态。网络进程在为数据分配磁盘空间时，新的 HTTP 请求也需要短暂地等待磁盘分配结束。
}，

Connection Start:{
    Stalled: 推迟连接：在发起连接之前，还有一些原因可能导致连接过程被推迟，这个推迟就表现在面板中的 Stalled 上，它表示停滞的意思
    Proxy negotiation: 代理服务器连接协商所用的时间：如果你使用了代理服务器，还会增加一个 Proxy Negotiation 阶段，也就是代理协商阶段
    DNS Lookup: DNS 请求解析的时间
    Initial connection: 建立 TCP 连接所花费的时间：服务器建立连接的阶段，这包括了建立 TCP 连接所花费的时间
    SSL: SSL 握手时间：使用了 HTTPS 协议，那么还需要一个额外的 SSL 握手时间，这个过程主要是用来协商一些加密信息的。
},

Request/Response:{

    Request sent : 网络请求发送阶段：通常这个阶段非常快，因为只需要把浏览器缓冲区的数据发送出去就结束了，并不需要判断服务器是否接收到了，所以这个时间通常不到 1 毫秒
    Waiting(TTFB) : 第一字节时间：等待接收服务器第一个字节的数据，TTFB 是反映服务端响应速度的重要指标，对服务器来说，TTFB 时间越短，就说明服务器响应越快。
    Content Download :接收完整数据的时间： 从第一字节时间到接收到全部响应数据所用的时间
}

