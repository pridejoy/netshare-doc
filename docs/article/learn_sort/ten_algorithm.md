# 排序

所有代码来自 互联网 如有侵权删

https://www.runoob.com/w3cnote/ten-sorting-algorithm.html

## 冒泡排序

### 思路

通过对待排序的序列从前向后（就是从下标较小的元素开始），依次比较相邻元素的值，若发现逆序就交换。使值较大或者较小的元素不断的往后移，就像水底冒泡一样逐渐往上冒泡。

1. 一共进行数据数量-1次外层循环
2. 每一趟排序的次数在逐渐的减小
3. 如果发现在某趟排序中，没有发生一次交换，可以提前结束冒泡排序

### 图解

![](https://images.weserv.nl/?url=https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307150802117-1160263142.gif)

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



## 选择排序

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

![选择排序](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307152106063-1857496097.gif)

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



## **插入排序**

### 思路

 把n个待排序的元素看成为一个有序表和一个无序表，开始时有序表中只包含一个元素，无序表中包含n-1个元素，排序过程中，每次从无序表中取出第一个元素，把它依次和有序表元素进行比较，将它插入到有序表中的合适位置，使之成为新的有序表

### 图解

![**插入排序**](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307152257429-1548070324.gif)

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



## **希尔排序**

希尔排序也是插入排序，它是简单插入排序经过改进后的一个更高效的版本，也称为缩小增量排序。

### 思路

希尔排序是把数据按下标的一定增量分组，对每一使用直接插入排序算法排序，随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个数据集恰好被分成一组，算法便终止。
就是先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

### 图解

![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307152852384-1345840040.gif)
![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307152904870-1469407043.png)

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



## **快速排序**



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

![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307153040108-1117966040.gif)

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



## **归并排序**



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

![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307153825769-425983656.gif)
这是归并排序的主要过程，先分解数据成最小的基本单元，然后再逐步的合并
![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307153834370-1749580369.png)
再来看看治阶段，我们需要将两个已经有序的子序列合并成一个有序序列，比如上图中的最后一次合并，要将[4,5,7,8]和[1,2,3,6]两个已经有序的子序列，合并为最终序列[1,2,3,4,5,6,7,8]，来看下实现步骤。
![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307153840861-1065551609.png)

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



## **基数排序**

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

![](https://img2023.cnblogs.com/blog/1920368/202303/1920368-20230307154155409-117951630.png)

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

## **基数排序**


### 思路


### 图解



### 代码

```
```
