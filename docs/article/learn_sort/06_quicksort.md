# **快速排序** | 十大排序
 

快速排序使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）。

快速排序又是一种分而治之思想在排序算法上的典型应用。本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。

### 思路

通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据要小，然后在按此方法对这两部分数据分别进行快速排序，整个过程可以递归进行，以此达到整个数据变成有序序列。

1. 找到一个基准点pivot，随意一个数，就第一个数
2. 然后分别从数组两端扫描数据，设置两个起始标识，left指起始位置，right指末尾
3. 从右往左扫描，如果扫描到的值大于pivot就让right-1，如果发现有元素小于pivot，就将right位置的值赋值给left位置，然后left+1
4. 从左往右扫描，如果扫描到的值小于pivot就让left+1，如果发现有元素大于pivot，就将left位置的值赋值给right位置，然后right-1
5. 直到left>=right，退出扫描，此时left的下标就是基准点pivot的下标
6. 然后把基准点赋值给array[left]，现在的数组，array[left]前面的数都比它小，array[left]后面的数都比它大
7. 递归快速排序，用最终的基准点下标改变参数，对左半边递归和对右半边递归，循环执行1~6步
8. 最终递归完毕得到一个有序数组

### 图解

![](/blog/quickSort.gif)

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
            QuickSort(arr,0,arr.Length-1);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        /// <summary>
        /// 快速排序
        /// </summary>
        /// <param name="array">待排序的数组</param>
        /// <param name="left">左边的指针，起始0</param>
        /// <param name="right">右边的指针，起始array.Length-1</param>
        static void QuickSort(int[] array, int left, int right)
        {
            int dp;
            if (left < right)
            {
                dp = Partition(array, left, right);
                //又递归快速排序，左半边，left=0，dp=中间的基准点下标，所以这个就是左半边，因为dp的位置是确定的，就不包括dp，这是左半边，就是-1
                QuickSort(array, left, dp - 1);
                //递归快速排序，右半边，中间基准点到array.Length-1的位置，+1如上原因
                QuickSort(array, dp + 1, right);
            }
        }

        static int Partition(int[] array, int left, int right)
        {
            //记录基准点，从这个pivot开始分隔数据，左边的比pivot小，右边的比pivot大，默认基准点放在第一个数上
            int pivot = array[left];
            //在左指针比右指针小的情况下在不断的扫描
            //否则left>=right,就说明基准点就放在left的这个位置
            while (left < right)
            {
                //这是从右边向左扫描，直到找出一个数array[right]<pivot，找到了在基准点左边的数，就退出循环，不然right一直递减的扫描
                while (left < right && array[right] >= pivot)
                    right--;
                if (left < right)
                    array[left++] = array[right];//找到比基准点小的数以后，和left指针换一个位置，然后left++，因为left这个位置已经是换过来的，就没啥意义了，从left的下一个数开始

                //这是从左边向右边扫描，同上一个while
                while (left < right && array[left] <= pivot)
                    left++;
                if (left < right)
                    array[right--] = array[left];//同上
            }
            array[left] = pivot;//退出循环就是说明left>=right,把基准点放在这个位置上
            return left;//这时候的left就是中间的基准点下标了
        }
    }
}

```





