import { createStore, Store } from 'solid-js/store'
import { DataType, State } from './types'

export const store = createStore<Store<State>>({
  input: "",
  result: "",
  micsSpent: -1,
  loading: false
})

