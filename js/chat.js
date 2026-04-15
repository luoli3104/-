/**
 * AI对话助手
 */
class ChatAssistant {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        if (!this.container) {
            console.error('❌ 找不到聊天容器:', containerId);
            return;
        }
        this.messagesContainer = this.container.querySelector('#chat-messages');
        this.input = this.container.querySelector('#chat-input');
        this.sendBtn = this.container.querySelector('#send-btn');
        
        // 检查必要元素是否存在
        if (!this.messagesContainer || !this.input || !this.sendBtn) {
            console.error('❌ 聊天组件缺少必要元素');
            return;
        }
        
        this.apiEndpoint = 'http://localhost:8000/api/chat';
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        window.addEventListener('nodeSelected', (e) => {
            const node = e.detail;
            this.handleNodeSelection(node);
        });
    }
    
    handleNodeSelection(node) {
        // 不再自动发送问题，只在输入框中提示
        this.input.placeholder = `想深入了解"${node.label}"？在这里输入问题...`;
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isProcessing) return;
        
        this.addMessage(message, 'user');
        this.input.value = '';
        
        this.isProcessing = true;
        this.sendBtn.disabled = true;
        this.showTypingIndicator();
        
        try {
            const response = await this.callAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
        } catch (error) {
            this.hideTypingIndicator();
            const mockResponse = this.getMockResponse(message);
            this.addMessage(mockResponse, 'ai');
        } finally {
            this.isProcessing = false;
            this.sendBtn.disabled = false;
        }
    }
    
    async callAPI(message) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        return data.response;
    }
    
    getMockResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('数组')) {
            return `**数组**是最基础的数据结构！

**核心特点：**
- 连续内存存储，支持O(1)随机访问
- 插入删除需要移动元素，O(n)

**Python示例：**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print(arr[0])  # O(1)访问
arr.append(6)  # 尾部添加
arr.insert(0, 0)  # 头部插入 O(n)
\`\`\`

**应用场景：** 需要频繁按索引访问的场景。`;
        }
        
        if (lowerMsg.includes('链表')) {
            return `**链表**通过指针连接节点。

**核心特点：**
- 插入删除O(1)，访问O(n)
- 不需要连续内存

**Python示例：**
\`\`\`python
class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
\`\`\`

**经典问题：** 反转链表、合并链表、检测环`;
        }
        
        if (lowerMsg.includes('栈')) {
            return `**栈**是后进先出(LIFO)的数据结构。

**核心操作：** push O(1), pop O(1), peek O(1)

**Python实现：**
\`\`\`python
stack = []
stack.append(1)  # push
top = stack[-1]  # peek
item = stack.pop()  # pop
\`\`\`

**应用：** 括号匹配、表达式求值、DFS`;
        }
        
        if (lowerMsg.includes('队列')) {
            return `**队列**是先进先出(FIFO)的数据结构。

**Python实现：**
\`\`\`python
from collections import deque
queue = deque()
queue.append(1)  # 入队
item = queue.popleft()  # 出队
\`\`\`

**应用：** BFS、任务调度、消息队列`;
        }
        
        if (lowerMsg.includes('动态规划') || lowerMsg.includes('dp')) {
            return `**动态规划**核心思想：
1. 重叠子问题
2. 最优子结构  
3. 记忆化存储

**解题步骤：**
1. 定义状态
2. 状态转移方程
3. 初始条件
4. 计算顺序

**经典问题：** 背包问题、LCS、LIS、股票买卖`;
        }
        
        if (lowerMsg.includes('快速排序') || lowerMsg.includes('快排')) {
            return `**快速排序** - 最常用的排序算法

**核心：** 选基准 → 分区 → 递归

**复杂度：** 平均O(n log n)，最坏O(n²)

**Python实现：**
\`\`\`python
def quick_sort(arr, l, r):
    if l >= r: return
    pivot = arr[r]
    i = l
    for j in range(l, r):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[r] = arr[r], arr[i]
    quick_sort(arr, l, i-1)
    quick_sort(arr, i+1, r)
\`\`\``;
        }
        
        return `收到你的问题！由于处于演示模式，我可以回答：数组、链表、栈、队列、树、图、排序算法、动态规划等DSA相关问题。

试试问我具体的数据结构或算法吧！`;
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'ai' ? '🤖' : '👤';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = this.formatContent(content);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    formatContent(content) {
        // 简单的Markdown格式化
        return content
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`{3}(\w+)?\n([\s\S]+?)`{3}/g, '<pre><code>$2</code></pre>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
}
