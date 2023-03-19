<script lang="ts">
  import { raw } from "./data.js"
  import LineGraph from "./LineGraph.svelte"

  let data = raw.map((d) => {
    return { timestamp: new Date(d.timestamp), temperature: +d.temperature }
  })

  let show = true
</script>

<label for="show" style="display: inline;">Show Line:</label>
<input id="show" type="checkbox" bind:checked={show} />

<div class="flex justify-center">
  <LineGraph {data} {show} />
</div>
