/**
 * 算法发展历史时间线
 */
const algorithmHistory = {
    "array": [
        { year: "1945", event: "冯·诺依曼提出存储程序概念", desc: "数组作为基础数据结构被确立" },
        { year: "1960s", event: "高级语言普及", desc: "FORTRAN、C语言使数组广泛应用" },
        { year: "现代", event: "缓存优化", desc: "CPU缓存友好性成为数组设计考量" }
    ],
    "linkedlist": [
        { year: "1955", event: "链表概念提出", desc: "Allen Newell和Herbert Simon在IPL-V中实现" },
        { year: "1960s", event: "LISP语言", desc: "链表成为LISP语言的核心数据结构" },
        { year: "现代", event: "内存池优化", desc: "减少内存碎片，提高分配效率" }
    ],
    "stack": [
        { year: "1946", event: "栈概念提出", desc: "Alan Turing提出栈的概念" },
        { year: "1957", event: "递归实现", desc: "栈用于实现程序递归调用" },
        { year: "现代", event: "硬件支持", desc: "CPU直接支持栈操作(push/pop)" }
    ],
    "queue": [
        { year: "1960s", event: "操作系统调度", desc: "队列用于进程调度管理" },
        { year: "1980s", event: "网络协议", desc: "TCP/IP协议栈使用队列管理数据包" },
        { year: "现代", event: "消息队列", desc: "Kafka、RabbitMQ等分布式消息队列" }
    ],
    "bst": [
        { year: "1960", event: "BST提出", desc: "由多位研究者独立提出" },
        { year: "1962", event: "AVL树", desc: "Adelson-Velsky和Landis提出自平衡树" },
        { year: "1978", event: "红黑树", desc: "Guibas和Sedgewick提出" }
    ],
    "dp": [
        { year: "1953", event: "动态规划命名", desc: "Richard Bellman正式命名" },
        { year: "1960s", event: "最优控制理论", desc: "应用于航天和工程优化" },
        { year: "现代", event: "竞赛编程", desc: "成为算法竞赛核心技巧" }
    ],
    "sort": [
        { year: "1945", event: "归并排序", desc: "John von Neumann发明" },
        { year: "1959", event: "冒泡排序", desc: "最早描述的排序算法之一" },
        { year: "1961", event: "快速排序", desc: "Tony Hoare在莫斯科大学提出" },
        { year: "1964", event: "堆排序", desc: "J. W. J. Williams提出" }
    ],
    "quick": [
        { year: "1961", event: "Tony Hoare发明", desc: "在莫斯科国立大学访问期间" },
        { year: "1962", event: "首次发表", desc: "发表于《Computer Journal》" },
        { year: "现代", event: "优化版本", desc: "三数取中、随机化、双轴快排" }
    ],
    "bfs": [
        { year: "1959", event: "Edsger Dijkstra提出", desc: "用于解决图的最短路径问题" },
        { year: "现代", event: "广泛应用", desc: "社交网络、网络爬虫、AI游戏" }
    ],
    "dfs": [
        { year: "19世纪", event: "迷宫求解", desc: "Charles Pierre Trémaux提出" },
        { year: "1970s", event: "图算法", desc: "Hopcroft-Tarjan算法" },
        { year: "现代", event: "回溯算法", desc: "八皇后、数独、组合问题" }
    ],
    "hash": [
        { year: "1953", event: "哈希表概念", desc: "H. P. Luhn在IBM提出" },
        { year: "1956", event: "链地址法", desc: "Gene Amdahl等人提出" },
        { year: "现代", event: "一致性哈希", desc: "分布式系统中的负载均衡" }
    ]
};

// 获取算法历史
function getAlgorithmHistory(nodeId) {
    return algorithmHistory[nodeId] || null;
}
