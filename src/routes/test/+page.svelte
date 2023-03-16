<script lang="ts">
  import BarChart from "./BarChart.svelte"
  import { datasetStore } from "../../store"
  import { onDestroy, onMount } from "svelte"
  import type { PopulationData } from "../../store"

  let data: Array<PopulationData>
  const unsubscribe = datasetStore.subscribe((value) => (data = value))
  onDestroy(unsubscribe)
</script>

<BarChart {data} />
