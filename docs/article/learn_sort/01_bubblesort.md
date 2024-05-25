# 冒泡排序 | 十大排序

### 思路

通过对待排序的序列从前向后（就是从下标较小的元素开始），依次比较相邻元素的值，若发现逆序就交换。使值较大或者较小的元素不断的往后移，就像水底冒泡一样逐渐往上冒泡。

1. 一共进行数据数量-1次外层循环
2. 每一趟排序的次数在逐渐的减小
3. 如果发现在某趟排序中，没有发生一次交换，可以提前结束冒泡排序

### 图解

![](/blog/bubbleSort.gif)

### 代码实现

```c#
using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = new int[10] { 4, 9, 76, 43, 2, 7, 23, 54, 1, 44 };
            BubbleSort(arr);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        static void BubbleSort(int[] array)
        {
            bool flag;//这是优化，如果发现一轮比较没有交换过数据，就直接结束，已经排好了

            //第一个层循环是逐个去和后面的对比的次数
            //-1：一共就5个数，我确认了4个数的位置，把4个数都排在了后面，还有一个数没必要吧
            for(int i = 0; i < array.Length - 1; i++)
            {
                flag = false;
                //第二层循环才是每个数比较的次数
                //-i：比较次数都会越来越少，因为一次排序就会把一个确定的数放在最后，这个数都确定排最后了，也不用比较它了,所以-i，排了几个数，就少比较几个数
                for (int j = 0; j < array.Length - 1 - i; j++)
                {
                    if (array[j] > array[j + 1])//如果前面的数比后面的数大，则交换，目的是把大的数放在后面
                    {
                        flag = true;
                        //交换两个数
                        array[j] += array[j + 1];
                        array[j + 1] = array[j] - array[j + 1];
                        array[j] -= array[j + 1];
                    }
                }
                if (!flag)
                    break;
            }

        }

    }
}
 

```