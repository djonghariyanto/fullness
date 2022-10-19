import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';
import { previousMonthId, currentMonthId, nextMonthId, DateDetail, toDDMMYYYY } from './';

import { previousInTransitionView, nextInTransitionView, subStore } from '@/store/action';
import { toggleDate } from '@/common/components/filter-group/store/action';
import { useStore } from '@/store';
import { SHORTDAYS, MONTHS, SHORTMONTHS } from './';
import onInitSetMonthTransitionView from './dispatches/on-init-set-month-transition-view';
import FlatButton from '@/common/structures/btns/flat';
import SecondaryIconWrapper from '@/common/structures/wrappers/secondary-icon';
import TransitionView, { TransitionViewWrapper } from '@/common/components/transition-view';
import PointedButton from '@/common/components/buttons/pointed';
import ofSubStoreToggleDate from './renders/of-sub-store-toggle-date';
import BindBehavior from '@/common/components/binds/behavior';
import ofViewTransitionUpdateDates from './renders/of-view-transition-update-dates';

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

export default function DefaultCalender() {
  const { useRenderPipeline, useDispatchPipeline, dispatch } = useStore(),

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
          render.calender?.dates.map((i: DateDetail, key: number) =>
            <SecondaryIconWrapper key={i.time + key}>
              <BindBehavior
                selected={i.selected}
                hidden={!i.activated}
                disabled={i.expired}
                onObserve={ofSubStoreToggleDate(key)}
              >
                <FlatButton
                  onClick={() => dispatch(subStore({
                    type: toggleDate,
                    payload: { index: key, id: i.json, display: toDDMMYYYY(i.json) }
                  }))}
                >
                  {i.display}
                </FlatButton>
              </BindBehavior>
            </SecondaryIconWrapper>
          )
        }
      </div>
    </div >
  );
}
