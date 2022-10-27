import * as React from 'react';
import { default as _ } from './main.css';

import EventThumnbnailImage from '@/common/structures/images/event-thumbnail';
import RowList from '@/common/structures/lists/row';
import PrimaryLink from '@/common/structures/links/primary';
import PrimaryTitle from '@/common/structures/titles/primary';
import PrimaryLabel from '@/common/structures/labels/primary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import TertiaryLabel from '@/common/structures/labels/tertiary';
import TitleWrapper from '@/common/structures/wrappers/title';
import { SHORTMONTHS, getTimeInText } from '@/common/components/calenders';

interface Props { url?: string,
  event: any,
  children: React.ReactElement[] | React.ReactNode;
}

const cloudUrl = 'https://res.cloudinary.com/dlnhte8yd/image/upload/c_fill,h_320,w_640/';

const base = _["event-card"];
const imageChild = _["event-card__image"];
const descChild = _["event-card__desc"];
const dateChild = _["event-card__desc__date"];
const titleChild = _["event-card__desc__title"];

export default function EventCard(props: Props) {
  const imgUrl = `${cloudUrl}${props.url}`,
    startDate = new Date(props.event.startDate);

  return (
    <div className={base}>
      <div className={imageChild}>
        <a onClick={() => console.log('asdsad')}>
          <EventThumnbnailImage src={imgUrl} />
        </a>
      </div>
      <div className={descChild}>
        <div className={dateChild}>
          <RowList>
            <PrimaryLabel>
              {startDate.getDate()}
            </PrimaryLabel>
            <SecondaryLabel>
              {SHORTMONTHS[startDate.getMonth()]}
            </SecondaryLabel>
          </RowList>
        </div>
        <div className={titleChild}>
          <PrimaryLink href="">
            {props.event.owner}
          </PrimaryLink>
          <PrimaryTitle>
            <TitleWrapper>
              {`${props.children} Babon Gila`}
            </TitleWrapper>
          </PrimaryTitle>
          <div style={{ marginTop: '12px' }}>
            <span style={{ display: 'flex' }}>
              <TertiaryLabel>
                Start time at {getTimeInText(startDate)}
              </TertiaryLabel>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
