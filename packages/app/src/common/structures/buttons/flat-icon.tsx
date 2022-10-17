import * as React from 'react';
import { iconBase, iconChild, IconButtonProps } from './';
import { default as _ } from './main.css';

const base = [iconBase, _["btn--flat"]].join(' ');
const selectedBase = [base, _["btn--flat-selected"]].join(' ');
const hiddenBase = [base, _["btn--hidden"]].join(' ');
const disabledBase = [base, _["btn--flat-disabled"]].join(' ');

const switchBase = (selected: boolean, disabled: boolean, hidden: boolean) =>
  hidden
    ? hiddenBase
    : disabled
      ? disabledBase
      : selected
        ? selectedBase
        : base

const FlatIconButton = React.forwardRef(function FlatIconButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { children, selected, disabled, hidden, ...rest } = Object.assign(
    {}, { hidden: false, selected: false, disabled: false }, props),
    finalBase = switchBase(selected, disabled, hidden);

  return (
    <button ref={ref} className={finalBase} {...rest}>
      <div className={iconChild}>
        {children}
      </div>
    </button>
  );
});

export default FlatIconButton;
