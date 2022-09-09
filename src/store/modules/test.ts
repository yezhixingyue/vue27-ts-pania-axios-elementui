import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1
    },
  },
  actions: {
    reset() {
      this.counter = 0
    },
    setCounter(val: number) {
      this.counter = val;
    }
  },
})
