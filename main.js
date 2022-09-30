fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(res => res.json())
        .then(data => {
    document.getElementById('title').innerText = data.name

    
    const dataset = data.data
    let dollarLocale = Intl.NumberFormat('en-US')

    const minX = d3.min(dataset, d => parseInt(d[0]));
    const maxX = d3.max(dataset, d => parseInt(d[0]));

    const maxY = d3.max(dataset, d => d[1])

    const w = 1200
    const h = 500
    const padding = 50

    const xScale = d3.scaleLinear()
                    .domain([minX, maxX])
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
       .attr("x", (d, i) => (i + 13) * 4)
       .attr('y', (d, i) => yScale(d[1]))
       .attr("width", 3)
       .attr("height", d => h - padding - yScale(d[1]))
       .attr("class", "bar")
       .append('title')
       .text(d => `${d[0]}\n$${dollarLocale.format(d[1])} billion`)

       let xAxis = d3.axisBottom(xScale)
       let yAxis = d3.axisLeft(yScale)

        svg.append('g')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis)

        svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis)


})
