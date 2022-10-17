import * as React from 'react';
import { default as _ } from './main.css';
import { useStore } from '@/store';

import onResizeUpdateView from './renders/on-resize-update-view';
import EventCardRow from './common/component.event-card-row';
import switchCount from './common/util.switch-count';

export default function ResponsiveEventCardList() {
  const { useRenderPipeline } = useStore(),
    ref = React.useRef(null),

    render = useRenderPipeline(
      [
        onResizeUpdateView<{ events: React.ReactElement[], className: string }>(
          ref,
          ([count, events]) => ({
            className: switchCount(count),
            events: Array.from({ length: Math.ceil(events.length / count) }, (_, index) =>
              <EventCardRow key={index} index={index} count={count} events={events} />)
          })
        )
      ],
      { events: [], className: _["responsive-event-card-list"] }
    );

  return (
    <div ref={ref} className={render.className}>
      {render.events}
    </div>
  );
}
