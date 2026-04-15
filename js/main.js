/**
 * 主入口 - 初始化应用
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DSA-Tutor 初始化开始...');
    
    try {
        // 检查必要的全局变量
        if (typeof graphData === 'undefined') {
            console.error('❌ graphData 未定义');
            return;
        }
        if (typeof nodeDetails === 'undefined') {
            console.error('❌ nodeDetails 未定义');
            return;
        }
        
        console.log('✅ 数据加载成功');
        console.log('📊 节点数量:', graphData.nodes.length);
        
        // 初始化知识图谱
        const graphContainer = document.getElementById('graph-container');
        if (!graphContainer) {
            console.error('❌ 找不到 graph-container');
            return;
        }
        
        const graph = new KnowledgeGraph('#graph-container', graphData);
        console.log('✅ 知识图谱初始化成功');
        
        // 初始化AI助手
        if (typeof ChatAssistant !== 'undefined') {
            const chat = new ChatAssistant('.ai-chat-box');
            console.log('✅ AI助手初始化成功');
        }
        
        // 初始化标签页切换
        initTabs();
        
        // 初始化右侧面板点击
        initSidePanel();
        
        // 窗口大小改变时重新调整
        window.addEventListener('resize', () => {
            graph.resize();
        });
        
        // 节点选择事件 - 显示详情弹窗
        window.addEventListener('nodeSelected', (e) => {
            console.log('👆 节点被点击:', e.detail);
            const node = e.detail;
            showNodeDetail(node);
        });
        
        // 弹窗控制
        const modal = document.getElementById('detail-modal');
        const closeBtn = document.querySelector('.close-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        
        console.log('🎓 DSA-Tutor 初始化完成！');
        console.log('💡 提示：点击知识图谱节点或右侧面板查看详情');
        
    } catch (error) {
        console.error('❌ 初始化错误:', error);
    }
});

// 初始化标签页切换
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // 切换按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 切换内容
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-view`) {
                    content.classList.add('active');
                }
            });
            
            console.log('📑 切换到标签页:', targetTab);
            
            // 如果切换到进化史，初始化时间线视图
            if (targetTab === 'timeline') {
                setTimeout(() => {
                    if (typeof window.initTimelineView === 'function') {
                        window.initTimelineView();
                    }
                }, 100);
            }
        });
    });
}

// 初始化右侧面板
function initSidePanel() {
    const algoItems = document.querySelectorAll('.algo-item');
    
    algoItems.forEach(item => {
        item.addEventListener('click', () => {
            const nodeId = item.getAttribute('data-node');
            console.log('📍 右侧面板点击:', nodeId);
            
            const node = graphData.nodes.find(n => n.id === nodeId);
            if (node) {
                showNodeDetail(node);
                
                // 高亮当前项
                algoItems.forEach(i => i.style.background = '');
                item.style.background = '#e0e7ff';
            }
        });
    });
}

// 显示节点详情
function showNodeDetail(node) {
    console.log('📖 显示节点详情:', node.id);
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modalTitle || !modalBody) {
        console.error('❌ 找不到弹窗元素');
        return;
    }
    
    // 查找预定义内容
    const detail = nodeDetails[node.id];
    
    if (detail) {
        modalTitle.innerHTML = `<span class="icon">${detail.icon || '📌'}</span> ${detail.title}`;
        modalBody.innerHTML = detail.content;
    } else {
        modalTitle.innerHTML = `<span class="icon">📌</span> ${node.label}`;
        modalBody.innerHTML = getDefaultContent(node.id, node.label);
    }
    
    const modal = document.getElementById('detail-modal');
    modal.classList.add('active');
    console.log('✅ 弹窗已显示');
}
