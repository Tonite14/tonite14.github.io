---
title: "hot100 动态规划"
date: 2026-06-08 15:52:00 +0800
categories: hot100
tags: [动态规划]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true

---

打算在这系列博客把hot100的题扫一遍，分模块来。

## [*完全平方数*](https://leetcode.cn/problems/perfect-squares/) 题目描述：

给你一个整数 `n` ，返回 *和为 `n` 的完全平方数的最少数量* 。

**完全平方数** 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

 

**示例 1：**

```
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
```

**示例 2：**

```
输入：n = 13
输出：2
解释：13 = 4 + 9
```

 

**提示：**

- `1 <= n <= 10^4`

### 思路：

这题重要的是转化思维，完全平方数选了还能再选，把 1,4,9,16,⋯ 这些完全平方数视作物品体积，物品价值都是 1。由于每个数（物品）选的次数没有限制，所以本题是一道标准的**完全背包**问题。可以将完全平方数视为物品体积，dp\[i][j]为价值，n为背包容量，求最小价值。

提示里提到n最大为10000，说明完全平方数最大为100，那么对应的子状态应该就为10^6个，再加上一个还没开始的基准状态。

对于一些回溯来说，他的边界条件可能还会包含了某些题目的限制条件，但在dp里来说，限制条件一般是在调用递归处的max或min，所以边界条件会更简单。

这是两个框架处理约束的方式不同：

**回溯**：约束分散在终止条件里，因为要保证每一步都不违规

**DP**：约束藏在转移方程的min/max里，不合法的路径自然被淘汰（值变成Infinity），边界条件只管空的状态





另外，我们一般都使用的是先物品再容量的写法，符合选或不选的思路。这题也可以使用先容量再物品的写法，不过这种写法对于求方案数的题目会算错，可以对比一下 [518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/) 和 [377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/) 这两题。

**518. 零钱兑换 II**：求组合数（顺序不同算同一种，[1,2]和[2,1]是同一种）

**377. 组合总和 Ⅳ**：求排列数（顺序不同算不同，[1,2]和[2,1]是两种）

| 遍历顺序     | 含义                               | 518组合数 | 377排列数 |
| :----------- | :--------------------------------- | :-------- | :-------- |
| 先物品再容量 | 固定物品顺序，不会出现先选2再选1   | ✅ 正确    | ❌ 少算    |
| 先容量再物品 | 每个容量考虑所有物品，2可以在1前面 | ❌ 多算    | ✅ 正确    |

两种方法最终填完的表是一致的，只是填表的顺序不同，先物品再容量一行一行填，先容量再物品一列一列填。因此求最小值/最大值时，两种顺序结果一样，因为min不关心顺序。而求方案数时就不一样了。

### 代码：

普通dfs：

```js
var numSquares = function(n) {
    
    const dfs = (i, j) => {
        if (i === 0) {
            return j === 0 ? 0 : Infinity;
        }

        if (j < i * i) { // 完全平方数更大，选不了
            return dfs(i - 1, j);
        } else { // 选or不选
            return Math.min(dfs(i - 1, j), dfs(i, j - i * i) + 1);
        }

    }
    return dfs(Math.floor(Math.sqrt(n)), n);
};
```

dfs+记忆化：

这题如果把记忆化数组写里面会超时，而写外面多个测试数据之间可以共享，减少计算量。因为这题所有的背包和物件都是一样的，可以复用同一个memo，传统的背包问题每个问题的背包容量和物件体积都是不同的。

```js
const memo = Array.from({ length : 101 }, () => new Array(10001).fill(-1));
// 写外面，写里面会超时
var numSquares = function(n) {
    
    const dfs = (i, j) => {
        if (i === 0) {
            return j === 0 ? 0 : Infinity;
        }

        if (memo[i][j] !== -1) {
            return memo[i][j];
        }

        if (j < i * i) { // 完全平方数更大，选不了
            memo[i][j] = dfs(i - 1, j);
        } else { // 选or不选
            memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - i * i) + 1);
        }

        return memo[i][j];

    }
    return dfs(Math.floor(Math.sqrt(n)), n);
};
```

递推：

递归因为需要区分某个memo有没有被计算过，用-1标记是可行且更清晰的，-1也不会进入到dfs的结果中去，0和infinity则是需要的初始化；但递推是不能用-1进行标记的，因为递归会判断memo某个值能不能被直接返回，而递推是直接依赖dp数组状态转移一算到底。

循环写在函数里面，每次都运算会超时；必须要写在外面，只算一次，每次直接取结果即可。

```js
const N = 10000;
const f = Array.from({ length: 101 }, () => Array(N + 1).fill(Infinity));
f[0][0] = 0;
for (let i = 1; i * i <= N; i++) {
    for (let j = 0; j <= N; j++) {
        if (j < i * i) {
            f[i][j] = f[i - 1][j]; // 只能不选
        } else {
            f[i][j] = Math.min(f[i - 1][j], f[i][j - i * i] + 1); // 不选 vs 选
        }
    }
}

var numSquares = function(n) {
    return f[Math.floor(Math.sqrt(n))][n]; // 也可以写 f[100][n]
};
```

## [*单词拆分*](https://leetcode.cn/problems/word-break/) 题目描述：

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 `s` 则返回 `true`。

**注意：**不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

 

**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

 

**提示：**

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` 和 `wordDict[i]` 仅由小写英文字母组成
- `wordDict` 中的所有字符串 **互不相同**

### 思路：

这题首先难在如何划分子问题，也就是如何拆分字符串s。

可以参照灵神的思路[139. 单词拆分 - 力扣（LeetCode）](https://leetcode.cn/problems/word-break/solutions/2968135/jiao-ni-yi-bu-bu-si-kao-dpcong-ji-yi-hua-chrs/?envType=study-plan-v2&envId=top-100-liked)

![image-20260609004734476](/assets/blog_res/2026-06-08-hot100-dynamicprogramming.assets/image-20260609004734476.png)

![image-20260609004746596](/assets/blog_res/2026-06-08-hot100-dynamicprogramming.assets/image-20260609004746596.png)

问：能不能外层循环枚举 words，内层循环枚举长度？类似完全背包的写法。

答：不能。完全背包是同一个物品连续选择，然后就再也不选这个物品了。本题可以交替选。比如 s 是 ABA 型，如果用完全背包的写法，只能枚举 AAB、ABB 这类连续的字符串组合，无法枚举到 ABA 这样的字符串组合。

### 代码：

从前往后遍历s的切点j：

```js
var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Array(s.length + 1).fill(-1);

    // dfs(i): s[0..i-1] 能否被拆分
    const dfs = (i) => {
        if (i === 0) return true; // 空串，拆分成功
        if (memo[i] !== -1) return memo[i];

        // 枚举最后一个单词的起点j
        for (let j = 0; j < i; j++) {
            if (dfs(j) && wordSet.has(s.slice(j, i))) {
                memo[i] = true;
                return true;
            }
        }
        memo[i] = false;
        return false;
    };

    return dfs(s.length);
};
```

从前往后遍历worddist：

第一个memo大小是`s.length + 1`（i从0到n，0是空串基准），第二个是`s.length`（i从0到n-1，n是终止条件不是状态）。

```js
var wordBreak = function(s, wordDict) {
    const memo = new Array(s.length).fill(-1);

    const dfs = (i) => {
        if (i === s.length) return true; // 走到末尾，成功
        if (memo[i] !== -1) return memo[i];

        for (const word of wordDict) {
            if (s.startsWith(word, i) && dfs(i + word.length)) {
                memo[i] = true;
                return true;
            }
        }
        memo[i] = false;
        return false;
    };

    return dfs(0);
};
```

## [*乘积最大子数组*](https://leetcode.cn/problems/maximum-product-subarray/) 题目描述：

给你一个整数数组 `nums` ，请你找出数组中乘积最大的非空连续 子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 **32-位** 整数。

**请注意**，一个只包含一个元素的数组的乘积是这个元素的值。

 

**示例 1:**

```
输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2:**

```
输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

 

**提示:**

- `1 <= nums.length <= 2 * 104`
- `-10 <= nums[i] <= 10`
- `nums` 的任何子数组的乘积都 **保证** 是一个 **32-位** 整数

### 思路：

