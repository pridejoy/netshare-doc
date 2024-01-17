再也不用写请求HttpHelper了，快来试试HttpClient


## 前言

在C#7.1之后,net推出HttpClient类代替WebRequest, HttpWebRequest, ServicePoint, and WebClient ，先来看下他们在以前的作用

- HttpWebRequest和HttpWebResponse类是用于发送和接收HTTP数据的一种方式
-  ServicePoint提供 HTTP 连接的连接管理
-  WebClient 提供用于将数据发送到由 URI 标识的资源及从这样的资源接收数据的常用方法

相信大家都使用过http的帮助类，来帮助我们处理请求客户端。C#7.1版本推出 `HttpClient` ，现在有了HttpClient，完全可以不再使用帮助类了，HttpClient使用起来更方便，甚至你连请求方法是Post，Put,Get都不用写，功能十分强大。
![](https://oss.hunji.xyz/blogoss/202310/4f946dcb85224b5d95d09eb1c5f684c4.png)
WebRequest, HttpWebRequest, ServicePoint, and WebClient  已经过时，请使用 `HttpClient` 

![](https://oss.hunji.xyz/blogoss/202310/fcd9078bb187497c8d9e87e9ebbe7af7.png)
## 使用（异步请求，下载等）
### 属性
![](https://oss.hunji.xyz/blogoss/202310/467ed7b9ee9c43bf8fbba152d8833c2d.png)
### 方法

#### GetAsync(String)以异步操作将 GET 请求发送给指定 URI。
普通的get请求获取请求消息 返回的`HttpResponseMessage`包含所有的响应信息，比如说状态码，响应的消息头，相应的json等都可以用这个来处理


#### GetByteArrayAsync(String)将 GET 请求发送到指定 URI 并在异步操作中以字节数组的形式返回响应正文

```csharp
using (var webClient = new System.Net.Http.HttpClient())
{
var bytes = await webClient.GetByteArrayAsync(vodeourl.VideoUrl);
 //var fileStream = new FileStream($"{videoid}.mp4", FileMode.Create, FileAccess.Write);
 //fileStream.Write(stream, 0, stream.Length);
 //fileStream.Dispose();
 }
```

 ## 添加cookies
```
var handler = new HttpClientHandler();
var cookieContainer = new CookieContainer();
cookieContainer.Add(new Uri(url), new Cookie("cookie_name", "cookie_value"));
handler.CookieContainer = cookieContainer;
using(var webClient = new System.Net.Http.HttpClient(handler))
{
    webClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0");
    webClient.DefaultRequestHeaders.Add("Connection", "Keep-Alive");
    webClient.DefaultRequestHeaders.Add("Keep-Alive", "timeout=600");
    var aa = webClient.GetStringAsync(url).Result;
    return aa.ToString();
    //await Console.Out.WriteLineAsync(str);
    //var fileStream = new FileStream($"{videoid}.mp4", FileMode.Create, FileAccess.Write);
    //fileStream.Write(stream, 0, stream.Length);
    //fileStream.Dispose();
}
```


## 请求Json格式 或者 通过Post请求数据： application/x-www-form-urlencoded
```
var httpClient = new HttpClient();
var url = "http://192.168.0.9:9000/Demo/PostUrlCode";
var response = await httpClient.PostAsync(url, new FormUrlEncodedContent(new List<KeyValuePair<string, string>>()
{
    new KeyValuePair<string, string>("name","小明"),
    new KeyValuePair<string, string>("age","20")
}));
var str = await response.Content.ReadAsStringAsync();
```

## 上传文件
```
using (HttpClient client = new HttpClient())
{
    var content = new MultipartFormDataContent();
    //添加字符串参数，参数名为qq
    content.Add(new StringContent("123456"), "qq");
 
    string path = Path.Combine(System.Environment.CurrentDirectory, "1.png");
    //添加文件参数，参数名为files，文件名为123.png
    content.Add(new ByteArrayContent(System.IO.File.ReadAllBytes(path)), "file", "123.png");
 
    var requestUri = "http://192.168.1.108:56852/api/Test/SaveFile";
    var result = client.PostAsync(requestUri, content).Result.Content.ReadAsStringAsync().Result;
 
    Console.WriteLine(result);
}
```
### 请求超时

```
var httpClient = new HttpClient();
httpClient.Timeout = TimeSpan.FromSeconds(10); // 设置超时时间为10秒

var url = "xxxxxxxxxx";
List<KeyValuePair<string, string>> fromdic = dic.ToList();
var sign = Tool.Sign(dic, key);
fromdic.Add(new KeyValuePair<string, string>("sign", sign));

CancellationTokenSource cts = new CancellationTokenSource();
cts.CancelAfter(TimeSpan.FromSeconds(10)); // 设置取消请求的时间为10秒
```


#### 推荐阅读
- [开源项目MiniWord .NET Word-Word操作](https://mp.weixin.qq.com/s/-_aVbQjFft63EwLkJdzuEQ)
- [博客系统必备-Moonglade Blog](https://mp.weixin.qq.com/s/wfcYZLPok8VnTK4fwDMp_A)
- [C#编写的一款电子桌面宠物-Candy](https://mp.weixin.qq.com/s/51djCV3_u7qIqDuomA8_qw)
- [ShellProgressBar控制台中漂亮的显示进度条](https://mp.weixin.qq.com/s/dY-4svHo5yJ03EDs0ZWGtg)
- [控制台必备神器-AnsiConsole](https://mp.weixin.qq.com/s/FBDJKIOVR6swXBAYUwd7cg)
 - [WPFUI_直观的设计主题导航和新的沉浸式控件](https://mp.weixin.qq.com/s/D-jvb3CNSYVw11j59fji_g)
 - [一款的 WPF 主题和控件包，免费开源](https://mp.weixin.qq.com/s/5zCfz2XyLi4NeJM9HQf8Ow)
- [Net开源项目-一款电子邮件神奇](https://mp.weixin.qq.com/s/sH9vviKLf-C0GAfb1ilI5Q)
- [NET 7 + Vue.js 的前后端分离的通用后台管理系统框架](https://mp.weixin.qq.com/s/mM8de7hnjq24H20ifjsm4g)


欢迎关注我的公众号“**Net分享**”，技术文章第一时间推送，随缘更新 , 分享一些你可能注意不到的细节。

<center>
    <img src="https://oss.hunji.xyz/blogoss/202310/1920368-20221018151428175-1348767064.jpg" style="width: 140px;">   
</center>
