/**
 * 知识图谱可视化 (D3.js)
 */
class KnowledgeGraph {
    constructor(containerId, data) {
        this.container = d3.select(containerId);
        this.data = data;
        this.width = this.container.node().clientWidth;
        this.height = this.container.node().clientHeight || 500;
        this.transform = d3.zoomIdentity;
        
        this.init();
    }
    
    init() {
        // 清空容器
        this.container.html('');
        
        // 创建SVG
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height]);
        
        // 添加缩放行为
        this.zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on('zoom', (event) => {
                this.transform = event.transform;
                this.g.attr('transform', event.transform);
            });
        
        this.svg.call(this.zoom);
        
        // 创建主组
        this.g = this.svg.append('g');
        
        // 颜色映射
        this.colorScale = d3.scaleOrdinal()
            .domain(['root', 'structure', 'algorithm'])
            .range(['#4f46e5', '#10b981', '#f59e0b']);
        
        // 节点大小映射 - 中等大小
        this.sizeScale = d3.scaleOrdinal()
            .domain(['root', 'structure', 'algorithm'])
            .range([45, 32, 32]);
        
        this.render();
    }
    
    render() {
        const { nodes, links } = this.data;
        
        // 创建力导向模拟 - 轻微力度，让节点自动布局
        this.simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(120))
            .force('charge', d3.forceManyBody().strength(-100))  // 轻微排斥力
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => this.sizeScale(d.category) + 15));
        
        // 让模拟运行直到稳定
        this.simulation.on('tick', () => {
            this.linkElements
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            this.nodeElements
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });
        
        // 持续运行模拟，允许拖动
        
        // 绘制连线
        this.linkElements = this.g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link');
        
        // 绘制节点组 - 添加拖拽功能
        this.nodeElements = this.g.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d)));
        
        // 节点圆形
        this.nodeElements.append('circle')
            .attr('r', d => this.sizeScale(d.category))
            .attr('fill', d => this.colorScale(d.category))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
        
        // 节点等级标注（右上角）
        const nodeLevels = {
            'array': 'Lv1', 'linkedlist': 'Lv1', 'stack': 'Lv1', 'queue': 'Lv1',
            'bst': 'Lv2', 'avl': 'Lv2', 'heap': 'Lv2', 'trie': 'Lv2',
            'hash': 'Lv2',
            'sort': 'Lv1', 'search': 'Lv1',
            'dp': 'Lv3', 'greedy': 'Lv2', 'backtrack': 'Lv2',
            'graph': 'Lv3', 'bfs': 'Lv2', 'dfs': 'Lv2',
            'dijkstra': 'Lv3', 'floyd': 'Lv3',
            'quick': 'Lv1', 'merge': 'Lv2', 'heap_sort': 'Lv2', 'bubble': 'Lv1'
        };
        
        this.nodeElements.each(function(d) {
            const level = nodeLevels[d.id];
            if (level) {
                const size = 32;
                d3.select(this).append('rect')
                    .attr('x', size - 14)
                    .attr('y', -size - 5)
                    .attr('width', 28)
                    .attr('height', 14)
                    .attr('rx', 7)
                    .attr('fill', '#4f46e5')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .style('pointer-events', 'none');
                
                d3.select(this).append('text')
                    .attr('x', size)
                    .attr('y', -size + 4)
                    .attr('text-anchor', 'middle')
                    .text(level)
                    .attr('fill', '#fff')
                    .style('font-size', '8px')
                    .style('font-weight', '700')
                    .style('pointer-events', 'none');
            }
        });
        
        // 节点文字
        this.nodeElements.append('text')
            .attr('dy', d => this.sizeScale(d.category) + 18)
            .attr('text-anchor', 'middle')
            .text(d => d.label)
            .attr('fill', '#374151')
            .style('font-size', '12px')
            .style('font-weight', '500');
        
        // 节点图标（根节点）
        this.nodeElements.filter(d => d.category === 'root')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '5')
            .text('🎓')
            .style('font-size', '24px')
            .style('pointer-events', 'none');
        
        // 点击事件
        this.nodeElements.on('click', (event, d) => {
            event.stopPropagation();
            this.onNodeClick(d);
        });
        
        // 悬停效果
        this.nodeElements
            .on('mouseenter', function() {
                d3.select(this).select('circle')
                    .attr('stroke', '#fbbf24')
                    .attr('stroke-width', 4);
            })
            .on('mouseleave', function() {
                d3.select(this).select('circle')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 3);
            });
        
    }
    
    onNodeClick(node) {
        // 触发全局事件
        window.dispatchEvent(new CustomEvent('nodeSelected', { detail: node }));
        
        // 高亮选中节点
        this.nodeElements.selectAll('circle')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3);
        
        this.nodeElements.filter(d => d.id === node.id)
            .select('circle')
            .attr('stroke', '#fbbf24')
            .attr('stroke-width', 5);
    }
    
    resetZoom() {
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
    }
    
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        // 保持节点在新位置，不恢复自由移动
    }
    
    togglePhysics() {
        if (this.simulation.alpha() > 0) {
            this.simulation.stop();
        } else {
            this.simulation.restart();
        }
    }
    
    resize() {
        this.width = this.container.node().clientWidth;
        this.height = this.container.node().clientHeight || 500;
        this.svg.attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height]);
        this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
        this.simulation.alpha(0.3).restart();
    }
}
