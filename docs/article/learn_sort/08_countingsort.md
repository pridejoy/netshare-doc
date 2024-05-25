# **计数排序** | 十大排序
计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。

### 思路


### 图解

![](/blog/countingSort.gif)

### 代码

```
// 使用计数排序对输入数组进行排序
public static void CountSort(int[] arr) {
   // 查找数组中的最大值和最小值
   int max = arr[0];
   int min = arr[0];

   // 遍历数组以找到最大和最小值
   for(int i = 0; i < arr.Length; i++) {
      // 更新最大值
      if (arr[i] > max)  {
         max = arr[i];
      }

      // 更新最小值
      if (arr[i] < min) {
         min = arr[i];
      }
   }

   // 创建计数数组，长度为最大值和最小值之差加1
   int[] count = new int[max - min + 1];

   // 遍历数组并在计数数组中对应位置增加计数
   for(int i = 0; i < arr.Length; i++) {
         count[arr[i] - min]++;
   }

   // 重新排列原始数组
   int index = 0;
   for(int i = 0; i < count.Length; i++) {
      // 根据计数数组中的计数，将元素回写到原始数组中
      while (count[i]-- > 0) {
         arr[index++] = i + min;
      }
   }
}
```
