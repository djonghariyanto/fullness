import * as React from 'react';
import { useStore, UseRenderPipeline } from '@/store';

interface Behavior {
  disabled: boolean,
  selected: boolean,
  hidden: boolean
}

interface Props {
  selected?: boolean,
  hidden?: boolean,
  disabled?: boolean,
  onObserve: UseRenderPipeline<Partial<Behavior>> | UseRenderPipeline<Partial<Behavior>>[] 
  children: React.ReactElement
}

export default function BindBehavior(props: Props) {
  const { useRenderPipeline } = useStore(),
    { selected, hidden, disabled }: Behavior = Object.assign({}, { disabled: false, hidden: false, selected: false }, props),

    render = useRenderPipeline<Partial<Behavior>>(
      props.onObserve,
      { 
        selected: selected,
        hidden: hidden,
        disabled: disabled
      }
    );

  return {
    ...props.children,
    props: {
      ...props.children.props,
      ...render
    }
  }
}
