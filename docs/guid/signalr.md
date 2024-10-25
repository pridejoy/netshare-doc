# 实时应用

SignalR实现服务器与客户端的实时通信 ，可简化将实时 web 功能添加到应用程序的过程。 实时 web 功能是让服务器代码将内容推送到连接的客户端立即可用，而不是让服务器等待客户端请求新数据的能力。

## 概念

Persistent Connection（持久连接）：
持久连接是一种特殊的 HTTP 连接，用于在 SignalR 中实现长时间保持连接状态的功能。它允许服务器端主动向客户端发送消息。

Hub（集线器）：
Hub 是 SignalR 中的一个核心概念，它是一个服务器端对象，用于管理一组客户端连接，并允许服务器和客户端之间进行实时通信。Hub 可以看作是客户端和服务器端通信的桥梁。

Hub Context（集线器上下文）：
Hub 上下文提供了一种方式来访问特定 Hub 的信息，例如客户端连接列表、群组管理等。

Hub Proxy（集线器代理）：
客户端使用 Hub Proxy 与服务器端的 Hub 进行通信。它是一个客户端对象，代表了服务器上的 Hub。

## 使用

### 前端(js实现)

<!--@include: ./public/signalr.md-->

- [代码](./signalrdemo)

### 前端(ts实现)

安装

```
npm i @microsoft/signalr @types/node
```

- [代码](https://gitee.com/Pridejoy/MalusAdmin/blob/master/MalusWeb/src/plugins/signalR.ts)

### 后端

配置 SignalR 中心

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

app.MapHub<ChatHub>("/Chat");
```

```csharp
public class ChatHub : Hub
{
    /// <summary>
    /// 当用户连接上
    /// </summary>
    /// <returns></returns>
    public override async Task OnConnectedAsync()
    {
        await Console.Out.WriteLineAsync("用户连接:" + Context.ConnectionId);
    }

    /// <summary>
    /// 用户断开连接
    /// </summary>
    /// <returns></returns>
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Console.Out.WriteLineAsync("用户断开连接:" + Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    /// <summary>
    /// 定义一个方法供客户端调用
    /// </summary>
    /// <param name="username"></param>
    /// <param name="message"></param>
    /// <returns></returns>
    public async Task SendMessage(string username, string message)
    {
        await Console.Out.WriteLineAsync("用户发送消息:" + username+ "message");
        //收到的消息发送所有人,调用服务端的messageReceived方法
        await Clients.All.SendAsync("messageReceived", username, message);
    }

    /// <summary>
    /// 强制下线
    /// </summary>
    /// <param name="ConnectionId"></param>
    /// <returns></returns>
    public async Task ForceOffline(string ConnectionId)
    { 
        await  Clients.Client(ConnectionId).SendAsync("forceoffline");
    }


}
```

更多关于资料可查阅[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-8.0&tabs=visual-studio)。
