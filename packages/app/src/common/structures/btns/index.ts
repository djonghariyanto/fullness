export interface Props {
  children: React.ReactNode | React.ReactElement | React.ReactElement[]
  style?: React.CSSProperties,
  onClick?: React.ReactEventHandler,
  onClickCapture?: React.ReactEventHandler,
  selected?: boolean,
  disabled?: boolean,
  hidden?: boolean
}

export const initialProps = {
  hidden: false,
  selected: false,
  disabled: false
}

