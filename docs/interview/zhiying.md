
## zy面试题

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
解答

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
- 2.支持并发上传。可以通过增加任务机实例的方式提升上传速度。
- 3.任务不会同时被多个任务机执行。
- 4.任务执行时间超过 15 分钟，或者执行异常时，要放回任务表继续重试。
- 5.重试间隔 5 分钟，最多重试三次。

### 题目4
4、随着用户量的增多，渐渐出现了若干“头部用户”，这些头部用户的上传量占到系统总量的 80% 。
有客户反应上传很慢，要等很久才能上传完成。经排查是因为这些“头部用户”的上传任务积压过多造成的。
请在上一步骤的设计表上再进行扩充或创建新的表以实现以下功能：

- 1.在排队执行时要关注用户编号。
- 2.如果任务涉及多个用户，不能让单个用户占用全部上传资源。
- 3.如果任务仅对应一个用户，则可以让其利用全部上传资源。