/**
 * 数据结构与算法知识图谱数据
 */
const graphData = {
    nodes: [
        { id: "dsa", label: "数据结构与算法", category: "root", description: "计算机科学的核心基础" },
        { id: "linear", label: "线性结构", category: "structure", description: "数据元素一对一关系" },
        { id: "tree", label: "树形结构", category: "structure", description: "数据元素一对多关系" },
        { id: "graph", label: "图形结构", category: "structure", description: "数据元素多对多关系" },
        { id: "hash", label: "哈希表", category: "structure", description: "键值对存储结构" },
        { id: "sort", label: "排序算法", category: "algorithm", description: "将数据按特定顺序排列" },
        { id: "search", label: "查找算法", category: "algorithm", description: "在数据集中寻找目标" },
        { id: "dp", label: "动态规划", category: "algorithm", description: "分治+记忆化，解决重叠子问题" },
        { id: "greedy", label: "贪心算法", category: "algorithm", description: "局部最优选择" },
        { id: "backtrack", label: "回溯算法", category: "algorithm", description: "深度优先搜索+剪枝" },
        { id: "array", label: "数组", category: "structure", description: "连续内存存储的线性表" },
        { id: "linkedlist", label: "链表", category: "structure", description: "指针连接的节点序列" },
        { id: "stack", label: "栈", category: "structure", description: "后进先出(LIFO)" },
        { id: "queue", label: "队列", category: "structure", description: "先进先出(FIFO)" },
        { id: "slist", label: "单链表", category: "structure", description: "每个节点只有一个next指针" },
        { id: "dlist", label: "双向链表", category: "structure", description: "节点有prev和next指针" },
        { id: "bst", label: "二叉搜索树", category: "structure", description: "左<根<右的二叉树" },
        { id: "avl", label: "AVL树", category: "structure", description: "自平衡二叉搜索树" },
        { id: "heap", label: "堆", category: "structure", description: "完全二叉树，父节点大于/小于子节点" },
        { id: "trie", label: "Trie树", category: "structure", description: "前缀树，用于字符串匹配" },
        { id: "bfs", label: "BFS", category: "algorithm", description: "广度优先搜索" },
        { id: "dfs", label: "DFS", category: "algorithm", description: "深度优先搜索" },
        { id: "dijkstra", label: "Dijkstra", category: "algorithm", description: "单源最短路径算法" },
        { id: "floyd", label: "Floyd", category: "algorithm", description: "多源最短路径算法" },
        { id: "quick", label: "快速排序", category: "algorithm", description: "分治+基准元素" },
        { id: "merge", label: "归并排序", category: "algorithm", description: "分治+合并有序数组" },
        { id: "heap_sort", label: "堆排序", category: "algorithm", description: "利用堆结构排序" },
        { id: "bubble", label: "冒泡排序", category: "algorithm", description: "相邻元素比较交换" },
    ],
    
    links: [
        { source: "dsa", target: "linear" },
        { source: "dsa", target: "tree" },
        { source: "dsa", target: "graph" },
        { source: "dsa", target: "hash" },
        { source: "dsa", target: "sort" },
        { source: "dsa", target: "search" },
        { source: "dsa", target: "dp" },
        { source: "dsa", target: "greedy" },
        { source: "dsa", target: "backtrack" },
        { source: "linear", target: "array" },
        { source: "linear", target: "linkedlist" },
        { source: "linear", target: "stack" },
        { source: "linear", target: "queue" },
        { source: "linkedlist", target: "slist" },
        { source: "linkedlist", target: "dlist" },
        { source: "tree", target: "bst" },
        { source: "tree", target: "avl" },
        { source: "tree", target: "heap" },
        { source: "tree", target: "trie" },
        { source: "graph", target: "bfs" },
        { source: "graph", target: "dfs" },
        { source: "graph", target: "dijkstra" },
        { source: "graph", target: "floyd" },
        { source: "sort", target: "quick" },
        { source: "sort", target: "merge" },
        { source: "sort", target: "heap_sort" },
        { source: "sort", target: "bubble" },
        { source: "stack", target: "dfs" },
        { source: "queue", target: "bfs" },
        { source: "heap", target: "heap_sort" },
        { source: "array", target: "quick" },
    ]
};

// nodeDetails 定义在 node-details.js 文件中
// 默认内容生成器（备用）
function getDefaultContent(nodeId, nodeLabel) {
    return `<h2>${nodeLabel}</h2><p>点击右侧AI助手，让Kimi为你详细讲解"${nodeLabel}"！</p>`;
}
