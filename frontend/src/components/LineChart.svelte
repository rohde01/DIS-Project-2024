<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let selectedOption = 'All'; // default option

    const urls = {
        'Premium': 'http://localhost:3001/customer/data?UserSubscriptionType=3&IsFreemiumPlusComplyMember=0',
        'Comply': 'http://localhost:3001/customer/data?IsFreemiumPlusComplyMember=1',
        'Freemium': 'http://localhost:3001/customer/data?UserSubscriptionType=1&IsFreemiumPlusComplyMember=0',
        'All': 'http://localhost:3001/customer/data'
    };

    let url = urls[selectedOption];
    let data = [];
    let svg, x, y, line, linePath, xAxisGroup, yAxisGroup;

    async function fetchData() {
        const response = await fetch(url);
        const newData = await response.json();
        data = newData.map(d => ({
            ...d,
            date: new Date(d.date)
        }));
    }

    function redrawChart() {
        // Set dimensions and margins for the chart
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Set up the x and y scales
        x = d3.scaleTime().range([0, width]);
        y = d3.scaleLinear().range([height, 0]);

        // Define the x and y domains
        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.value)]);

        // Create the SVG element and append it to the chart container
        svg = d3.select("#chart-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add the x-axis
        xAxisGroup = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add the y-axis
        yAxisGroup = svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        // Create the line generator
        line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        // Draw the line
        linePath = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }

    function updateChart() {
        // Update scales
        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.value)]);

        // Update the line
        linePath.datum(data)
            .transition()
            .duration(1000)
            .attr("d", line);

        // Update the axes
        xAxisGroup.transition()
            .duration(1000)
            .call(d3.axisBottom(x));

        yAxisGroup.transition()
            .duration(1000)
            .call(d3.axisLeft(y));
    }

    onMount(async () => {
        await fetchData();
        redrawChart();

        // Add options to the select button
        const selectButton = d3.select("#selectButton");
        selectButton.selectAll('option')
            .data(Object.keys(urls))
            .enter()
            .append('option')
            .text(d => d)
            .attr("value", d => d);

        // Handle select button change
        selectButton.on("change", async function() {
            selectedOption = d3.select(this).property("value");
            url = urls[selectedOption];
            await fetchData();
            updateChart();
        });
    });
</script>

<div>
    <select id="selectButton"></select>
</div>
<div id="chart-container"></div>

<style>
    #chart-container {
        justify-content: center;
    }
</style>
