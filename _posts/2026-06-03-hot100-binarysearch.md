---
title: "hot100 二分查找"
date: 2026-06-03 20:40:00 +0800
categories: hot100
tags: [二分查找]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true

---

打算在这系列博客把hot100的题扫一遍，分模块来。

## [*搜索插入位置* ](https://leetcode.cn/problems/search-insert-position/)题目描述：

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。

 

**示例 1:**

```
输入: nums = [1,3,5,6], target = 5
输出: 2
```

**示例 2:**

```
输入: nums = [1,3,5,6], target = 2
输出: 1
```

**示例 3:**

```
输入: nums = [1,3,5,6], target = 7
输出: 4
```

 

**提示:**

- `1 <= nums.length <= 104`
- `-104 <= nums[i] <= 104`
- `nums` 为 **无重复元素** 的 **升序** 排列数组
- `-104 <= target <= 104`

### 思路：

最典型的二分查找，左闭右闭，模板题。

### 代码：

```js
var searchInsert = function(nums, target) {
    let left  = 0;
    let right = nums.length - 1;

    while (left <= right) {
    // 当left跑到right的右边，说明就查找结束
        let mid = Math.floor(left + (right - left) / 2);
        // js的整数除运算不会默认向下取整
        if (nums[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return left; // 此时left是target起点
    
};
```

## [*搜索二维矩阵* ](https://leetcode.cn/problems/search-a-2d-matrix/)题目描述：

给你一个满足下述两条属性的 `m x n` 整数矩阵：

- 每行中的整数从左到右按非严格递增顺序排列。
- 每行的第一个整数大于前一行的最后一个整数。

给你一个整数 `target` ，如果 `target` 在矩阵中，返回 `true` ；否则，返回 `false` 。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

**示例 2：**

![img](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg)

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
```

 

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-104 <= matrix[i][j], target <= 104`

### 思路：

这题已经说了二维数组有序，所以用flat这个数组api把原数组展平就好，然后可以接着套模板。

### 代码：

```js
var searchMatrix = function(matrix, target) {
    const flatMatrix = matrix.flat();
    let left  = 0;
    let right = flatMatrix.length - 1;

    while (left <= right) {
    // 当left跑到right的右边，说明就查找结束
        let mid = Math.floor(left + (right - left) / 2);
        // js的整数除运算不会默认向下取整
        if (flatMatrix[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return left < flatMatrix.length && flatMatrix[left] === target; // 越界检查
    
};
```

## [寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/) 题目描述：

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次 **旋转** 后，得到输入数组。例如，原数组 `nums = [0,1,2,4,5,6,7]` 在变化后可能得到：

- 若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,2]`
- 若旋转 `7` 次，则可以得到 `[0,1,2,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` **旋转一次** 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

给你一个元素值 **互不相同** 的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。

你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

 

**示例 1：**

```
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
```

**示例 3：**

```
输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
```

 

**提示：**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` 中的所有整数 **互不相同**
- `nums` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转

### 思路：

具体分析见[重启DAY4 二分查找 | Tonite14](https://tonite14.github.io/posts/day4/#寻找旋转排序数组中的最小值-题目描述)

二分的关键在于：

1. **能判断**：条件能把区间分成"可能有答案"和"一定没答案"两半
2. **能收拢**：每轮区间一定缩小（left右移或right左移）
3. **收敛到一点**：最终剩一个位置就是答案

### 代码：

```js
var findMin = function(nums) {
    let len = nums.length;
    let left = 0;
    let right = len - 1;
    while (left <= right) {
    // 当left跑到right的右边，说明就查找结束
        let mid = Math.floor(left + (right - left) / 2);
        // js的整数除运算不会默认向下取整
        if (nums[mid] > nums[len - 1]) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return nums[left]; // 此时left是最小值
};
```

## [*搜索旋转排序数组*](https://leetcode.cn/problems/search-in-rotated-sorted-array/) 题目描述：

整数数组 `nums` 按升序排列，数组中的值 **互不相同** 。

在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了 **向左旋转**，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`（下标 **从 0 开始** 计数）。例如， `[0,1,2,4,5,6,7]` 下标 `3` 上向左旋转后可能变为 `[4,5,6,7,0,1,2]` 。

给你 **旋转后** 的数组 `nums` 和一个整数 `target` ，如果 `nums` 中存在这个目标值 `target` ，则返回它的下标，否则返回 `-1` 。

你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

 

**示例 1：**

```
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
```

**示例 3：**

```
输入：nums = [1], target = 0
输出：-1
```

 

**提示：**

- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`
- `nums` 中的每个值都 **独一无二**
- 题目数据保证 `nums` 在预先未知的某个下标上进行了旋转
- `-104 <= target <= 104`

### 思路：

具体分析见[重启DAY4 二分查找 | Tonite14](https://tonite14.github.io/posts/day4/#寻找旋转排序数组中的最小值-题目描述)

### 代码：

```js
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    const last = nums[nums.length - 1];

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        const midInFirst = nums[mid] > last; // mid 是否在第一段
        const targetInFirst = target > last; // target 是否在第一段

        if (midInFirst !== targetInFirst) {
            // 不同段时看 target 在哪段
            if (targetInFirst) {
                right = mid - 1; // target 在第一段，mid 在第二段，target 在左
            } else {
                left = mid + 1; // mid 在第一段，target 在第二段，target 在右
            }
        } else {
        // 同段时正常二分
            if (target < nums[mid]) {
               right = mid - 1;
            } else {
               left = mid + 1;
            }
        }
    }

    return -1;
};
```

## [*寻找两个正序数组的中位数*](https://leetcode.cn/problems/median-of-two-sorted-arrays/) 题目描述：

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的 **中位数** 。

算法的时间复杂度应该为 `O(log (m+n))` 。

 

**示例 1：**

```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

 

 

**提示：**

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-106 <= nums1[i], nums2[i] <= 106`

### 思路：

先放一下，回来再做。
