// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: undefined | null | any) =>
  value === undefined || value === null

export const openInNewTab = (url: string) => {
  // @ts-ignore
  window.open(url, '_blank').focus()
}
