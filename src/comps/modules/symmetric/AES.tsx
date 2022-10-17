import { Component, createEffect, createSignal } from "solid-js"
import { store } from "../../../store"
import { FaSolidGears } from "solid-icons/fa"
import { toClipboard } from "../../../utils"
import { TbCopy } from "solid-icons/tb"
import { DataType } from "../../../types"
import CryptoJS from 'crypto-js'
import Hexgen from 'hex-generator'


export const DEFAULT_TYPE_INDEX = 0
export const ALL_TYPES = [
  { name: 'AES-128', value: 128 },
  { name: 'AES-192', value: 192 },
  { name: 'AES-256', value: 256 },
]

export const AES: Component = () => {
  const [state, setState] = store
  const [type, setType] = createSignal(ALL_TYPES[DEFAULT_TYPE_INDEX])
  const [key, setKey] = createSignal("")
  let keyInput: HTMLInputElement | undefined

  createEffect(() => {
    setState("loading", true)
    const input = state.input
    const paddedKey = key().padEnd(type().value * 2, " ")
    const startTime = window.performance.now()
    const cipher = CryptoJS.AES.encrypt(input, paddedKey)
    setState("micsSpent", window.performance.now() - startTime)
    setState("result", cipher.ciphertext.toString(CryptoJS.enc.Hex))
    setState("loading", false)
  })

  return <div class="flex flex-col gap-2">
    <label class="label font-bold text-sm">
      Type
    </label>
    <select class="select select-bordered select-sm" onchange={evt => setType(ALL_TYPES.find(mod => mod.name === evt.currentTarget.value) as NonNullable<any>)}>
      {ALL_TYPES.map((sks) => <option value={sks.name} selected={sks === type()}>{sks.name}</option>)}
    </select>

    <label class="label font-bold text-sm">
      Secret key ({type().value} bits)
    </label>
    <label class="flex gap-3 justify-center items-center transition">
      <input
        ref={keyInput}
        type="text"
        value={key()}
        placeholder="Type key here..."
        oninput={e => setKey(e.currentTarget.value)}
        class="input input-sm input-bordered w-full max-w-xs"
      />
      <div class="tooltip tooltip-bottom" data-tip="Generate">
        <button class="btn btn-sm btn-ghost" onclick={evt => setKey(Hexgen(type().value))}>
          <FaSolidGears size={16} />
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Copy">
        <button class="btn btn-sm btn-ghost" onclick={() => toClipboard(key(), keyInput)}>
          <TbCopy size={16} />
        </button>
      </div>
    </label>
  </div>
}