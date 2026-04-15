/**
 * 进化史时间线视图 - 列表模式
 */
class TimelineView {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.init();
    }
    
    init() {
        this.render();
    }
    
    render() {
        const timelineData = [
            {
                era: "早期基础 (1940s-1960s)",
                icon: "📜",
                items: [
                    { year: "1945", title: "数组概念", desc: "冯·诺依曼提出存储程序概念，数组作为基础数据结构被确立" },
                    { year: "1946", title: "栈的概念", desc: "Alan Turing提出栈的概念，用于程序递归调用" },
                    { year: "1953", title: "链表与哈希表", desc: "链表概念提出，哈希表由H.P. Luhn在IBM发明" },
                    { year: "1955", title: "链表实现", desc: "Allen Newell和Herbert Simon在IPL-V中实现链表" },
                    { year: "1960", title: "二叉搜索树", desc: "BST由多位研究者独立提出" },
                    { year: "1961", title: "快速排序", desc: "Tony Hoare在莫斯科大学发明快速排序" },
                    { year: "1962", title: "AVL树", desc: "Adelson-Velsky和Landis提出自平衡二叉搜索树" }
                ]
            },
            {
                era: "算法发展 (1960s-1980s)",
                icon: "📈",
                items: [
                    { year: "1964", title: "堆排序", desc: "J.W.J. Williams提出堆排序算法" },
                    { year: "1970s", title: "图算法", desc: "Hopcroft-Tarjan算法，DFS/BFS广泛应用" },
                    { year: "1978", title: "红黑树", desc: "Guibas和Sedgewick提出红黑树" },
                    { year: "1980s", title: "网络协议", desc: "TCP/IP协议栈使用队列管理数据包" }
                ]
            },
            {
                era: "现代优化 (1990s-至今)",
                icon: "🚀",
                items: [
                    { year: "1990s", title: "缓存优化", desc: "CPU缓存友好性成为数组设计考量" },
                    { year: "2000s", title: "消息队列", desc: "Kafka、RabbitMQ等分布式消息队列兴起" },
                    { year: "2010s", title: "一致性哈希", desc: "分布式系统中的负载均衡算法" },
                    { year: "现代", title: "竞赛普及", desc: "动态规划成为算法竞赛核心技巧" }
                ]
            }
        ];
        
        let html = '<div class="timeline-wrapper">';
        
        timelineData.forEach(group => {
            html += `
                <div class="timeline-group">
                    <div class="timeline-group-title">
                        <span>${group.icon}</span>
                        ${group.era}
                    </div>
            `;
            
            group.items.forEach(item => {
                html += `
                    <div class="timeline-item">
                        <div class="timeline-year">${item.year}</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-desc">${item.desc}</div>
                    </div>
                `;
            });
            
            html += '</div>';
        });
        
        html += '</div>';
        
        this.container.innerHTML = html;
    }
}

// 初始化时间线视图
window.initTimelineView = function() {
    const timelineContent = document.getElementById('timeline-content');
    if (timelineContent && !window.timelineView) {
        console.log('🔄 初始化进化史视图');
        window.timelineView = new TimelineView('#timeline-content');
    }
};
