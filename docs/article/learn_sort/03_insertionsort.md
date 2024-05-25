# **插入排序** | 十大排序

### 思路

 把n个待排序的元素看成为一个有序表和一个无序表，开始时有序表中只包含一个元素，无序表中包含n-1个元素，排序过程中，每次从无序表中取出第一个元素，把它依次和有序表元素进行比较，将它插入到有序表中的合适位置，使之成为新的有序表

### 图解

![**插入排序**](/blog/insertionSort.gif)

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
            InsertSort(arr);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        static void InsertSort(int[] array)
        {
            int current = 0;
            int preindex = 0;
            for (int i = 1; i < array.Length; i++)
            {
                current = array[i];//当前待插入的值
                preindex = i - 1;//从当前待插入的值，往前面递进进行比较，当前带插入的值索引是i，从前面开始索引就是i-1

                /*
                preindex >= 0：确保索引不越界
                array[preindex] > current：如果前一个值大于当前待插入的值，就要进入循环，这是升序
                如果前一个数的值小于当前待插入的值，这不就不用插入了吗
                 */
                while (preindex >= 0&&array[preindex] > current)
                {
                    //因为当前待插入的值已经保存到current里面了，array[i]其实可以看作是一个空位
                    //preindex指针不断的往后移动位置，preindex+1最多占据到i的位置
                    array[preindex + 1] = array[preindex];
                    preindex--;
                }

                //退出循环，执行到了这里说明了什么，找到了要插入的指针位置了
                //array[preindex]已经不大于current了，所以current应该在array[preindex]的后一个位置
                //preindex如果是因为--小于0出的循环，那么就插入到第一个的位置
                array[preindex+1] = current;
            }
        }

    }
}
```
