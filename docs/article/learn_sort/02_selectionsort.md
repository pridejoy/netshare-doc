
# 选择排序 | 十大排序

### 思路

第一次从Array[0]~Array[n-1]中选取最小或者最大值，与Array[0]交换
第二次从Array[1]~Array[n-1]中选取最小或者最大值，与Array[1]交换
......
第i次从Array[i-1]~Array[n-1]中选取最小或者最大值，与Array[i-1]交换
总共通过n-1次，得到一个有序序列

1. 选择排序一共Array.Length-1轮排序

2. 每一轮排序，又是一个循环比较，找出最大最小值

   a. 先假设当前这个数是最小或者最大数
   b. 然后和后面的数进行比较，如果发现有比当前数更小或者更大的数，就从新确定最小或者最大数，并得到下标
   c. 当遍历到数组最后时，就得到了本轮最小数和下标
   d. 和最前面第一个待排序的数交换

### 图解

![选择排序](/blog/selectionSort.gif)

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
            SelectSort(arr);
            foreach(var a in arr)
            {
                Console.Write(a+" ");
            }
        }

        static void SelectSort(int[] array)
        {
            int temp = 0;//用于交换的临时变量
            for(int i = 0; i < array.Length - 1; i++)
            {
                int minindex = i;//记录最小数的索引
                for (int j = i + 1; j < array.Length; j++)
                {
                    if (array[minindex] > array[j])//如果发现后面有更小的数，就记录下更小的数和他的索引
                    {
                        minindex = j;
                    }
                }
                //这一轮的循环，已经找出了待排序中最小的数，和第一个待排序的交换
                //有可能minindex==i,所以不要用两变量自身运算进行交换
                temp = array[i];
                array[i] = array[minindex];
                array[minindex] = temp;
            }
        }
    }
}

```