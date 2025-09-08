// D3.js 데모 모듈
export class D3Demos {
    // 막대 차트
    static initBarChart(container) {
        container.innerHTML = `
            <div id="d3-chart" style="width: 100%; height: 400px; position: relative;"></div>
            <div style="margin-top: 20px; text-align: center;">
                <button id="update-data-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">데이터 업데이트</button>
                <button id="sort-data-btn" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">정렬</button>
            </div>
        `;

        setTimeout(() => {
            let data = [
                {name: 'HTML', value: 85, color: '#e74c3c'},
                {name: 'CSS', value: 75, color: '#3498db'},
                {name: 'JavaScript', value: 90, color: '#f39c12'},
                {name: 'React', value: 80, color: '#9b59b6'},
                {name: 'Node.js', value: 70, color: '#2ecc71'}
            ];

            const margin = {top: 40, right: 30, bottom: 60, left: 50};
            const width = Math.max(container.clientWidth - margin.left - margin.right, 400);
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select('#d3-chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // 툴팁 생성
            const tooltip = d3.select('#d3-chart')
                .append('div')
                .attr('class', 'tooltip')
                .style('position', 'absolute')
                .style('visibility', 'hidden')
                .style('background', 'rgba(0, 0, 0, 0.8)')
                .style('color', '#fff')
                .style('padding', '8px 12px')
                .style('border-radius', '4px')
                .style('font-size', '12px')
                .style('pointer-events', 'none')
                .style('z-index', '1000');

            // 스케일 설정
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.name))
                .padding(0.2);

            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data, d => d.value) * 1.1]);

            // 그리드 라인 추가
            svg.append('g')
                .attr('class', 'grid')
                .call(d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat(''))
                .style('stroke-dasharray', '2,2')
                .style('stroke', '#e0e0e0')
                .style('opacity', 0.3);

            // 축 추가
            const xAxis = svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            const yAxis = svg.append('g')
                .call(d3.axisLeft(y));

            // 축 스타일링
            xAxis.selectAll('text')
                .style('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('fill', '#666');

            yAxis.selectAll('text')
                .style('font-size', '12px')
                .style('fill', '#666');

            // 축 레이블 추가
            svg.append('text')
                .attr('transform', `translate(${width/2}, ${height + margin.bottom - 10})`)
                .style('text-anchor', 'middle')
                .style('font-size', '14px')
                .style('fill', '#666')
                .text('웹 기술');

            svg.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 0 - margin.left + 15)
                .attr('x', 0 - (height / 2))
                .attr('dy', '1em')
                .style('text-anchor', 'middle')
                .style('font-size', '14px')
                .style('fill', '#666')
                .text('숙련도 (%)');

            // 막대 그룹 생성
            const bars = svg.selectAll('.bar-group')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'bar-group');

            // 막대 추가 (애니메이션 효과)
            const rects = bars.append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.name))
                .attr('y', height)
                .attr('width', x.bandwidth())
                .attr('height', 0)
                .attr('fill', d => d.color)
                .attr('opacity', 0.8)
                .attr('rx', 4)
                .attr('ry', 4)
                .transition()
                .duration(1000)
                .delay((d, i) => i * 100)
                .attr('y', d => y(d.value))
                .attr('height', d => height - y(d.value));

            // 값 레이블 추가 (애니메이션)
            const labels = bars.append('text')
                .attr('class', 'value-label')
                .attr('x', d => x(d.name) + x.bandwidth() / 2)
                .attr('y', height)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('font-weight', 'bold')
                .style('fill', '#fff')
                .style('opacity', 0)
                .text(d => d.value + '%')
                .transition()
                .duration(1000)
                .delay((d, i) => i * 100 + 500)
                .attr('y', d => y(d.value) - 5)
                .style('opacity', 1);

            // 인터랙션 추가
            bars.on('mouseover', function(event, d) {
                    // 막대 강조
                    d3.select(this).select('rect')
                        .transition()
                        .duration(200)
                        .attr('opacity', 1)
                        .attr('stroke', '#333')
                        .attr('stroke-width', 2);

                    // 툴팁 표시
                    tooltip.style('visibility', 'visible')
                        .html(`<strong>${d.name}</strong><br/>숙련도: ${d.value}%`);
                })
                .on('mousemove', function(event) {
                    tooltip.style('top', (event.pageY - 10) + 'px')
                        .style('left', (event.pageX + 10) + 'px');
                })
                .on('mouseout', function() {
                    // 원래 상태로 복원
                    d3.select(this).select('rect')
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.8)
                        .attr('stroke', 'none');

                    tooltip.style('visibility', 'hidden');
                });

            // 버튼 이벤트 리스너
            document.getElementById('update-data-btn').addEventListener('click', () => {
                // 데이터 랜덤 업데이트
                data.forEach(d => {
                    d.value = Math.floor(Math.random() * 40) + 60; // 60-100 사이 랜덤 값
                });
                updateChart();
            });

            document.getElementById('sort-data-btn').addEventListener('click', () => {
                // 데이터 정렬
                data.sort((a, b) => b.value - a.value);
                updateChart();
            });

            // 차트 업데이트 함수
            function updateChart() {
                // 스케일 업데이트
                y.domain([0, d3.max(data, d => d.value) * 1.1]);
                x.domain(data.map(d => d.name));

                // 축 업데이트
                xAxis.transition().duration(500).call(d3.axisBottom(x));
                yAxis.transition().duration(500).call(d3.axisLeft(y));

                // 막대 업데이트
                bars.data(data);

                bars.select('rect')
                    .transition()
                    .duration(500)
                    .attr('x', d => x(d.name))
                    .attr('y', d => y(d.value))
                    .attr('height', d => height - y(d.value));

                // 레이블 업데이트
                bars.select('.value-label')
                    .transition()
                    .duration(500)
                    .attr('x', d => x(d.name) + x.bandwidth() / 2)
                    .attr('y', d => y(d.value) - 5)
                    .text(d => d.value + '%');
            }
        }, 100);
    }

    // 선 그래프
    static initLineChart(container) {
        container.innerHTML = '<div id="line-chart" style="width: 100%; height: 400px; position: relative;"></div>';

        setTimeout(() => {
            // 샘플 데이터
            const data = [
                {date: '2023-01', value: 30},
                {date: '2023-02', value: 45},
                {date: '2023-03', value: 55},
                {date: '2023-04', value: 70},
                {date: '2023-05', value: 85},
                {date: '2023-06', value: 95}
            ];

            const margin = {top: 20, right: 30, bottom: 40, left: 50};
            const width = Math.max(container.clientWidth - margin.left - margin.right, 400);
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select('#line-chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // 스케일 설정
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.date))
                .padding(0.1);

            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data, d => d.value) * 1.1]);

            // 축 추가
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append('g')
                .call(d3.axisLeft(y));

            // 선 생성
            const line = d3.line()
                .x(d => x(d.date) + x.bandwidth() / 2)
                .y(d => y(d.value))
                .curve(d3.curveMonotoneX);

            // 선 추가
            svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#007bff')
                .attr('stroke-width', 3)
                .attr('d', line);

            // 점 추가
            svg.selectAll('.dot')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot')
                .attr('cx', d => x(d.date) + x.bandwidth() / 2)
                .attr('cy', d => y(d.value))
                .attr('r', 5)
                .attr('fill', '#007bff')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2);
        }, 100);
    }

    // 포스 다이어그램
    static initForceDirected(container) {
        container.innerHTML = '<div id="force-chart" style="width: 100%; height: 400px; position: relative;"></div>';

        setTimeout(() => {
            const data = {
                nodes: [
                    {id: 'HTML', group: 1},
                    {id: 'CSS', group: 1},
                    {id: 'JavaScript', group: 2},
                    {id: 'React', group: 2},
                    {id: 'Node.js', group: 3},
                    {id: 'Express', group: 3},
                    {id: 'MongoDB', group: 4},
                    {id: 'PostgreSQL', group: 4}
                ],
                links: [
                    {source: 'HTML', target: 'CSS'},
                    {source: 'HTML', target: 'JavaScript'},
                    {source: 'CSS', target: 'JavaScript'},
                    {source: 'JavaScript', target: 'React'},
                    {source: 'JavaScript', target: 'Node.js'},
                    {source: 'Node.js', target: 'Express'},
                    {source: 'Express', target: 'MongoDB'},
                    {source: 'Express', target: 'PostgreSQL'}
                ]
            };

            const width = Math.max(container.clientWidth, 400);
            const height = 400;

            const svg = d3.select('#force-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            // 포스 시뮬레이션
            const simulation = d3.forceSimulation(data.nodes)
                .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
                .force('charge', d3.forceManyBody().strength(-300))
                .force('center', d3.forceCenter(width / 2, height / 2));

            // 링크 추가
            const link = svg.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(data.links)
                .enter()
                .append('line')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 2);

            // 노드 추가
            const node = svg.append('g')
                .attr('class', 'nodes')
                .selectAll('circle')
                .data(data.nodes)
                .enter()
                .append('circle')
                .attr('r', 20)
                .attr('fill', d => d3.schemeCategory10[d.group])
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            // 텍스트 레이블 추가
            const text = svg.append('g')
                .attr('class', 'texts')
                .selectAll('text')
                .data(data.nodes)
                .enter()
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '.35em')
                .style('font-size', '12px')
                .style('fill', '#fff')
                .style('pointer-events', 'none')
                .text(d => d.id);

            // 시뮬레이션 틱
            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);

                text
                    .attr('x', d => d.x)
                    .attr('y', d => d.y);
            });

            // 드래그 함수들
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        }, 100);
    }
}
