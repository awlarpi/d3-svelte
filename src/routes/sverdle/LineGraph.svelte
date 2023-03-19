<script lang="ts">
  // @ts-nocheck
  import { draw } from "svelte/transition"
  import * as d3 from "d3"
  import XAxis from "./XAxis.svelte"
  import YAxis from "./YAxis.svelte"

  export let data: any
  export let show: boolean

  const width = 1500
  const height = 800
  const margin = { top: 15, bottom: 150, left: 70, right: 20 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.timestamp))
    .range([0, innerWidth])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.temperature))
    .range([innerHeight, 0])

  const pathLine = d3
    .line()
    .x((d) => xScale(d.timestamp))
    .y((d) => yScale(d.temperature))
    .curve(d3.curveNatural)

  let xValue = null

  let d = null

  function handleMouseMove(event) {
    const [x, y] = d3.pointer(event)
    const xValueScale = d3
      .scaleTime()
      .domain([margin.left, margin.left + innerWidth])
      .range(xScale.domain())
    xValue = xValueScale(x)
    const bisect = d3.bisector((d) => d.timestamp).left
    let index = bisect(data, xValue)
    d = data[index]
  }
</script>

<div>
  <div class="block">
    {#if d}
      <h1>
        {d.timestamp.toString()} : {d.temperature.toFixed(2)}°C
      </h1>
    {:else}
      <h1>Out of range</h1>
    {/if}
  </div>

  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <svg {width} {height} on:mousemove={handleMouseMove}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#if d}
        <line
          stroke="gray"
          transform={`translate(${xScale(d.timestamp)},0)`}
          y2={innerHeight}
        />
        <line
          stroke="gray"
          transform={`translate(0, ${yScale(d.temperature)})`}
          x2={innerWidth}
        />
        <!-- <text
          fill="black"
          text-anchor="middle"
          transform={`translate(${xScale(d.timestamp)}, ${innerHeight / 4})`}
          ></text
        > -->
      {/if}
      <text
        fill="aliceblue"
        transform={`translate(${-50},${innerHeight / 2}) rotate(-90)`}
        >Temperature</text
      >
      <!-- <text fill="aliceblue" x={innerWidth / 2} y={innerHeight + 45}
      >Timestamp</text
    > -->
      {#if show}
        <path
          d={pathLine(data)}
          in:draw={{ duration: 1500 }}
          stroke="white"
          stroke-width="2"
          fill="none"
        />
      {/if}
      <XAxis {innerHeight} scale={xScale} />
      <YAxis scale={yScale} {innerWidth} />
    </g>
  </svg>
</div>
