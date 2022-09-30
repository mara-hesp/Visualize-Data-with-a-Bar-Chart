fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(res => res.json())
        .then(data => {
    document.getElementById('title').innerText = data.name
    
    const dataset = data.data

    const minX = d3.min(dataset, d => d[0]);
    const maxX = d3.max(dataset, d => d[0]);

    const minY = d3.min(dataset, d => d[1]);
    const maxY = d3.max(dataset, d => d[1])

    const w = 1200
    const h = 500
    const padding = 25

    const xScale = d3.scaleLinear()
                    .domain([0, maxX])
                    .range([padding, w - padding])
    const yScale = d3.scaleLinear()
                    .domain([0, maxY])
                    .range([h - padding, padding])

    const svg = d3.select('div')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 4)
       .attr("y", (d, i) => h - d[1])
       .attr("width", 3)
       .attr("height", (d => d[1]))
       .attr("class", "bar")
    
})