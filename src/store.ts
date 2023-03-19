import { readable, writable } from "svelte/store"

export const alert = writable("welcome to my app!")

export const datasetStore = writable([
  { country: "China", population: 351003 },
  { country: "India", population: 341003 },
  { country: "USA", population: 331003 },
  { country: "Indonesia", population: 273524 },
  { country: "Pakistan", population: 220892 },
  { country: "Brazil", population: 212559 },
  { country: "Nigeria", population: 206140 },
  { country: "Bangladesh", population: 164689 },
  { country: "Russia", population: 145934 },
  { country: "Mexico", population: 128933 },
])

export interface PopulationData {
  country: string
  population: number
}
