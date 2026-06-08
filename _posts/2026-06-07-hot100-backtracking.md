---
title: "hot100 回溯"
date: 2026-06-07 01:27:00 +0800
categories: hot100
tags: [回溯]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true

---

打算在这系列博客把hot100的题扫一遍，分模块来。

## [*组合总和*](https://leetcode.cn/problems/combination-sum/) 题目描述：

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target` ，找出 `candidates` 中可以使数字和为目标数 `target` 的 所有 **不同组合** ，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取** 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。

 

**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

**示例 2：**

```
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

**示例 3：**

```
输入: candidates = [2], target = 1
输出: []
```

 

**提示：**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- `candidates` 的所有元素 **互不相同**
- `1 <= target <= 40`

### 思路：

还是经典的回溯框架，只是因为可以重复选，夹在push和pop之间的是dfs(i)，而不是不能重复选的dfs(i+1)。同时一直往下传递sum，便于在每次回溯开头计算结果。

### 代码：

```js
var combinationSum = function(candidates, target) {
    const path = [];
    const ans = [];

    const dfs = (i, sum) => {
        if (sum === target) {
            ans.push(path.slice());
            return;
        }
        if (i === candidates.length || sum > target) { // 没元素了或超了
            return;
        }

        // 不选candidates[i]，跳过
        dfs(i + 1, sum);

        // 选candidates[i]，还可以继续选candidates[i]
        path.push(candidates[i]);
        dfs(i, sum + candidates[i]);
        path.pop();
    };

    dfs(0, 0);
    return ans;
};
```

## [*括号生成*](https://leetcode.cn/problems/generate-parentheses/) 题目描述：

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

 

**示例 1：**

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```
输入：n = 1
输出：["()"]
```

 

**提示：**

- `1 <= n <= 8`

### 思路：

这题有点麻爪了，用不了选或不选的思路，得用选哪个的思路。每个位置填 `(` 或 `)`，但要保证括号有效。

本题的难点在于如何具象化**有效括号的约束**：

1. 任何时候左括号数量 ≥ 右括号数量（否则 `)` 多了，不合法）
2. 最终左括号 = 右括号 = n

要将左右括号匹配的思路转化为以下思路：

| 条件           | 含义                           |
| :------------- | :----------------------------- |
| `open < n`     | 左括号还没用完，可以放         |
| `close < open` | 右括号比左括号少，才能放右括号 |

这样可以将左右括号匹配的最终合法转化成每一步均可检测的合法，这种转化思想是回溯剪枝的通用思路。

### 代码：

```js
var generateParenthesis = function(n) {
    const ans = [];
    const path = [];

    const dfs = (open, close) => { // open为已用左括号数，close为已用右括号数
        if (open === n && close === n) { // 左右括号均用完，收集答案
        ans.push(path.join(''));
        return;
        }

        if (open < n) { // 左括号还能放
            path.push('(');
            dfs(open + 1, close);
            path.pop();
        }

        if (close < open) { // 右括号能放的前提是左边比右边多
            path.push(')');
            dfs(open, close + 1);
            path.pop();
        }
    };

    dfs(0, 0);
    return ans;
};
```

## [*单词搜索*](https://leetcode.cn/problems/word-search/) 题目描述：

给定一个 `m x n` 二维字符网格 `board` 和一个字符串单词 `word` 。如果 `word` 存在于网格中，返回 `true` ；否则，返回 `false` 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

```
输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCCED"
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

```
输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "SEE"
输出：true
```

**示例 3：**

![img](https://assets.leetcode.com/uploads/2020/10/15/word3.jpg)

```
输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCB"
输出：false
```

 

**提示：**

- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` 和 `word` 仅由大小写英文字母组成

 

**进阶：**你可以使用搜索剪枝的技术来优化解决方案，使其在 `board` 更大的情况下可以更快解决问题？

### 思路：

很明显是和[岛屿数量](https://leetcode.cn/problems/number-of-islands/)这题差不多的思路，需要对四个方向进行dfs，只不过岛屿数量在遍历标记过后就不再访问，而本题需要回溯。

此外，本题的dfs需要传递三个参数，ij标识board里面的元素位置，k标识word里面的元素位置。

### 代码：

类似于这篇文章[hot100 图论 | Tonite14](https://tonite14.github.io/posts/hot100-graph/#腐烂的橘子-题目描述)里的腐烂的橘子，用forof来简化上下左右操作。如果不这么写，需要写四个dfs。

```js
var exist = function(board, word) {
    const m = board.length, n = board[0].length;
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

    const dfs = (i, j, k) => {
        if (board[i][j] !== word[k]) return false;
        if (k === word.length - 1) return true;

        board[i][j] = '.'; // 模拟了push

        for (const [dx, dy] of dirs) {
            const x = i + dx, y = j + dy;
            if (x >= 0 && x < m && y >= 0 && y < n) {
                if (dfs(x, y, k + 1)) return true;
            }
        }

        board[i][j] = word[k]; // 模拟了pop
        return false;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false;
};
```

四个dfs，按岛屿数量改来：

```JS
var exist = function(board, word) {
    const m = board.length, n = board[0].length;

    function dfs(i, j, k) {
        // 出界，或者字母不匹配，就不再往下递归
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
            return false;
        }
        if (k === word.length - 1) return true; // 全部匹配完

        board[i][j] = '.'; // 插旗！避免重复使用
        
		// 有一条路走通即可，从左到右算，遇到 true 就停
        const res = dfs(i, j - 1, k + 1) || // 往左走
        dfs(i, j + 1, k + 1) || // 往右走
        dfs(i - 1, j, k + 1) || // 往上走
        dfs(i + 1, j, k + 1); // 往下走

        board[i][j] = word[k]; // 回溯，拔旗！恢复现场
        return res;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false;
};
```

