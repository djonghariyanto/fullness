import Pass from './pass';

export interface Action<T> {
  type: string,
  payload: T
}

export const on = <TState, TPayload>(fn: (payload: TPayload) => Action<TPayload>, handler: (state: TState, payload: TPayload) => TState):
  [string, ((state: TState, payload: TPayload) => TState)] =>
  [fn(new Object as TPayload).type, handler];

export const createReducer = <TState>(...ons: [string, ((state: TState, payload: any) => TState)][]) =>
  (state: TState, action: Action<any>): TState => {
    const on = ons.find(o => o[0] === action.type);

    return on ? on[1](state, action.payload) : state
  }

export const props = <T>() => new Object as T;

export const createAction = <T>(type: string, properties: T) => 
  (payload: typeof properties): Action<typeof properties> => ({ type, payload });

export { Pass };
