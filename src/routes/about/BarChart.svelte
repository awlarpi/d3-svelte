<!-- 
https://www.d3indepth.com/scales
https://blog.logrocket.com/data-visualization-svelte-d3
https://github.com/d3/d3-scale-chromatic
https://github.com/d3/d3-scale
https://github.com/d3/d3-shape
-->
<script lang="ts">
  import {
    scaleBand,
    scaleLinear,
    scaleSequential,
    interpolateViridis,
    axisBottom,
  } from "d3"
  import type { PopulationData } from "../../store"
  import { fade, blur, fly, slide, scale } from "svelte/transition"

  export let data: Array<PopulationData>
  let windowWidth: number, windowHeight: number

  $: height = windowHeight * 0.8
  $: width = windowWidth > 1000 ? windowWidth * 0.6 : windowWidth * 0.95

  const margin = { top: 20, right: 30, bottom: 20, left: 90 }
  $: innerHeight = height - margin.top - margin.bottom
  $: innerWidth = width - margin.left - margin.right

  $: xDomain = data.map((d) => d.country)
  $: yDomain = data.map((d) => +d.population)

  // Using extent will make the domain [min, max]
  // $: xScale = scaleLinear()
  //   .domain([0, Math.max.apply(null, yDomain)])
  //   .range([0, innerWidth])

  $: xScale = scaleLinear()
    .domain([0, Math.max.apply(null, yDomain)])
    .range([0, innerWidth])

  $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1)

  // Create a color scale based on the country name
  $: colorScale = scaleSequential(interpolateViridis).domain([
    Math.min.apply(null, yDomain) * 0.5,
    Math.max.apply(null, yDomain) * 1.1,
  ])

  // // Create a color scale based on the country name
  // $: colorScale = scaleOrdinal(schemeCategory10)
</script>

<svelte:window bind:outerWidth={windowWidth} bind:outerHeight={windowHeight} />

{#if width && height}
  <svg {width} {height}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#each xScale.ticks() as tickValue}
        <g transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerHeight} stroke="gray" />
          <text
            text-anchor="middle"
            dy=".71em"
            y={innerHeight + 3}
            fill="white"
          >
            {tickValue}
          </text>
        </g>
      {/each}
      {#each data as d, i}
        <text
          text-anchor="end"
          font-size="normal"
          x="-8"
          dy=".36em"
          y={yScale(d.country) + yScale.bandwidth() / 2}
          fill="white"
        >
          {d.country}
        </text>
        <rect
          x="0"
          y={yScale(d.country)}
          width={xScale(d.population)}
          height={yScale.bandwidth()}
          fill={colorScale(d.population)}
          in:slide={{ duration: 300, delay: i * 30 }}
        />
      {/each}
    </g>
  </svg>
{/if}

<!-- in:slide={{ x: -200, duration: 300, delay: i * 30 }} -->
