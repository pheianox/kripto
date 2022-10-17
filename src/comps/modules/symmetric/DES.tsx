import { Component, createEffect, createSignal } from "solid-js"
import { FaSolidGears } from "solid-icons/fa"
import { toClipboard } from "../../../utils"
import { DataType } from "../../../types"
import { TbCopy } from "solid-icons/tb"
import { store } from "../../../store"
import CryptoJS from 'crypto-js'
import Hexgen from 'hex-generator'

const DES_KEY_SIZE_IN_BITS = 56

export const DES: Component = () => {
  const [state, setState] = store
  const [key, setKey] = createSignal("")
  let keyInput: HTMLInputElement | undefined

  createEffect(() => {
    setState("loading", true)
    const input = state.input
    const paddedKey = key().padEnd(DES_KEY_SIZE_IN_BITS * 2, " ")
    const startTime = window.performance.now()
    const cipher = CryptoJS.DES.encrypt(input, paddedKey)
    setState("micsSpent", window.performance.now() - startTime)
    setState("result", cipher.ciphertext.toString(CryptoJS.enc.Hex))
    setState("loading", false)
  })

  return <div class="flex flex-col gap-2">
    <label class="label font-bold text-sm">
      Secret key ({DES_KEY_SIZE_IN_BITS} bits)
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
        <button class="btn btn-sm btn-ghost" onclick={evt => setKey(Hexgen(DES_KEY_SIZE_IN_BITS))}>
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