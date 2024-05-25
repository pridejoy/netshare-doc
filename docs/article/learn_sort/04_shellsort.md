# **希尔排序** | 十大排序

希尔排序也是插入排序，它是简单插入排序经过改进后的一个更高效的版本，也称为缩小增量排序。

### 思路

希尔排序是把数据按下标的一定增量分组，对每一使用直接插入排序算法排序，随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个数据集恰好被分成一组，算法便终止。
就是先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

### 图解

![](/blog/Sorting_shellsort_anim.gif) 

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
            ShellSort(arr);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        //希尔排序移位法
        static void ShellSort(int[] array)
        {
            /*
             gap是用来分组的，对半分组,希尔排序的效率和gap有关，这里数学问题，就用常用的array.Length/2就行了
             */
            for(int gap = array.Length / 2; gap > 0; gap /= 2)
            {
                //从第gap个元素，逐个对其所在的组进行直接插入排序
                for (int i = gap; i < array.Length; i++)
                {
                    int j = i;//当前待插入的索引
                    int temp = array[j];//当前待插入的数

                    //j-gap是j组内的另外的数，一组中数与数之间相隔gap-1个数，是这么分组的
                    //如：[3,6,8,4],gap为2，分两组，3和8一组，6和4一组
                    //如果当前的temp这个数小于这组前面的一个数，就进入while循环移动位置，这里参考插入排序
                    while (j - gap >= 0 && temp < array[j - gap])
                    {
                        //移动
                        array[j] = array[j - gap];
                        j -= gap;
                    }
                    //退出while后就给temp找到了插入的位置
                    array[j] = temp;
                }
            }
        }
    }
}
```
