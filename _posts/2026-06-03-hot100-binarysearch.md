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

