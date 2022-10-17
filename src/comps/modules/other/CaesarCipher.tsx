import { Component, createEffect, createSignal } from "solid-js"
import { store } from "../../../store"
import { XCaesar } from "xcaesar"
import { DataType } from "../../../types"


export const CaesarCipher: Component = () => {
  const [state, setState] = store
  const [shift, setShift] = createSignal(0)
  const [alphabet, setAlphabet] = createSignal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

  createEffect(() => {
    setState("loading", true)
    const input = state.input
    const caesar = XCaesar({ shift: shift(), alphabet: alphabet() })
    const startTime = window.performance.now()
    const cipher = caesar.encrypt(input)
    setState("micsSpent", window.performance.now() - startTime)
    setState("result", cipher.toString())
    setState("loading", false)
  })

  return <div class="flex flex-col gap-2">
    <div class="label font-bold">Alphabet</div>
    <label class="flex gap-3 justify-center items-center">
      <textarea
        value={alphabet()}
        placeholder="Type here"
        spellcheck={false}
        oninput={e => setAlphabet(e.currentTarget.value)}
        class="textarea textarea-bordered min-h-24 w-full max-w-xs"
      />
    </label>

    <div class="label font-bold">Shift</div>
    <label class="flex gap-3 justify-center items-center">
      <input
        type="number"
        value={shift()}
        placeholder="Type here"
        oninput={e => setShift(+e.currentTarget.value)}
        class="input input-sm input-bordered w-full max-w-xs"
      />
    </label>
  </div>
}