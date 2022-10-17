export function toClipboard(text: string, elementToFocus?: any) {
  navigator.clipboard.writeText(text).then(() => {
    if (elementToFocus && 'select' in elementToFocus) {
      elementToFocus?.select()
      setTimeout(() => {
        if (window?.getSelection) { window.getSelection()?.removeAllRanges() }
      }, 200)
    }
  })
}

