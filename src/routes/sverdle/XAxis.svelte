<script lang="ts">
  // @ts-nocheck
  import { select, axisBottom, timeFormat } from "d3"
  export let innerHeight: number, scale: any
  let transform = `translate(0, ${innerHeight})`
  let g: SVGGElement
  // Date formatting
  // https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior
  // Line chart example
  // https://svelte.dev/repl/8262eb73a08f48adba8e0b706c1a939f?version=3.22.1
  $: {
    select(g).selectAll("*").remove()

    let axis = axisBottom(scale)
      .ticks(50)
      .tickSizeOuter(0)
      .tickFormat((d) => timeFormat("%c")(d as Date))

    select(g)
      .call(axis)
      .selectAll("text")
      .attr("transform", "rotate(-60)")
      .attr("dy", "-1.0")
      .attr("dx", "-12")
      .attr("text-anchor", "end")
  }
</script>

<g class="x-axis" bind:this={g} {transform} />
