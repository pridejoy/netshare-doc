# **归并排序** | 十大排序

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

### 思路

1. 使用递归
2. 每次递归都把整个序列分成两份，获得这次分解的范围，left索引到right索引，还要获得这个返回的中间索引mid
3. 分解完成后从栈顶开始合并分解最小的基本单元
4. 在合并的过程中定义两个指针，i和j，i指左边部分的开始索引，mid指的是中间索引，j指右边部分的开始索引，mid+1
5. 左边，右边两个部分独立都是有序的序列，如果左边i元素＜右边j元素，就把i元素放入temp中，左边指针后移，反之，如果右边j元素<左边i元素，就把j元素放入temp中，右边指针后移
6. 当其中一边的数据全部放入temp中，就把另一边的剩余数据顺序的放入temp中
7. 最后在把temp中的数据拷贝到原数组的left到right这一段的位置
8. 如上递归完成

### 图解
 
![](/blog/mergeSort.gif)

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
            int[] temp = new int[arr.Length];//归并排序需要一个额外的空间开销
            MergeSort(arr, 0, arr.Length - 1, temp);
            foreach(int a in arr)
            {
                Console.Write(a+" ");
            }
        }

        static void MergeSort(int[] array,int left,int right,int[] temp)
        {
            if (left < right)
            {
                int mid = (left + right) / 2;//中间的索引
                //向左递归进行分解
                MergeSort(array, left, mid, temp);
                //向右递归进行分解
                MergeSort(array, mid + 1, right, temp);
                //合并
                //最后一次分解是在栈顶，合并就是栈顶传入的数据
                merge(array, left, mid, right, temp);
            }
        }


        /// <summary>
        /// 合并的方法
        /// </summary>
        /// <param name="array">排序的原始数组</param>
        /// <param name="left">左边有序序列的初始索引</param>
        /// <param name="mid">中间索引</param>
        /// <param name="right">右边索引</param>
        /// <param name="temp">做中转的数组</param>
        static void merge(int[] array,int left,int mid,int right,int[] temp)
        {
            int i = left;//左边有序序列的初始索引
            int j = mid + 1;//右边有序序列的初始索引
            int t = 0;//temp数组的当前索引


            /*(一)
            先把左右两边有序的数据，按规则填充到temp数组里面
            知道左右两边的有序序列，有一边处理完毕为止*/
            while (i <= mid && j <= right)
            {
                if (array[i] <= array[j])//如果左边的数小于等于右边的数，就把左边的数放在temp当前的位置，然后i和t都往后移 
                    temp[t++] = array[i++];
                else//反之，如上
                    temp[t++] = array[j++];
            }

            /*(二)
            把有剩余数据的一边的数据依次全部填充到temp*/
            while (i <= mid)//左边的有序数列还有剩余元素，就全部填充到temp
                temp[t++] = array[i++];
            while (j <= right)//反之，同上
                temp[t++] = array[j++];

            /*(三)
            将temp数组的元素拷贝到arr*/
            //拷贝到的array的具体位置，就是left到right中间这一段
            t = 0;
            while (left <= right)
                array[left++] = temp[t++];
        }
    }
}

```
