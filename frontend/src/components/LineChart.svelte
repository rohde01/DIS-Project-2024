<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    export let url;

    let data = [];
    let svg;
    let x, y, line;

    onMount(async () => {
        
        async function fetchData() {
            const response = await fetch(url);
            const newData = await response.json();
            data = newData.map(d => ({
                ...d,
                date: new Date(d.date)
            }));
        }

        await fetchData();

        // Set dimensions and margins for the chart
        const margin = { top: 140, right: 300, bottom: 80, left: 300 };
        const width = 1200 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Set up the x and y scales
        x = d3.scaleTime().range([0, width]);
        y = d3.scaleLinear().range([height, 0]);

        // Define the x and y domains
        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.value)]);

        // Create the SVG element and append it to the chart container
        svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add the x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks()
                .tickFormat(d3.timeFormat("%b %Y")));

        // Add the y-axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Create the line generator
        line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        // Draw the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1)
            .attr("d", line);
    });
</script>

<div id="chart-container"></div>

<style>
    #chart-container {
        justify-content: center;
    }
</style>
