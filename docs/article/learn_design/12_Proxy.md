# 代理模式（Proxy Pattern）

代理模式（Proxy Pattern）是一种结构型设计模式，它允许通过代理对象控制对其它对象的访问。代理模式在访问对象时引入了一定程度的间接性，可以用于实现对象的延迟加载、访问控制、增强对象功能等。

### 关键点

1. **代理接口（Subject）**：定义了真实对象和代理对象的共同接口，这样代理对象可以替代真实对象。
2. **真实对象（RealSubject）**：实现了代理接口，是被代理的真正对象。
3. **代理对象（Proxy）**：实现了代理接口，并且包含对真实对象的引用，可以控制对真实对象的访问。
4. **客户端（Client）**：通过代理对象访问真实对象，无需直接访问真实对象。

### 示例

假设我们有一个简单的图片查看器程序，可以从磁盘加载图片并显示。我们可以使用代理模式来实现延迟加载图片的功能。

### 1. 定义代理接口

```csharp
// 代理接口
public interface IImage
{
    void Display();
}
```

### 2. 实现真实对象

```csharp
// 真实对象 - 图片
public class RealImage : IImage
{
    private string filename;

    public RealImage(string filename)
    {
        this.filename = filename;
        LoadFromDisk();
    }

    public void Display()
    {
        Console.WriteLine($"Displaying image: {filename}");
    }

    private void LoadFromDisk()
    {
        Console.WriteLine($"Loading image: {filename}");
    }
}
```

### 3. 创建代理对象

```csharp
// 代理对象 - 图片代理
public class ImageProxy : IImage
{
    private RealImage realImage;
    private string filename;

    public ImageProxy(string filename)
    {
        this.filename = filename;
    }

    public void Display()
    {
        if (realImage == null)
        {
            realImage = new RealImage(filename);
        }
        realImage.Display();
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        IImage image1 = new ImageProxy("image1.jpg");
        IImage image2 = new ImageProxy("image2.jpg");

        // 图片1将在第一次显示时加载
        image1.Display();
        // 图片2将在第一次显示时加载
        image2.Display();
        // 图片1已加载，直接显示
        image1.Display();
    }
}
```

### 解释

1. **代理接口（IImage）**：定义了图片显示的接口。
2. **真实对象（RealImage）**：实现了图片显示的真实功能，包括从磁盘加载图片和显示图片。
3. **代理对象（ImageProxy）**：实现了图片显示的代理功能，延迟加载图片，直到需要显示时才创建真实对象。
4. **客户端代码**：通过代理对象访问图片，实现了延迟加载和控制访问真实对象的目的。

### 优点

- **远程代理**：可以通过代理对象控制对远程对象的访问。
- **虚拟代理**：可以在需要时才创建真实对象。
- **保护代理**：可以控制对真实对象的访问权限。
- **增强功能**：可以在真实对象的基础上增加额外的功能。

### 缺点

- **增加复杂性**：引入了额外的代理对象，可能会增加系统的复杂性。
- **性能损失**：在某些情况下，代理模式可能会引入额外的开销，如延迟加载时的首次访问延迟。

### 适用场景

- **远程代理**：当需要在不同地址空间中代表对象时，可以使用远程代理。
- **虚拟代理**：当需要根据需要创建开销较大的对象时，可以使用虚拟代理。
- **保护代理**：当需要控制对对象的访问权限时，可以使用保护代理。
- **增强功能**：当需要为对象提供额外的功能时，可以使用代理模式实现增强。

### 示例的现实应用

在现实应用中，代理模式有多种应用场景：

- **网络代理**：用于控制对网络资源的访问，如 HTTP 代理服务器。
- **安全代理**：用于控制对敏感资源的访问权限。
- **缓存代理**：用于缓存对象，减少访问时间。
- **日志记录代理**：用于在访问对象时添加日志记录。
- **延迟初始化代理**：用于延迟加载对象，提高系统性能。
