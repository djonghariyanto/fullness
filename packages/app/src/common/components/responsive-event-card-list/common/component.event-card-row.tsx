import * as React from 'react';
import { default as _ } from '../main.css';

import EventCard from '@/common/components/event-card';

interface Props {
  index: number,
  count: number,
  events: any[]
}
const base = _["responsive-event-card-list__row"];

export default function EventCardRow(props: Props) {
  const { index, count, events } = props,
    start = index * count,
    end = start + count;

  return (
    <div className={base}>
      {events.slice(start, end).map((event, key: number) =>
        <EventCard key={key} url={event.image} event={event}>
          {event.title}
        </EventCard>)
      }
    </div>
  );
}
