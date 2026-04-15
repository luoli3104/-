/**
 * 节点详细信息 - RNN风格卡片式布局
 */

// 节点图标映射
const nodeIcons = {
    "dsa": "🎓",
    "linear": "📏",
    "tree": "🌲",
    "graph": "🕸️",
    "hash": "🔢",
    "sort": "📊",
    "search": "🔍",
    "dp": "🧩",
    "greedy": "💰",
    "backtrack": "🔙",
    "array": "🔢",
    "linkedlist": "🔗",
    "stack": "📚",
    "queue": "🎫",
    "slist": "➡️",
    "dlist": "↔️",
    "bst": "🌳",
    "avl": "⚖️",
    "heap": "🏔️",
    "trie": "🔤",
    "bfs": "🌊",
    "dfs": "🎯",
    "dijkstra": "🛤️",
    "floyd": "🕸️",
    "quick": "⚡",
    "merge": "🔀",
    "heap_sort": "🏔️",
    "bubble": "🫧"
};

// 生成卡片式内容
function generateCardContent(title, icon, sections) {
    let content = '';
    
    // 添加时间线（如果有）
    const history = getAlgorithmHistory && getAlgorithmHistory(title.toLowerCase().replace(/\s+/g, ''));
    if (history) {
        content += `
            <div class="content-card">
                <h3><span class="icon">📅</span> 发展历史</h3>
                <div class="timeline">
                    ${history.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-year">${item.year}</div>
                            <div class="timeline-title">${item.event}</div>
                            <div class="timeline-desc">${item.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 添加各个内容卡片
    for (const [sectionTitle, sectionContent] of Object.entries(sections)) {
        const sectionIcon = getSectionIcon(sectionTitle);
        content += `
            <div class="content-card">
                <h3><span class="icon">${sectionIcon}</span> ${sectionTitle}</h3>
                ${sectionContent}
            </div>
        `;
    }
    
    // 添加AI提示框
    content += `
        <div class="info-box">
            <h4>🤖 想要更深入的学习？</h4>
            <ul>
                <li>详细解答你的疑问</li>
                <li>提供更多代码示例</li>
                <li>推荐相关练习题</li>
                <li>分析易错点和技巧</li>
            </ul>
        </div>
    `;
    
    return content;
}

// 获取章节图标
function getSectionIcon(title) {
    const iconMap = {
        "基本概念": "📖",
        "什么是": "❓",
        "简介": "📋",
        "时间复杂度": "⏱️",
        "基本操作": "🎮",
        "Python代码": "🐍",
        "代码示例": "💻",
        "经典应用": "🎯",
        "应用场景": "🎬",
        "LeetCode": "🏆",
        "经典题目": "📚",
        "解题技巧": "💡",
        "vs": "⚖️",
        "对比": "⚖️",
        "选择": "🤔",
        "重要提示": "⚠️",
        "单调栈": "📊",
        "知识体系": "🗺️",
        "学习方法": "📖",
        "为什么": "🤔",
        "主要类型": "📂",
        "性质": "📐",
        "特点": "✨",
        "核心思想": "🧠",
        "解题步骤": "📝",
        "经典问题": "🏆"
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
        if (title.includes(key)) return icon;
    }
    return "📌";
}

// 节点详细信息
const nodeDetails = {};

// 初始化所有节点详情
function initNodeDetails() {
    // DSA根节点
    nodeDetails["dsa"] = {
        title: "数据结构与算法",
        icon: nodeIcons["dsa"],
        content: generateCardContent("dsa", nodeIcons["dsa"], {
            "什么是数据结构与算法？": `
                <p><strong>数据结构</strong>是计算机中存储、组织数据的方式。<strong>算法</strong>是解决特定问题的一系列清晰指令。</p>
                <p>两者关系：数据结构为算法提供服务，算法在特定数据结构上运行。</p>
            `,
            "为什么学习DSA？": `
                <ul>
                    <li><span class="tag tag-concept">面试必备</span> Google、Microsoft、阿里、字节等大厂面试必考</li>
                    <li><span class="tag tag-concept">效率提升</span> 写出时间和空间复杂度更优的代码</li>
                    <li><span class="tag tag-concept">思维训练</span> 培养计算思维和问题解决能力</li>
                    <li><span class="tag tag-concept">基础核心</span> 所有计算机科学的基础</li>
                </ul>
            `,
            "知识体系": `
                <table class="detail-table">
                    <tr><th>类别</th><th>主要内容</th></tr>
                    <tr><td>线性结构</td><td>数组、链表、栈、队列</td></tr>
                    <tr><td>树形结构</td><td>二叉树、BST、AVL、堆、Trie</td></tr>
                    <tr><td>图形结构</td><td>图、BFS、DFS、最短路径</td></tr>
                    <tr><td>排序算法</td><td>快排、归并、堆排、冒泡</td></tr>
                    <tr><td>高级算法</td><td>动态规划、贪心、回溯</td></tr>
                </table>
            `,
            "学习方法": `
                <ol>
                    <li><strong>理解原理</strong>：不要死记硬背，理解底层逻辑</li>
                    <li><strong>动手实现</strong>：手写代码，不要只看不练</li>
                    <li><strong>刷题巩固</strong>：LeetCode、牛客网</li>
                    <li><strong>总结套路</strong>：归纳常见题型和解题模板</li>
                    <li><strong>定期复习</strong>：遗忘曲线告诉我们需要重复</li>
                </ol>
            `
        })
    };

    // 线性结构
    nodeDetails["linear"] = {
        title: "线性结构",
        icon: nodeIcons["linear"],
        content: generateCardContent("linear", nodeIcons["linear"], {
            "什么是线性结构？": `
                <p>线性结构是数据元素之间呈<strong>一对一</strong>关系的集合，元素按线性顺序排列。</p>
                <p>特点：除了第一个和最后一个元素，每个元素都有唯一的前驱和后继。</p>
            `,
            "四大基本线性结构": `
                <table class="detail-table">
                    <tr><th>结构</th><th>特点</th><th>核心操作</th></tr>
                    <tr><td>数组</td><td>连续内存，随机访问</td><td>索引访问O(1)</td></tr>
                    <tr><td>链表</td><td>指针连接，动态扩容</td><td>插入删除O(1)</td></tr>
                    <tr><td>栈</td><td>后进先出(LIFO)</td><td>push/pop O(1)</td></tr>
                    <tr><td>队列</td><td>先进先出(FIFO)</td><td>enqueue/dequeue O(1)</td></tr>
                </table>
            `,
            "数组 vs 链表": `
                <table class="detail-table">
                    <tr><th>对比项</th><th>数组</th><th>链表</th></tr>
                    <tr><td>内存布局</td><td>连续</td><td>分散</td></tr>
                    <tr><td>访问元素</td><td>O(1)</td><td>O(n)</td></tr>
                    <tr><td>插入删除</td><td>O(n)</td><td>O(1)</td></tr>
                    <tr><td>缓存友好</td><td>是</td><td>否</td></tr>
                </table>
            `
        })
    };

    // 数组
    nodeDetails["array"] = {
        title: "数组",
        icon: nodeIcons["array"],
        content: generateCardContent("array", nodeIcons["array"], {
            "基本概念": `
                <p>数组是最基础的数据结构，用<strong>连续的内存空间</strong>存储相同类型的数据。</p>
                <p>核心特性：通过<strong>索引</strong>可以在O(1)时间内访问任意元素。</p>
            `,
            "时间复杂度": `
                <table class="detail-table">
                    <tr><th>操作</th><th>时间复杂度</th><th>说明</th></tr>
                    <tr><td>随机访问</td><td>O(1)</td><td>通过索引直接计算地址</td></tr>
                    <tr><td>尾部插入</td><td>O(1)</td><td>Python list的append</td></tr>
                    <tr><td>头部/中间插入</td><td>O(n)</td><td>需要移动后续元素</td></tr>
                    <tr><td>查找（无序）</td><td>O(n)</td><td>线性扫描</td></tr>
                    <tr><td>查找（有序）</td><td>O(log n)</td><td>二分查找</td></tr>
                </table>
            `,
            "Python代码": `
                <pre class="code-block"># 创建数组
arr = [1, 2, 3, 4, 5]

# 访问元素（O(1)）
print(arr[0])      # 1
print(arr[-1])     # 5

# 修改元素
arr[0] = 100

# 遍历数组
for num in arr:
    print(num)

# 常用操作
arr.append(6)       # 尾部添加 O(1)
arr.insert(0, 0)    # 头部插入 O(n)
arr.pop()           # 尾部删除 O(1)
arr.remove(3)       # 删除值为3的元素</pre>
            `,
            "经典应用": `
                <ul>
                    <li><strong>数据存储</strong>：存储一组同类型数据</li>
                    <li><strong>矩阵运算</strong>：二维数组表示矩阵</li>
                    <li><strong>实现其他数据结构</strong>：堆、哈希表、栈、队列</li>
                    <li><strong>缓存</strong>：CPU缓存、数据库缓存</li>
                </ul>
            `,
            "LeetCode经典题目": `
                <table class="detail-table">
                    <tr><th>题号</th><th>题目</th><th>难度</th></tr>
                    <tr><td>1</td><td>Two Sum</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>53</td><td>Maximum Subarray</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>283</td><td>Move Zeroes</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>11</td><td>Container With Most Water</td><td><span class="tag tag-medium">Medium</span></td></tr>
                    <tr><td>15</td><td>3Sum</td><td><span class="tag tag-medium">Medium</span></td></tr>
                </table>
            `,
            "解题技巧": `
                <ul>
                    <li><strong>双指针</strong>：快慢指针、对撞指针、滑动窗口</li>
                    <li><strong>前缀和</strong>：快速计算子数组和</li>
                    <li><strong>原地修改</strong>：很多题目要求O(1)空间</li>
                </ul>
            `
        })
    };

    // 链表
    nodeDetails["linkedlist"] = {
        title: "链表",
        icon: nodeIcons["linkedlist"],
        content: generateCardContent("linkedlist", nodeIcons["linkedlist"], {
            "基本概念": `
                <p>链表通过<strong>指针</strong>将分散存储的节点连接，不需要连续内存。</p>
                <p>每个节点包含：数据域 + 指针域（指向下一个节点）</p>
            `,
            "时间复杂度": `
                <table class="detail-table">
                    <tr><th>操作</th><th>时间复杂度</th><th>说明</th></tr>
                    <tr><td>访问元素</td><td>O(n)</td><td>必须从头遍历</td></tr>
                    <tr><td>头部插入/删除</td><td>O(1)</td><td>修改头指针</td></tr>
                    <tr><td>中间插入/删除</td><td>O(1)*</td><td>已知前驱节点时</td></tr>
                </table>
                <p>*注：找到位置需要O(n)，操作本身是O(1)</p>
            `,
            "Python代码": `
                <pre class="code-block">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 创建链表
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# 遍历链表
current = head
while current:
    print(current.val)
    current = current.next

# 头部插入
new_node = ListNode(0)
new_node.next = head
head = new_node</pre>
            `,
            "vs数组选择": `
                <table class="detail-table">
                    <tr><th>场景</th><th>推荐</th><th>原因</th></tr>
                    <tr><td>频繁随机访问</td><td>数组</td><td>O(1)访问</td></tr>
                    <tr><td>频繁插入删除</td><td>链表</td><td>O(1)操作</td></tr>
                    <tr><td>内存不连续</td><td>链表</td><td>灵活分配</td></tr>
                </table>
            `,
            "LeetCode经典题目": `
                <table class="detail-table">
                    <tr><th>题号</th><th>题目</th><th>难度</th></tr>
                    <tr><td>206</td><td>Reverse Linked List</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>21</td><td>Merge Two Sorted Lists</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>141</td><td>Linked List Cycle</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>19</td><td>Remove Nth Node From End</td><td><span class="tag tag-medium">Medium</span></td></tr>
                    <tr><td>23</td><td>Merge k Sorted Lists</td><td><span class="tag tag-hard">Hard</span></td></tr>
                </table>
            `,
            "解题技巧": `
                <ul>
                    <li><strong>虚拟头节点</strong>：简化边界处理</li>
                    <li><strong>双指针</strong>：快慢指针（找中点、检测环）</li>
                    <li><strong>画图</strong>：指针变化容易混乱，画图帮助理解</li>
                </ul>
            `
        })
    };

    // 栈
    nodeDetails["stack"] = {
        title: "栈",
        icon: nodeIcons["stack"],
        content: generateCardContent("stack", nodeIcons["stack"], {
            "基本概念": `
                <p>栈是一种<strong>后进先出(LIFO)</strong>的线性数据结构。</p>
                <p>想象一叠盘子：最后放上去的，最先被取走。</p>
            `,
            "基本操作": `
                <table class="detail-table">
                    <tr><th>操作</th><th>名称</th><th>时间复杂度</th></tr>
                    <tr><td>push</td><td>压栈</td><td>O(1)</td></tr>
                    <tr><td>pop</td><td>弹栈</td><td>O(1)</td></tr>
                    <tr><td>peek</td><td>查看栈顶</td><td>O(1)</td></tr>
                </table>
            `,
            "Python代码": `
                <pre class="code-block"># 使用列表实现栈
stack = []

# 压栈
stack.append(1)
stack.append(2)

# 查看栈顶
top = stack[-1]   # 2

# 弹栈
item = stack.pop()  # 2

# 判空
is_empty = len(stack) == 0</pre>
            `,
            "经典应用": `
                <ul>
                    <li><strong>括号匹配</strong>：检查表达式括号是否配对</li>
                    <li><strong>表达式求值</strong>：中缀转后缀，再求值</li>
                    <li><strong>DFS实现</strong>：深度优先搜索</li>
                    <li><strong>函数调用</strong>：程序运行时的调用栈</li>
                    <li><strong>浏览器前进后退</strong>：两个栈实现</li>
                </ul>
            `,
            "单调栈": `
                <p>单调栈保持栈内元素单调递增或递减，用于找下一个更大/更小元素。</p>
                <pre class="code-block">def next_greater_elements(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # 存储索引
    
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    
    return result</pre>
            `,
            "LeetCode经典题目": `
                <table class="detail-table">
                    <tr><th>题号</th><th>题目</th><th>难度</th></tr>
                    <tr><td>20</td><td>Valid Parentheses</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>155</td><td>Min Stack</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>739</td><td>Daily Temperatures</td><td><span class="tag tag-medium">Medium</span></td></tr>
                    <tr><td>42</td><td>Trapping Rain Water</td><td><span class="tag tag-hard">Hard</span></td></tr>
                </table>
            `
        })
    };

    // 队列
    nodeDetails["queue"] = {
        title: "队列",
        icon: nodeIcons["queue"],
        content: generateCardContent("queue", nodeIcons["queue"], {
            "基本概念": `
                <p>队列是一种<strong>先进先出(FIFO)</strong>的线性数据结构。</p>
                <p>想象排队买票：先来的人先买到。</p>
            `,
            "重要提示": `
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin: 12px 0;">
                    <strong>⚠️ 注意：</strong>Python列表的 <code>pop(0)</code> 是O(n)！应该使用 <code>collections.deque</code>
                </div>
                <pre class="code-block"># ❌ 错误 - O(n)
queue = []
queue.pop(0)

# ✅ 正确 - O(1)
from collections import deque
queue = deque()
queue.popleft()</pre>
            `,
            "基本操作": `
                <table class="detail-table">
                    <tr><th>操作</th><th>名称</th><th>时间复杂度</th></tr>
                    <tr><td>enqueue</td><td>入队</td><td>O(1)</td></tr>
                    <tr><td>dequeue</td><td>出队</td><td>O(1)</td></tr>
                    <tr><td>front</td><td>查看队首</td><td>O(1)</td></tr>
                </table>
            `,
            "Python代码": `
                <pre class="code-block">from collections import deque

queue = deque()

# 入队
queue.append(1)
queue.append(2)

# 查看队首
front = queue[0]

# 出队
item = queue.popleft()

# 获取大小
size = len(queue)</pre>
            `,
            "经典应用": `
                <ul>
                    <li><strong>BFS广度优先搜索</strong>：图的层次遍历</li>
                    <li><strong>任务调度</strong>：操作系统进程调度</li>
                    <li><strong>消息队列</strong>：Kafka、RabbitMQ</li>
                    <li><strong>缓存淘汰</strong>：FIFO策略</li>
                </ul>
            `,
            "LeetCode经典题目": `
                <table class="detail-table">
                    <tr><th>题号</th><th>题目</th><th>难度</th></tr>
                    <tr><td>225</td><td>Implement Stack using Queues</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>232</td><td>Implement Queue using Stacks</td><td><span class="tag tag-easy">Easy</span></td></tr>
                    <tr><td>622</td><td>Design Circular Queue</td><td><span class="tag tag-medium">Medium</span></td></tr>
                    <tr><td>933</td><td>Number of Recent Calls</td><td><span class="tag tag-easy">Easy</span></td></tr>
                </table>
            `
        })
    };

    // 其他节点使用默认内容
    const otherNodes = ["slist", "dlist", "tree", "bst", "avl", "heap", "trie", "hash", 
                        "graph", "bfs", "dfs", "dijkstra", "floyd", "sort", "quick", 
                        "merge", "heap_sort", "bubble", "search", "dp", "greedy", "backtrack"];
    
    otherNodes.forEach(nodeId => {
        const node = graphData.nodes.find(n => n.id === nodeId);
        if (node && !nodeDetails[nodeId]) {
            nodeDetails[nodeId] = {
                title: node.label,
                icon: nodeIcons[nodeId] || "📌",
                content: generateCardContent(nodeId, nodeIcons[nodeId] || "📌", {
                    "简介": `<p>${node.description}</p><p>点击右侧AI助手，让Kimi为你详细讲解"${node.label}"！</p>`,
                    "学习建议": `
                        <ul>
                            <li>理解核心概念和原理</li>
                            <li>掌握时间/空间复杂度分析</li>
                            <li>动手实现代码</li>
                            <li>刷相关LeetCode题目</li>
                        </ul>
                    `
                })
            };
        }
    });
}

// 初始化
initNodeDetails();

// 默认内容生成器
function getDefaultContent(nodeId, nodeLabel) {
    return generateCardContent(nodeId, "📌", {
        "简介": `<p>这是关于${nodeLabel}的学习内容。</p>`,
        "学习建议": `<p>点击右侧AI助手，让Kimi为你详细讲解"${nodeLabel}"！</p>`
    });
}
