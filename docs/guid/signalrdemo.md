
## SignalR Chat html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SignalR Chat</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/5.0.10/signalr.min.js"></script>
    <script>
        function messageReceived(username, message) {
            // 处理接收到的消息，例如将其添加到聊天窗口
            console.log("Received message from " + username + ": " + message);
            // 实际的UI更新代码将在这里
        }
        // 定义一个客户端类来处理与Hub的通信
        var connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub?token=2b277a50b04545e6ba7e03c6b2f47342") // 将"/yourHubUrl"替换为你的SignalR Hub的URL
            .configureLogging(signalR.LogLevel.Information) // 可以设置日志级别
            .build();

        // 处理连接打开事件
        connection.on("ReceiveMessage", (user, message) => {
            const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const encodedMsg = `${user} says ${msg}`;
            console.log(encodedMsg);
        });


        connection.on("messageReceived", messageReceived);

        // 连接到Hub
        connection.start().catch(function (err) {
            console.error(err.toString());
        });

        // 发送消息到Hub的函数
        function sendMessage() {
            var user = document.getElementById('userInput').value;
            var message = document.getElementById('messageInput').value;
            connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
        }
    </script>
</head>
<body>
    <h1>SignalR Chat</h1>
    <div id="messages"></div>
    <input type="text" id="userInput" placeholder="Your name" />
    <input type="text" id="messageInput" placeholder="Type a message" />
    <button onclick="sendMessage()">Send</button>
</body>
</html>
```