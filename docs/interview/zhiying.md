
# zy面试题

### 题目1

1、电商产品有颜色(红、蓝、黑)、尺寸(S、M、L)等变体信息，买家购买一个红色中码的商品对应的变体名为：红_M。那么给定一组变体信息，用程序生成所有变体组合数据。

变体示例：Color: Red,Green Size: S,M Style: A

变体组合结果：Red_S_A; Red_M_A; Green_S_A; Green_M_A

```
//测试用例 
var list = new List<string[]>{
 new string[]{"Red","Green"},
 new string[]{"S","M"},
 new string[]{"A"}
};
var result = Combine(list);
//期望result为：Red_S_A; Red_M_A; Green_S_A; Green_M_A
public List<string> Combine(List<string[]> list){ … }
```

::: details 解答

```csharp
public static List<string> Combine(List<string[]> list)
{
    List<string> result = new List<string>();
    int[] indices = new int[list.Count]; // 用于跟踪每个字符串数组中当前选取的元素的索引

    while (true)
    {
        string combined = "";
        for (int i = 0; i < list.Count; i++)
        {
            combined += "_" + list[i][indices[i]]; // 将当前索引对应的元素添加到组合中
        }
        result.Add(combined); // 将组合添加到结果列表中

        // 更新索引
        int j = list.Count - 1;
        while (j >= 0 && indices[j] == list[j].Length - 1)
        {
            indices[j] = 0;
            j--;
        }

        // 检查是否所有索引都已经达到最大值
        if (j < 0)
        {
            break;
        }

        indices[j]++; // 增加索引
    }

    return result;
}

```

方式2

```csharp
public static List<string> Combine(List<string[]> list, int index = 0, string prefix = "")
{
    List<string> result = new List<string>();
    if (index < list.Count)
    {
        foreach (var option in list[index])
        {
            var newPrefix = prefix + "_" + option;
            result.AddRange(Combine(list, index + 1, newPrefix));
        }
    }
    else
    {
        result.Add(prefix.Trim('_'));
    }
    return result;
}

```

:::

### 题目2

 2、内部系统的产品库中有一个产品拥有三个维度的变体，分别是：Color、Size 和 Style。现在要将其上传到平台 A，但平台 A 仅支持两个维度的变体，因此需要对变体进行降维。那么给定一组变体信息，用程序实现变体降维操作。

变体示例: Color: Red,Green Size: S,M Style: A,B

降维后:Color: Red,Green Size: S_A,S_B,M_A,M_B

```csharp
var pair = new Dictionary<string, List<string>> {
 {"Color",new List<string>{ "Red","Green" }},
 {"Size",new List<string>{ "S","M" }},
 {"Style",new List<string>{ "A","B" }},
};
var result = Reduce(pair);

public Dictionary<string, List<string>> Reduce(Dictionary<string, List<string>> pair){...}
```

::: details 解答
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // 定义变体维度
        string[] colors = { "Red", "Green" };
        string[] sizes = { "S", "M" };
        string[] styles = { "A", "B" };

        // 降维操作
        Dictionary<string, string[]> reducedDimensions = ReduceDimensions(colors, sizes, styles);
        
        // 打印降维后的变体
        Console.WriteLine("Color: " + string.Join(",", reducedDimensions["Color"]));
        Console.WriteLine("Size: " + string.Join(",", reducedDimensions["Size"]));
    }

    static Dictionary<string, string[]> ReduceDimensions(string[] colors, string[] sizes, string[] styles)
    {
        var reduced = new Dictionary<string, string[]>
        {
            { "Color", colors },
            { "Size", sizes.SelectMany(size => styles.Select(style => size + "_" + style)).ToArray() }
        };

        return reduced;
    }
}
:::

### 题目3

3、在向电商平台上传产品时，一般使用异步上传。数据库中会保存所有的待上传信息，并由后台任务执行上传操作。已有的任务表设计如下：

| 列名         | 类型      | 必填   | 备注           |
| ------------ | --------- | ------ | -------------- |
| id           | int       | 已勾选 | 自增任务编号   |
| create_time  | datetime  | 已勾选 | 创建时间       |
| userid       | int       | 已勾选 | 用户编号       |
| productid    | int       | 已勾选 | 产品编号       |

请对该表进行补充，以实现以下内容：

- 1.任务排队执行。
::: details 解答
为了实现任务排队和支持并发上传，我们需要添加一些字段来控制任务的状态和并发：
| 列名          | 类型      | 必填   | 备注                    |
| ------------- | --------- | ------ | ----------------------- |
| status        | varchar   | 已勾选 | 任务状态，如：待处理、处理中、已完成、失败 |
| attempt_count | int       | 已勾选 | 重试次数，初始为0       |
| concurrency   | int       |        | 并发控制，标识当前任务可以由哪个实例处理 |

- **status**：用于跟踪任务的当前状态。
- **attempt_count**：用于记录任务已经重试的次数。
- **concurrency**：可以用于实现锁或者信号量机制，确保任务不会被多个实例同时处理。

:::

- 2.支持并发上传。可以通过增加任务机实例的方式提升上传速度。
::: details 解答
为了确保任务不会被多个任务机同时执行，可以使用乐观锁或者悲观锁机制：

| 列名          | 类型      | 必填   | 备注                    |
| ------------- | --------- | ------ | ----------------------- |
| version       | int       |        | 乐观锁版本号           |

- **version**：每次任务更新时版本号增加，用于检测在任务处理期间是否发生了冲突。

:::

- 3.任务不会同时被多个任务机执行。
::: details 解答
为了实现超时和异常重试，我们需要记录任务的开始时间和最后更新时间：
| 列名          | 类型      | 必填   | 备注                    |
| ------------- | --------- | ------ | ----------------------- |
| start_time    | datetime  |        | 任务开始执行时间       |
| last_updated  | datetime  |        | 最后更新时间，用于超时检测 |

- **start_time**：记录任务开始执行的时间。
- **last_updated**：每次任务执行时更新，用于检测任务是否超时。

:::

- 4.任务执行时间超过 15 分钟，或者执行异常时，要放回任务表继续重试。
::: details 解答
可以通过增加一个重试时间和最大尝试次数的字段来控制重试机制：
| 列名          | 类型      | 必填   | 备注                    |
| ------------- | --------- | ------ | ----------------------- |
| next_retry    | datetime  |        | 下次重试时间           |
| max_attempts  | int       |        | 最大尝试次数           |

- **next_retry**：根据重试间隔和尝试次数计算的下次重试时间。
- **max_attempts**：设置最大尝试次数，超过该次数后不再重试。

:::

- 5.重试间隔 5 分钟，最多重试三次。
::: details 解答
:::

### 题目4

4、随着用户量的增多，渐渐出现了若干“头部用户”，这些头部用户的上传量占到系统总量的 80% 。
有客户反应上传很慢，要等很久才能上传完成。经排查是因为这些“头部用户”的上传任务积压过多造成的。
请在上一步骤的设计表上再进行扩充或创建新的表以实现以下功能：

- 4.1 在排队执行时要关注用户编号

::: details 解答
为了在排队时考虑用户编号，我们可以引入优先级队列的概念，根据用户编号对任务进行排序：

- **引入优先级列**：在任务表中增加一个优先级列，可以基于用户编号或其他业务规则来设置。
- **优先级列（Priority）**：int类型，数值越小优先级越高，可以根据用户的历史表现或重要性来动态调整。

| 列名          | 类型    | 必填   | 备注          |
| ------------- | ------- | ------ | ------------- |
| priority      | int     | 已勾选 | 任务优先级    |

  后台任务调度器可以根据优先级列来决定任务的执行顺序。
:::

- 4.2 如果任务涉及多个用户，不能让单个用户占用全部上传资源

::: details 解答
为了避免单个用户占用全部上传资源，我们可以引入资源配额管理：

- **用户配额表**：创建一个新表来管理每个用户的上传配额。

| 表名          | 列名          | 类型    | 必填   | 备注          |
| ------------- | ------------- | ------- | ------ | ------------- |
| UserQuota     | userid        | int     | 已勾选 | 用户编号      |
| quota         | int           | 已勾选 | 用户允许的最大并发任务数 |
| used           | int           | 已勾选 | 当前已使用的并发任务数 |

- **并发控制逻辑**：在任务执行前，检查用户配额表中的`used`字段，确保不超过`quota`。
- **任务完成时**：更新用户配额表，减少`used`字段。
:::

- 4.3 如果任务仅对应一个用户，则可以让其利用全部上传资源

::: details 解答
对于只涉及单个用户的任务，我们允许其利用全部可用的上传资源：

- **单用户任务标识**：在任务表中增加一个标识，用于区分任务是否仅涉及单个用户。

| 列名          | 类型    | 必填   | 备注          |
| ------------- | ------- | ------ | ------------- |
| single_user   | bit     |        | 是否为单个用户的任务，0为否，1为是 |

- **资源分配逻辑**：如果是单个用户的任务（`single_user`为1），则允许其使用用户配额表中定义的全部配额。
- **并发任务数**：对于单个用户的任务，`used`字段可以等于`quota`，即用户可以利用全部资源。
:::
