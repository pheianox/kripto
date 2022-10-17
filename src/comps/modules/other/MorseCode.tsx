import { Component, createEffect, createSignal } from "solid-js"
import { store } from "../../../store"
import * as Xmorse from 'xmorse'
import { DataType } from "../../../types"

const DEFAULT_CONFIG = {
  space: ' ',
  long: '-',
  short: '.'
}

export const MorseCode: Component = () => {
  const [state, setState] = store
  const [config, setConfig] = createSignal({ ...DEFAULT_CONFIG })

  createEffect(() => {
    setState("loading", true)
    const input = state.input
    const startTime = window.performance.now()
    const cipher = Xmorse.encode(input, config())
    setState("micsSpent", window.performance.now() - startTime)
    setState("result", cipher.toString())
    setState("loading", false)
  })

  return <div class="flex flex-row gap-2">
    <span class="flex flex-col gap-2">
      <span class="font-bold">Short</span>
      <input type="text"
        class="input input-bordered input-sm w-full"
        placeholder={DEFAULT_CONFIG.short}
        value={config().short}
        oninput={e => setConfig(c => ({ ...c, short: e.currentTarget.value }))}
      />
    </span>

    <span class="flex flex-col gap-2">
      <span class="font-bold">Long</span>
      <input type="text"
        class="input input-bordered input-sm w-full"
        placeholder={DEFAULT_CONFIG.long}
        value={config().long}
        oninput={e => setConfig(c => ({ ...c, long: e.currentTarget.value }))}
      />
    </span>

    <span class="flex flex-col gap-2">
      <span class="font-bold">Space</span>
      <input
        type="text"
        class="input input-bordered input-sm w-full"
        placeholder={DEFAULT_CONFIG.space}
        value={config().space}
        oninput={e => setConfig(c => ({ ...c, space: e.currentTarget.value }))}
      />
    </span>
  </div>
}