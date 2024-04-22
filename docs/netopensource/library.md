# 库推荐

> [!WARNING] 
> 善用ctrl+f搜索。有助于快速找到需要的信息

 
## ORM

### SqlSugar
SqlSugar是一个轻量级、快速、方便的ORM（对象关系映射）框架，专门为.NET平台（包括.NET Framework和.NET Core）开发而设计

超强性能，支持多种数据库，支持跨库查询、多库共存、多租户。

- 官网[使用教程]: [SqlSugar](https://www.donet5.com/Home/Doc)



## 压缩解压库
 
使用教程：https://mp.weixin.qq.com/s/ut8XCE4gz8jbngH-IZ-DHA

### DotNetZip

DotNetZip 是一个快速、免费的类库和工具集，用于操作 zip 文件。它提供了创建、提取和更新 zip 文件的功能，并且可以轻松地在 VB、C# 或任何 .NET 语言中使用。 

- 官方 NuGet 包: [DotNetZip](https://www.nuget.org/packages/DotNetZip)

### SharpCompress
SharpCompress 是一个功能强大的 .NET 类库，用于解压缩和解压多种压缩格式的文件。它支持 ZIP、RAR、7z 等格式，并提供了只进读取和文件随机访问的 API。 
- 官方 NuGet 包: [SharpCompress](https://www.nuget.org/packages/SharpCompress)

### SharpZipLib
SharpZipLib 是另一个 .NET 类库，用于处理 ZIP 文件。它提供了读取、创建和更新 ZIP 文件的功能。 
- 官方 NuGet 包: [SharpZipLib](https://www.nuget.org/packages/SharpZipLib)

  
### Compression (System.IO.Compression)
这是微软官方库，提供支持流的压缩和解压缩的类，正确地用于 .NET 应用程序中处理 ZIP 和 GZIP 文件格式。
- 官方 NuGet 包: [System.IO.Compression](https://www.nuget.org/packages/System.IO.Compression)

 

## Excel

### Miniexcel
Miniexcel 是一个简单、高效的 .NET 库，用于处理 Excel 文件的读取、写入和填充数据操作。它提供了避免 OOM（Out of Memory）错误的功能。 

-  NuGet 包: [MiniExcel](https://www.nuget.org/packages/MiniExcel)
- github （使用教程）: [MiniExcel](https://gitee.com/dotnetchina/MiniExcel)  


## Word

### MiniWord
MiniWord 是一个 .NET Word 模板引擎，可以通过 Word 模板和数据快速生成文件。 
- 官方 NuGet 包: [MiniWord](https://www.nuget.org/packages/MiniWord)
- github （使用教程）: [MiniWord](https://gitee.com/dotnetchina/MiniWord)

## PDF

### iTextSharp

iTextSharp 是一个创建、修改、检查和维护 PDF 文档的库，它允许您轻松地添加 PDF 功能到软件项目中。 
- GitHub : [iTextSharp](https://github.com/itext/itext7-dotnet)

### PDFsharp
PDFsharp 是一个使用 .NET 创建和修改 PDF 文档的开源库。 
- 官方 NuGet 包: [PdfSharp](https://www.nuget.org/packages/PdfSharp)
- 使用教程：https://mp.weixin.qq.com/s/SyU31GLNPkeGTliqUHx9Zg

### QuestPDF
QuestPDF 是一个用于轻松生成 PDF 文档、报告、发票和导出等的库。 
- github: [QuestPDF](https://github.com/QuestPDF/QuestPDF)


### DinkToPdf
DinkToPdf 是一个使用 Webkit 引擎将 HTML 页面转换为 PDF 的库。 
- 官方 NuGet 包: [DinkToPdf](https://www.nuget.org/packages/DinkToPdf)

### PdfPig
PdfPig 是一个用于创建简单的 PDF 文档，包含文本和几何形状的库。
- 官方 NuGet 包: [PdfPig](https://www.nuget.org/packages/PdfPig)
- 使用教程：https://github.com/UglyToad/PdfPig

### Aspose.PDF
Aspose.PDF 是一个商业库，允许您处理 PDF 文档、页面、文本、图像、附件、字体、书签、批注、表单、运算符、图章、水印、链接、安全性、签名和打印等功能。 
- 官方 NuGet 包: [Aspose.PDF](https://www.nuget.org/packages/Aspose.PDF)
 


## 二维码,条形码

### QrCodeGenerator 

QrCodeGenerator 二维码生成器的识别。

可在大多数现代 .NET 平台（.NET Core、.NET Framework、Mono 等）上运行，包括所有平台上的 .NET 6。
- 使用教程：https://mp.weixin.qq.com/s/YLpZE3Qp6CtPBvd1YtpjEA
- github：https://github.com/manuelbl/QrCodeGenerator


### ZXing.Net

一个支持在图像中解码和生成条形码（如QR码，PDF 417，EAN，UPC，Aztec，Data Matrix，Codabar）的库。

解码器支持以下条形码： UPC-A、UPC-E、EAN-8、EAN-13、代码 39、代码 93、代码 128、ITF、Codabar、MSI、RSS-14（所有变体）、QR 码、Data Matrix、Aztec 和 PDF-417。 编码器支持以下格式： UPC-A、EAN-8、EAN-13、代码 39、代码 128、ITF、Codabar、Plessey、MSI、QR 码、PDF-417、Aztec、Data Matrix
 
使用教程：https://mp.weixin.qq.com/s/gmPDTzDnHxXdN0RR1A0mJg
- github：https://github.com/micjahn/ZXing.Net
- nuget： https://www.nuget.org/packages/BarCode/


### ThoughtWorks.QRCode

二维码处理库。
- nuget： https://www.nuget.org/packages/ThoughtWorks.QRCode
- 使用教程：https://mp.weixin.qq.com/s/uIvgBvEPHVObuhzYtQLrNw

### QRCoder
创建 QR 码。它与其他库没有任何依赖关系。
- nuget： https://www.nuget.org/packages/QRCoder
- 使用教程：https://mp.weixin.qq.com/s/uIvgBvEPHVObuhzYtQLrNw 

### Spire.Barcode

[商业库] 设计的专业条码库，用于生成、读取和扫描 1D 和 2D 条码。
- nuget： https://www.nuget.org/packages/Spire.Barcode
- 使用教程：https://mp.weixin.qq.com/s/yUxl_iSZZd-fOo6YOkYrng

## 邮件

### NETCore.MailKit
asp.net 核心的 MailKit 扩展。
- github： https://github.com/myloveCc/NETCore.MailKit
- 使用教程：https://mp.weixin.qq.com/s/sH9vviKLf-C0GAfb1ilI5Q

## 图形

### SkiaSharp
基于 Google 的 Skia 图形库。
https://www.nuget.org/packages/SkiaSharp

## 工具库

### Masuit.Tools

 C#万能工具库

全龄段友好的C#.NET万能工具库，轻松上手，这个库包含一些常用的操作类，大都是静态类，加密解密，反射操作，权重随机筛选算法，分布式短id，表达式树，linq扩展，文件压缩，多线程下载，硬件信息，字符串扩展方法，日期时间扩展操作，中国农历，大文件拷贝，图像裁剪，验证码，断点续传，集合扩展、Excel导出等常用封装。

- github: https://github.com/ldqk/Masuit.Tools

### EasyTool
一个开源的 .NET 工具库, 使得开发变得更加有效率
Easytool 是一个功能丰富且易用的 .NET 工具库，旨在帮助开发者快速、便捷地完成各类开发任务。 这些封装的工具涵盖了字符串、数字、集合、编码、日期、文件、IO、加密、JSON、HTTP客户端等一系列操作， 可以满足各种不同的开发需求。

- github: https://github.com/dotnet-easy/easytool

## redis

### CSRedisCore 

CSRedis 是 redis.io 官方推荐库，支持 redis-trib集群、哨兵、私有分区与连接池管理技术，简易 RedisHelper 静态类。

- nuget: https://www.nuget.org/packages/CSRedisCore

### StackExchange.Redis

高性能 Redis 客户端，包含同步和异步使用。
- nuget: https://www.nuget.org/packages/StackExchange.Redis


### ServiceStack.Redis

商业库，C# Redis 客户端，用于世界上最快的分布式 NoSQL 数据存储。

- guthub: https://www.nuget.org/packages/ServiceStack.Redis

## 微信相关的库

 

## 其他库

### Spectre.Console
提供了一种简单但强大的方式来创建美观和交互式的控制台应用程序。

- github: https://spectreconsole.net/
- 使用教程：https://mp.weixin.qq.com/s/FBDJKIOVR6swXBAYUwd7cg

### ShellProgressBar

这是一个很棒的小库，支持netcore，用于可视化长时间运行的命令行任务。

- github: https://github.com/Mpdreamz/shellprogressbar
- 使用教程：https://mp.weixin.qq.com/s/dY-4svHo5yJ03EDs0ZWGtg