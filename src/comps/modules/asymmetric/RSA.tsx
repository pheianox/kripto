import { TbCopy, TbEye, TbEyeOff } from "solid-icons/tb"
import { Component, createEffect, createSignal, onMount } from "solid-js"
import { store } from "../../../store"
import { toClipboard } from "../../../utils"
import { DataType } from "../../../types"
import JSCryptoRSA from 'js-crypto-rsa'

const RSA_KEY_SIZE_BITS = 2048

export const RSA: Component = () => {
  const [state, setState] = store
  const [keys, setKeys] = createSignal<any>()
  const [isPrivateKeyHidden, setIsPrivateKeyHidden] = createSignal(true)
  const [error, setError] = createSignal("")
  const hasError = () => error().length > 0

  let publicKeyInput: HTMLInputElement | undefined
  let privateKeyInput: HTMLInputElement | undefined

  onMount(() => {
    generateKeys()
  })
  createEffect(() => {
    const input = state.input
    if (keys() != null && keys()?.publicKey) {
      setState("loading", true)
      setError("")
      const startTime = window.performance.now()
      JSCryptoRSA.encrypt(new TextEncoder().encode(input), keys().publicKey)
        .then(data => {
          setState("micsSpent", window.performance.now() - startTime)
          setState("result", [...new Uint8Array(data)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join(''))
        })
        .catch(err => setError(err.message))
        .finally(() => {
          setState("loading", false)
        })
    }
  })

  function stringifyKey(value?: CryptoKey) {
    return value ? toHex(JSON.stringify(value)).split("").reverse().join("") : ""
  }

  function toHex(str: string) {
    var result = ''
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16)
    }
    return result
  }

  function generateKeys() {
    JSCryptoRSA.generateKey(RSA_KEY_SIZE_BITS).then(keys => setKeys(keys))
  }

  return <div class="flex flex-col gap-2">
    <label class="label font-bold text-sm">
      Public key
    </label>
    <label class="flex gap-3 justify-center items-center transition">
      <input
        ref={publicKeyInput}
        type="text"
        value={stringifyKey(keys()?.publicKey)}
        placeholder="Type key here..."
        class="input input-sm input-bordered w-full max-w-xs event-pointers-none"
      />
      <div class="tooltip tooltip-bottom" data-tip="Copy">
        <button class="btn btn-sm btn-ghost" onclick={() => toClipboard(stringifyKey(keys()?.publicKey), publicKeyInput)}>
          <TbCopy size={16} />
        </button>
      </div>
    </label>
    <label class="label font-bold text-sm">
      Private key
    </label>
    <label class="flex gap-3 justify-center items-center transition">
      <input
        ref={privateKeyInput}
        type={isPrivateKeyHidden() ? "password" : "text"}
        value={stringifyKey(keys()?.privateKey)}
        placeholder="Type key here..."
        class="input input-sm input-bordered w-full max-w-xs event-pointers-none"
      />
      <div class="tooltip tooltip-bottom" data-tip="Hide/Show">
        <label class="swap btn btn-sm btn-ghost">
          <input type="checkbox" checked={!isPrivateKeyHidden()} onchange={() => setIsPrivateKeyHidden(x => !x)} />
          <div class="swap-on"><TbEye size={16} /></div>
          <div class="swap-off"><TbEyeOff size={16} /></div>
        </label>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Copy">
        <button class="btn btn-sm btn-ghost" onclick={() => toClipboard(stringifyKey(keys()?.privateKey), privateKeyInput)}>
          <TbCopy size={16} />
        </button>
      </div>
    </label>
    <div class="btn btn-ghost btn-sm mt-2" onclick={generateKeys}>Regenerate</div>
    {hasError() && <div class="p-2 rounded-lg alert-error text-base-100 mt-2">{error()}</div>}
  </div >
}