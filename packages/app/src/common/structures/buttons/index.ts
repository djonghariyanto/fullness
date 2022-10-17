import { default as _ } from './main.css';

export interface IconButtonProps {
  children: React.ReactElement | React.ReactNode,
  style?: React.CSSProperties,
  onClick?: React.ReactEventHandler,
  selected?: boolean,
  disabled?: boolean,
  hidden?: boolean
}

const iconBase = [
  _["btn"],
  _["btn--icon"]
].join(' ');

const iconChild = _["btn--icon__content"];

const buttonBase = [
  _["btn"]
].join(' ');

export { iconBase, iconChild, buttonBase }
