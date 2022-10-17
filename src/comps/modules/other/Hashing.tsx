import { Component, createEffect, createSignal } from "solid-js"
import { FaSolidGears } from "solid-icons/fa"
import { toClipboard } from "../../../utils"
import { TbCopy } from "solid-icons/tb"
import { store } from "../../../store"
import { DataType } from "../../../types"
import Hexgen from 'hex-generator'
import CryptoJS from 'crypto-js'


const defaultOptionIndex = 0
const options = [
  { name: 'MD5', keySizeInBits: 128, basic: CryptoJS.MD5, hmac: CryptoJS.HmacMD5 },
  { name: 'SHA-1', keySizeInBits: 160, basic: CryptoJS.SHA1, hmac: CryptoJS.HmacSHA1 },
  { name: 'RIPEMD-160', keySizeInBits: 160, basic: CryptoJS.RIPEMD160, hmac: CryptoJS.HmacRIPEMD160 },
  { name: 'SHA-224', keySizeInBits: 224, basic: CryptoJS.SHA224, hmac: CryptoJS.HmacSHA224 },
  { name: 'SHA-256', keySizeInBits: 256, basic: CryptoJS.SHA256, hmac: CryptoJS.HmacSHA256 },
  { name: 'SHA-384', keySizeInBits: 384, basic: CryptoJS.SHA384, hmac: CryptoJS.HmacSHA384 },
  { name: 'SHA-512', keySizeInBits: 512, basic: CryptoJS.SHA512, hmac: CryptoJS.HmacSHA512 },
]

export const Hashing: Component = () => {
  const [state, setState] = store
  const [option, setOption] = createSignal(options[defaultOptionIndex])
  const [isHmac, setHmac] = createSignal(false)
  const [hmacKey, setHmacKey] = createSignal("")
  let hmacKeyInput: HTMLInputElement | undefined

  createEffect(() => {
    setState("loading", true)
    const input = state.input
    const startTime = window.performance.now()
    const cipher = isHmac() ? option().hmac(input, hmacKey()) : option().basic(input)
    setState("micsSpent", window.performance.now() - startTime)
    setState("result", cipher.toString())
    setState("loading", false)
  })

  return <div class="flex flex-col gap-2">
    <label class="label font-bold">
      Algorithm
    </label>
    <select class="select select-bordered select-sm" onchange={evt => setOption(options.find(opt => opt.name === evt.currentTarget.value) as NonNullable<any>)}>
      {options.map((opt) => <option value={opt.name} selected={opt === option()}>{isHmac() ? "HMAC-" : ""}{opt.name}</option>)}
    </select>

    <div class="label font-bold transition" classList={{ "opacity-50": !isHmac() }}>
      Secret key
      <input
        type="checkbox"
        class="toggle toggle-sm toggle-primary"
        checked={isHmac()}
        onchange={() => setHmac(!isHmac())}
      />
    </div>
    <label class="flex gap-3 justify-center items-center transition" classList={{ "pointer-events-none opacity-50": !isHmac() }}>
      <input
        ref={hmacKeyInput}
        type="text"
        value={hmacKey()}
        placeholder="Type key here..."
        oninput={e => setHmacKey(e.currentTarget.value)}
        class="input input-sm input-bordered w-full max-w-xs"
      />
      <div class="tooltip tooltip-bottom" data-tip="Generate">
        <button class="btn btn-sm btn-ghost" onclick={() => setHmacKey(Hexgen(option().keySizeInBits))}>
          <FaSolidGears size={16} />
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Copy">
        <button class="btn btn-sm btn-ghost" onclick={() => toClipboard(hmacKey(), hmacKeyInput)}>
          <TbCopy size={16} />
        </button>
      </div>
    </label>
  </div>
}