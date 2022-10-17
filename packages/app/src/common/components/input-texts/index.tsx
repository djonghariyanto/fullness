import * as React from 'react';
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { default as _ } from './main.css';
import { useStore } from '@/store';

export interface Props {
  name: string,
  className: string,
  label: string,
  type?: string,
  spellCheck?: boolean,
  autoCorrect?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const baseWrapper = _["input"];
const baseLabel = _["input__label"];
const restLabel = [baseLabel, _["input__label--rest"]].join(' ');

export default function InputText(props: Props) {
  const { label, name, ...rest } = props,
    { useRenderPipeline } = useStore(),
    ref = React.useRef(null),

    render = useRenderPipeline(
      [
        () => fromEvent(ref.current, 'focus')
          .pipe(
            map(() => (render: { labelClass: string }) => ({
              ...render,
              labelClass: restLabel
            }))
          ),
        () => fromEvent(ref.current, 'blur')
          .pipe(
            filter((e: React.ChangeEvent<HTMLInputElement>) => e.target?.value.length === 0),
            map(() => (render: { labelClass: string }) => ({
              ...render,
              labelClass: baseLabel
            }))
          )
      ],
      { labelClass: baseLabel }
    );

  return (
    <div className={baseWrapper}>
      <label htmlFor={name} className={render.labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        {...rest}
      />
    </div>
  );
}
