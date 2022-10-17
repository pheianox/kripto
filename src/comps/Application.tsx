import { Component, createSignal } from "solid-js"
import { Output } from "./Output"
import { Input } from "./Input"
import { groupBy } from "lodash"
import { ModuleCategory } from "../types"

import { AES } from "./modules/symmetric/AES"
import { DES } from "./modules/symmetric/DES"
import { TripleDES } from "./modules/symmetric/3DES"
import { RC4 } from "./modules/symmetric/RC4"
import { RSA } from "./modules/asymmetric/RSA"
import { Hashing } from "./modules/other/Hashing"
import { MorseCode } from "./modules/other/MorseCode"
import { CaesarCipher } from "./modules/other/CaesarCipher"

const DEFAULT_MODULE_INDEX = 0
const MODULES = [
  { name: "Hashing", category: ModuleCategory.Mixed, component: Hashing },
  { name: "Morse Code", category: ModuleCategory.Mixed, component: MorseCode },
  { name: "Caeser Cipher", category: ModuleCategory.Mixed, component: CaesarCipher },

  { name: "DES", category: ModuleCategory.Symmetric, component: DES },
  { name: "3DES", category: ModuleCategory.Symmetric, component: TripleDES },
  { name: "AES", category: ModuleCategory.Symmetric, component: AES },
  { name: "RC4", category: ModuleCategory.Symmetric, component: RC4 },

  { name: "RSA", category: ModuleCategory.Asymetric, component: RSA },
]

export const Application: Component = () => {
  const [module, setModule] = createSignal(MODULES[DEFAULT_MODULE_INDEX])

  return <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="flex flex-wrap justify-center items-start gap-5">
        <Input />
        <div class="card bg-base-100 shadow-xl w-96">
          <div class="card-body items-algin-end">
            <h1 class="label font-bold">{module().name}
              <select
                oninput={evt => setModule(MODULES.find(opt => opt.name === evt.currentTarget.value) as NonNullable<any>)}
                value={module().name}
                class="select select-ghost select-xs"
              >
                {Object.entries(groupBy(MODULES, mod => mod.category)).map(([groupName, groupItems]) =>
                  <>
                    <optgroup label={groupName}>
                      {groupItems.map((opt, idx) =>
                        <option selected={idx === DEFAULT_MODULE_INDEX} value={opt.name}>{opt.name}</option>
                      )}
                    </optgroup>
                  </>
                )}
              </select>
            </h1>
            {module().component({})}
          </div>
        </div>
        <Output />
      </div>
    </div>
  </div>
}
