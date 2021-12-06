
export const first = (fishes: number[]): number => {
   let myFishes = [...fishes]
   for (let day = 0; day < 80; day++) {
      let spawendFishes: number[] = []
      let agedFishes: number[] = []
      for (let fish of myFishes) {
         // Decrease counter
         fish--

         if (fish === -1) {
            fish = 6;
            spawendFishes.push(8);
         }
         agedFishes.push(fish)
      }
      myFishes = agedFishes
      myFishes.push(...spawendFishes)
   }
   return myFishes.length;
}
