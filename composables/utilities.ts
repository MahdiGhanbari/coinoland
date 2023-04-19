import { getRandomInt } from "element-plus/es/utils"

export function useUtilities() {
  
  function getRandom(min: number, max: number) {
    const rand = Math.random()
    return rand * (max - min) + min
  }

  return {getRandom}
}