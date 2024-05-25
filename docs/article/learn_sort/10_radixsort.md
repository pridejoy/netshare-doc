# **基数排序** | 十大排序

基数排序可以看成是桶排序的扩展，以整数排序为例，主要思想是将整数按位数划分，准备 10 个桶，代表 0 - 9，根据整数个位数字的数值将元素放入对应的桶中，之后按照输入赋值到原序列中，依次对十位、百位等进行同样的操作，最终就完成了排序的操作。
基数排序是经典的空间换时间的方法。
基数排序最好不要排序负数，如果有负数，需要改进优化代码，小数也要优化。

### 思路

1. 建立10个数组，每个数组里面又是 一个数组（桶），就是一个二维数组
2. 遍历这批数据，获取每个数字的个位数，根据个位数把，这个数字分类的放在对应的桶中
3. 用一个数组记录每个桶中的数据量
4. 遍历这些桶，有数据的桶，按照顺序取出赋值到原始数组
5. 循环2-4，这次取十位数，下次百位数.......直到所有数中的最高位

### 图解


![](/blog/radixSort.gif)

### 代码

```
using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    class Program
    {

        static void Main(string[] args)
        {
            int[] arr = new int[10] { 4, 9, 76, 43, 2, 7, 23, 54, 1, 44 };
            RadixSort(arr);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        //基数排序
        static void RadixSort(int[] array)
        {
            //先得到最大数的数
            int max = array[0];
            for(int i = 1; i < array.Length; i++)
                if (array[i] > max)
                    max = array[i];
            
            int maxlength = max.ToString().Length;//得到最大数的长度
            int[,] bucket = new int[10, array.Length];//定义一个二维数组，表示10个桶，每个桶就是一个一位数组
            int[] bucketNumCount = new int[10];//为了记录每个桶中，实际存放了多少个数据，定义一个数组各个桶每次放入数据的个数


            //有几位数就大循环几次，n是配合取对应位数的值，1个位，10十位，100百位.....
            for (int i = 0,n = 1; i < maxlength; i++,n*=10)
            {
                //针对每个元素对应的位进行排序处理，第一次是各位，第二次是十位......
                for (int j = 0; j < array.Length; j++)
                {
                    int ge = array[j]/ n % 10;//取出元素对应位的值
                    bucket[ge, bucketNumCount[ge]] = array[j];//放进对应的桶里面，在桶里面的哪个位置，默认位子都是0
                    bucketNumCount[ge]++;//对应桶里面的数量增加
                }

                //按照桶的顺序，依次将数据放入原数组
                int index = 0;//用来指向原数组的索引
                for (int k = 0; k < bucketNumCount.Length; k++)//遍历每一个桶，并将桶中的数据放入到原数组中
                {
                    //如果桶中有数据，我们才放到原数组
                    if (bucketNumCount[k] != 0)
                        for (int t = 0; t < bucketNumCount[k]; t++)//循环该桶放入数据
                            array[index++] = bucket[k, t];//第k个桶的第t个数据放入到原数组的第index个位置，然后index后移
                    bucketNumCount[k] = 0;//遍历了k桶，就要把k桶的数据清0，以便于下次使用
                }
            }
        }
    }
}

```