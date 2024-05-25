# **基数排序** | 十大排序
桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。为了使桶排序更加高效，我们需要做到这两点：

在额外空间充足的情况下，尽量增大桶的数量
使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中

### 思路


### 图解



### 代码

```
using System;

class Program
{
    static void Main()
    {
        int[] arr = { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
        Console.WriteLine("Original array:");
        PrintArray(arr);

        Console.WriteLine("\nSorted array:");
        BucketSort(arr);

        PrintArray(arr);
    }

    static void BucketSort(int[] arr)
    {
        int n = arr.Length;
        int[] bucket = new int[n];

        // 将数组元素分配到各个桶中
        for (int i = 0; i < n; i++)
        {
            int bucketIndex = arr[i] / 10; // 假设元素在 0 到 100 之间
            if (bucketIndex == n)
                bucketIndex = n - 1;
            if (bucket[bucketIndex] == null)
                bucket[bucketIndex] = new int[1] { arr[i] };
            else
            {
                Array.Resize(ref bucket[bucketIndex], bucket[bucketIndex].Length + 1);
                bucket[bucketIndex][bucket[bucketIndex].Length - 1] = arr[i];
            }
        }

        int index = 0;
        for (int i = 0; i < n; i++)
        {
            if (bucket[i] != null)
            {
                InsertionSort(bucket[i]); // 对每个桶进行插入排序
                for (int j = 0; j < bucket[i].Length; j++)
                {
                    arr[index++] = bucket[i][j];
                }
            }
        }
    }

    static void InsertionSort(int[] arr)
    {
        for (int i = 1; i < arr.Length; i++)
        {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    static void PrintArray(int[] arr)
    {
        foreach (int i in arr)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
    }
}
```