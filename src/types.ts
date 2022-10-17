import { Component } from "solid-js"

export enum DataType {
  Binary = "Binary",
  PlainText = "PlainText",
  Hexadecimal = "Hexadecimal"
}


export interface Module {
  name: string,
  category: ModuleCategory,
  component: Component
}

export enum ModuleCategory {
  Symmetric = "Symmetric",
  Asymetric = "Asymmetric",
  Mixed = "Mixed"
}

export interface State {
  input: string,
  result: string,
  micsSpent: number,
  loading: boolean,
}
