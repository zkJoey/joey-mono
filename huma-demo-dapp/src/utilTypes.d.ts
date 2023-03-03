export type WCProps<P = {}> = P & {
  children: React.ReactNode
}

export type IconType = (
  props: SvgIconProps<'svg', {}>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => React.ReactElement<any, string | React.JSXElementConstructor<any>>

export type ColumnType<T> = {
  title: string
  dataIndex?: string
  width?: number
  noSeparator?: boolean
  style?: Record<string, string>
  action?: (record: T) => React.ReactNode
}

export type CustomError = {
  message: string
}
