import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';
import { previousMonthId, currentMonthId, nextMonthId, DateDetail } from './';

import { previousInTransitionView, nextInTransitionView } from '@/store/action';
import { useStore, Action } from '@/store';
import { FilterItem } from '@/store/state';
import { SHORTDAYS, MONTHS, SHORTMONTHS } from './';
import onInitSetMonthTransitionView from './dispatches/on-init-set-month-transition-view';
import InteractiveFlatIconButton from '@/common/structures/buttons/interactive-flat-icon';
import TransitionView, { TransitionViewWrapper } from '@/common/components/transition-view';
import PointedButton from '@/common/components/buttons/pointed';
import ofViewTransitionUpdateDates from './renders/of-view-transition-update-dates';

interface Props {
  id?: string,
  onToggle: (date: FilterItem) => Action<any>
}

const base = _["calender"];

const dayChild = [
  _["calender__day"],
  Style["--inter"],
  Style["--fg-gb700"],
  Style["--bg-s25"]
].join(' ');

const monthChild = [
  _["calender__month"],
  Style["--inter"],
  Style["--size-xs"],
  Style["--fg-gb700"]
].join(' ');

const dateChild = [
  _["calender__date"],
  Style["--inter"],
  Style["--size-tsm"],
  Style["--fg-gb500"],
  Style["--bg-gb25"]
].join(' ');

const toDDMMYYYY = (json: string) => {
  const date = new Date(json);

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export default function DefaultCalender(props: Props) {
  const { useRenderPipeline, useDispatchPipeline, dispatch } = useStore(),
    { onToggle } = props,

    render = useRenderPipeline(
      ofViewTransitionUpdateDates(),
      { calender: null }
    );

  useDispatchPipeline(
    onInitSetMonthTransitionView()
  );

  return (
    <div className={base}>
      <div className={monthChild}>
        <PointedButton
          direction="left"
          onClick={() => dispatch(previousInTransitionView({ id: [previousMonthId, currentMonthId, nextMonthId] }))}
        >
          <TransitionViewWrapper style={{ width: '64px' }}>
            <TransitionView id={previousMonthId}>
              {SHORTMONTHS.map((i, key) => <span key={key}>{i}</span>)}
            </TransitionView>
          </TransitionViewWrapper>
        </PointedButton>
        <div>
          <TransitionViewWrapper style={{ width: '200px' }}>
            <TransitionView id={currentMonthId}>
              {MONTHS.map(i => <span key={i}>{i} {render.calender?.current.getFullYear()}</span>)}
            </TransitionView>
          </TransitionViewWrapper>
        </div>
        <PointedButton
          onClick={() => dispatch(nextInTransitionView({ id: [previousMonthId, currentMonthId, nextMonthId] }))}
        >
          <TransitionViewWrapper style={{ width: '64px' }}>
            <TransitionView id={nextMonthId}>
              {SHORTMONTHS.map((i, key) => <span key={key}>{i}</span>)}
            </TransitionView>
          </TransitionViewWrapper>
        </PointedButton>
      </div>
      <div className={dayChild}>
        {SHORTDAYS.map(day => <span key={day}>{day}</span>)}
      </div >
      <div className={dateChild}>
        {
          render.calender?.dates.map((i: DateDetail, key: number) => {
            return <InteractiveFlatIconButton
              key={i.time+key}
              selected={i.selected}
              hidden={!i.activated}
              disabled={i.expired}
              onClick={() => dispatch(onToggle({ id: i.json, display: toDDMMYYYY(i.json)  }))}
            >
              {i.display}
            </InteractiveFlatIconButton>
          })
        }
      </div>
    </div >
  );
}

