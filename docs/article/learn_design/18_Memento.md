# 备忘录模式（Memento Pattern）

备忘录模式（Memento Pattern）是一种行为设计模式，它允许在不暴露对象实现细节的情况下，捕获和恢复对象的内部状态。备忘录模式通常用于需要实现撤销操作或者保存对象历史状态的场景。

### 关键点

1. **发起人（Originator）**：负责创建一个备忘录，用于记录当前时刻的内部状态，并可以使用备忘录恢复内部状态。
2. **备忘录（Memento）**：存储发起人对象的内部状态。备忘录可以有两种接口：窄接口只能由发起人访问，宽接口允许任何对象访问。
3. **管理者（Caretaker）**：负责保存备忘录，但是不能对备忘录的内容进行操作或者检查。

### 示例

假设我们有一个简单的文本编辑器，用户可以编辑文本并且可以撤销操作。我们可以使用备忘录模式来实现撤销功能，允许用户回退到之前的编辑状态。

### 1. 定义备忘录类和发起人类

```csharp
// 备忘录类
public class EditorMemento
{
    private string content;

    public EditorMemento(string content)
    {
        this.content = content;
    }

    public string GetContent()
    {
        return content;
    }
}

// 发起人类
public class TextEditor
{
    private string content;

    public string Content
    {
        get { return content; }
        set { content = value; }
    }

    // 创建备忘录，记录当前状态
    public EditorMemento CreateMemento()
    {
        return new EditorMemento(content);
    }

    // 恢复到某个备忘录记录的状态
    public void Restore(EditorMemento memento)
    {
        content = memento.GetContent();
    }
}
```

### 2. 定义管理者类

```csharp
// 管理者类
public class History
{
    private Stack<EditorMemento> mementos = new Stack<EditorMemento>();

    public void Push(EditorMemento memento)
    {
        mementos.Push(memento);
    }

    public EditorMemento Pop()
    {
        return mementos.Pop();
    }
}
```

### 3. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        TextEditor editor = new TextEditor();
        History history = new History();

        // 编辑文本
        editor.Content = "First draft";
        history.Push(editor.CreateMemento());

        // 编辑文本并保存状态
        editor.Content = "Second draft";
        history.Push(editor.CreateMemento());

        // 编辑文本并保存状态
        editor.Content = "Final draft";

        // 恢复到上一个状态
        editor.Restore(history.Pop());
        Console.WriteLine("Restored to previous draft: " + editor.Content);

        // 恢复到初始状态
        editor.Restore(history.Pop());
        Console.WriteLine("Restored to initial draft: " + editor.Content);
    }
}
```

### 解释

1. **备忘录类（EditorMemento）**：存储发起人类（TextEditor）的内部状态。
2. **发起人类（TextEditor）**：负责创建备忘录和恢复备忘录中记录的状态。
3. **管理者类（History）**：管理备忘录对象，负责保存和恢复备忘录。

### 优点

- **封装性**：备忘录模式将发起人对象状态存储和恢复的实现细节封装起来，使得发起人对象不需要关心状态的保存和恢复。
- **灵活性**：可以保存发起人对象在不同时间点的状态，实现多次撤销操作。
- **简化发起人类**：发起人类不需要管理多个备份的细节，只需要和备忘录对象交互即可。

### 缺点

- **资源消耗**：如果备忘录对象过多或者状态过大，可能会消耗大量的内存。

### 适用场景

- **需要保存和恢复对象状态**：例如编辑器撤销操作、文档编辑历史记录等。
- **需要实现撤销操作**：用户可以在操作后撤销到之前的状态。

### 示例的现实应用

备忘录模式在许多现实场景中都有应用：

- **文本编辑器**：例如 Microsoft Word 中的撤销和重做操作。
- **图形编辑器**：例如 Photoshop 中的历史记录。
- **游戏中的存档**：例如游戏中的保存点功能，允许玩家回到之前的游戏状态。

通过备忘录模式，可以有效地管理和保存对象状态的历史记录，并且提供了一种简单和可靠的方式来实现对象状态的撤销和恢复。
