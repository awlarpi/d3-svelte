<script lang="ts">
  import BarChart from "./BarChart.svelte"
  import { datasetStore } from "../../store"
  import { onDestroy, onMount } from "svelte"
  import type { PopulationData } from "../../store"

  let data: Array<PopulationData>
  const unsubscribe = datasetStore.subscribe((value) => (data = value))

  let message: { text: string } | undefined

  onMount(async () => {
    message = await fetch("http://localhost:8080").then((res) => res.json())
  })

  const myInterval = setInterval(async () => {
    message = await fetch("http://localhost:8080").then((res) => res.json())
    console.log("message: " + message)
  }, 5000)

  onDestroy(() => {
    unsubscribe()
    clearInterval(myInterval)
  })
</script>

<div class="flex flex-row justify-center mt-8">
  <h1>{message?.text}</h1>
  <BarChart {data} />
</div>
