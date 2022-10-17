import * as React from 'react';
import { pipe, Subject, Observable } from 'rxjs';
import { map, scan, filter, startWith, shareReplay } from 'rxjs/operators';
import { reduceStore } from '@/store/reducer';
import { applicationState, ApplicationState } from '@/store/state';

export interface Action<T> {
  type: string,
  payload: T 
}

interface StoreTemplate<T> {
  state: Observable<T>,
  action: Observable<Action<any>>,
  dispatch: (action: Action<any>) => void
}

export type Store = StoreTemplate<ApplicationState>;
export type UseRenderPipeline<TComponentState> = (store: Store) => Observable<(render: TComponentState) => TComponentState>;
export type UseDispatchPipeline = (store: Store) => Observable<Action<any>>;
export type UsePipeline = (store: Store) => Observable<any>;

const StoreContext = React.createContext(new Object as {
  usePipeline: (fns: UsePipeline | UsePipeline[]) => void,
  useRenderPipeline: <T>(fns: UseRenderPipeline<T> | UseRenderPipeline<T>[], initial: T) => T,
  useDispatchPipeline: (fns: UseDispatchPipeline | UseDispatchPipeline[]) => void,
  dispatch: (action: Action<any>) => void
});

const subject = new Subject<Action<any>>();
const state = subject.asObservable().pipe(scan(reduceStore, applicationState), startWith(applicationState), shareReplay(1));
const action = subject.asObservable();
const dispatch: (action: Action<any>) => void = (action) => subject.next(action);
const store: Store = { state, action, dispatch };

export function ofType<TPayload>(predicate: (payload: TPayload) => Action<TPayload>) {
  return pipe(
    filter((action: Action<TPayload>) => action.type === predicate(new Object as TPayload).type),
    map((action: Action<TPayload>): TPayload => action.payload as TPayload)
  );
}

export function Provider(props: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={{ usePipeline, useRenderPipeline, useDispatchPipeline, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

function useRenderPipeline<T>(fns: UseRenderPipeline<T> | UseRenderPipeline<T>[], initial: T): T {
  const [render, useRender] = React.useState<T>(initial);

  React.useEffect(() => {
    const isArray = Array.isArray(fns),
      subscribe = (fn: UseRenderPipeline<T>) => fn(store).subscribe(useRender),
      subs = isArray ? fns.map(subscribe) : [subscribe(fns)];

    return () => subs.forEach(sub => sub.unsubscribe());
  }, []);

  return render;
}

function usePipeline(fns: UsePipeline | UsePipeline[]): void {
  React.useEffect(() => {
    const isArray = Array.isArray(fns),
      subscribe = (fn: UseDispatchPipeline) => fn(store).subscribe(),
      subs = isArray ? fns.map(subscribe) : [subscribe(fns)];

    return () => subs.forEach(sub => sub.unsubscribe());
  }, []);
}

function useDispatchPipeline(fns: UseDispatchPipeline | UseDispatchPipeline[]): void {
  React.useEffect(() => {
    const isArray = Array.isArray(fns),
      subscribe = (fn: UseDispatchPipeline) => fn(store).subscribe(dispatch),
      subs = isArray ? fns.map(subscribe) : [subscribe(fns)];

    return () => subs.forEach(sub => sub.unsubscribe());
  }, []);
}

export const useStore = () => {
  return React.useContext(StoreContext);
}

