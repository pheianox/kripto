import { Component } from "solid-js"
import { TbCopy, TbSettings } from 'solid-icons/tb'
import { toClipboard } from "../utils"
import { store } from "../store"

export const Output: Component = () => {
  const [state] = store
  const isEmpty = () => state.input.length <= 0

  let textarea: HTMLTextAreaElement | undefined

  return <div class="card bg-base-100 shadow-xl w-96" classList={{ "pointer-events-none": state.loading }}>
    <div class="card-body gap-5">
      <h1 class="label font-bold">Output <span class="text-sm">{Math.round(state.micsSpent * 100) / 100
      } ms</span></h1>
      <div class="form-control gap-2 flex-1 relative" >
        <textarea
          ref={textarea}
          class="textarea textarea-bordered"
          rows={5}
          classList={{ "loading": state.loading, "pointer-events-none": isEmpty() }}
          style="resize: vertical"
          spellcheck={false}
          readonly={true}
          value={isEmpty() ? "" : state.result}
        />
        <label class="label" classList={{ "opacity-50 pointer-events-none": isEmpty() }}>
          <button

            class="label-text-alt btn btn-xs btn-ghost gap-2"
            onclick={() => toClipboard(state.result, textarea)}
          >Copy <TbCopy size={12} /></button>
        </label>
        {state.loading && <div class="absolute top-0 left-0 w-full h-full bg-base-100 rounded-lg grid place-items-center transition">
          <div class="flex flex-col justify-center items-center gap-5">
            <TbSettings size={32} class="animate-spin" />
            <p class="animate-pulse">Proccessing...</p>
          </div>
        </div>}
      </div>
    </div>
  </div >
}