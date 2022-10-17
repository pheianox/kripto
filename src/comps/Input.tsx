import { Component, createSignal } from "solid-js"
import { toClipboard } from "../utils"
import { TbClearAll, TbCopy } from "solid-icons/tb"
import { store } from "../store"


export const Input: Component = () => {
  let textarea: HTMLTextAreaElement | undefined
  const [state, setState] = store

  return <div class="card bg-base-100 shadow-xl w-96">
    <div class="card-body gap-2">
      <h1 class="label font-bold">Input</h1>
      <textarea
        ref={textarea}
        class="textarea textarea-bordered"
        rows={3}
        placeholder="Type here"
        spellcheck={false}
        value={state.input}
        oninput={evt => setState("input", evt.currentTarget.value)}
      />
      <div class="label">
        <button
          class="btn btn-xs btn-ghost gap-2"
          onclick={() => setState("input", "")}
        >
          Clear <TbClearAll size={12} />
        </button>

        <button
          class="btn btn-xs btn-ghost gap-2"
          onclick={() => toClipboard(state.input, textarea)}
        >
          Copy <TbCopy size={12} />
        </button>
      </div>
    </div>
  </div>
}