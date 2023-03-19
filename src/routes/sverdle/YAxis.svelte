<script lang="ts">
  // @ts-nocheck
  import { select, axisLeft } from "d3"
  export let scale: any, innerWidth: any

  let g: SVGGElement
  // Date formatting
  // https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior
  // Line chart example
  // https://svelte.dev/repl/8262eb73a08f48adba8e0b706c1a939f?version=3.22.1
  $: {
    select(g).selectAll("*").remove()
    let axis = axisLeft(scale)
      .tickSizeOuter(0)
      .ticks(25)
      .tickSizeInner(-innerWidth)

    select(g).call(axis).selectAll(".tick line").attr("opacity", "0.15")
  }
</script>

<g class="y-axis" bind:this={g} />
