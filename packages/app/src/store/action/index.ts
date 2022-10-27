import { ReactElement } from 'react';
import { createAction, props } from '@fullness/core';

import { Page, HistoryAction } from '@/pages';
import { Action } from '../'
import { Filter, Status, Session, StateError, RegisterEntry, LoginEntry } from '../state';

const setStatus = createAction(
  '[Status] set status',
  props<Partial<Status>>()
);

export const activateDialog = createAction(
  '[Dialog] activate dialog',
  props<{ Component: ReactElement, payload?: unknown }>()
);

export const closeDialog = createAction(
  '[Dialog] close dialog',
  props<{ withConfirmation: boolean }>()
);

export const updateDialogResult = createAction(
  '[Dialog] update dialog result',
  props<{ result: any }>()
);

export const toggleMenuSide = createAction(
  '[Menu Side] toggle menu side',
  props<void>()
);

export const setMenuSideComponent = createAction(
  '[Menu Side] set menu side component',
  props<{ Component: ReactElement }>()
);

export const closeMenuSide = createAction(
  '[Menu Side] close menu side',
  props<void>()
);

export const activateMenuPopup = createAction(
  '[Menu Popup] activate menu popup',
  props<{ Component: ReactElement, byRef: EventTarget & Element }>()
);

export const closeMenuPopup = createAction(
  '[Menu Popup] close menu popup',
  props<void>()
);

export const activateSearchPopup = createAction(
  '[Search Popup] activate search popup',
  props<{ Component: ReactElement, byRef: EventTarget & Element, inputRef: EventTarget & Element }>()
);

export const closeSearchPopup = createAction(
  '[Search Popup] close search popup',
  props<void>()
);

export const fetchSearchTerm = createAction(
  '[Search Popup] fetch search term',
  props<void>()
);

export const updateResultTerm = createAction(
  '[Search Popup] update result term',
  props<string[]>()
);

export const gotoSearchResultIndex = createAction(
  '[Search Popup] goto search result index',
  props<{ index: number, shouldUpdate: boolean }>()
);

export const loadPath = createAction(
  '[Page] load path',
  props<{ pathname: string, historyAction?: HistoryAction, search?: string }>()
);

export const commitPage = createAction(
  '[Page] commit page',
  props<{ page: Page, historyAction?: HistoryAction, search?: string }>()
);

export const setTransitionViewIndex = createAction(
  '[Transition View] set transition view index',
  props<{ id: string | string[], index: number }>()
);

export const nextInTransitionView = createAction(
  '[Transition View] next in transition view',
  props<{ id: string | string[], payload?: unknown }>()
);

export const previousInTransitionView = createAction(
  '[Transition View] previous in transition view',
  props<{ id: string | string[], payload?: unknown }>()
);

export const loginUser = createAction(
  '[Auth] login user',
  props<void>()
);

export const registerUser = createAction(
  '[Auth] register user',
  props<void>()
);

export const updateLoginEntry = createAction(
  '[Auth] update login entry',
  props<Partial<LoginEntry>>()
);

export const updateRegisterEntry = createAction(
  '[Auth] update register entry',
  props<Partial<RegisterEntry>>()
);

export const throwError = createAction(
  '[Error] throw error',
  props<StateError>()
);

export const startAuthenticatedSession = createAction(
  '[Session] start authenticated session',
  props<Session>()
);

export const endAuthenticatedSession = createAction(
  '[Session] end authenticated session',
  props<void>()
);

export const setFilter = createAction(
  '[Filter] set filter',
  props<Partial<Filter>>()
);

export const toggleFilterMatch = createAction(
  '[Filter] toggle filter match',
  props<number>()
);

export const removeEmptyFilter = createAction(
  '[Filter] remove empty filter',
  props<void>()
);

export const addFilter = createAction(
  '[Filter] add filter',
  props<{ id: string, display: string }>()
);

export const fetchEvent = createAction(
  '[Event] fetch event',
  props<{ index: number } | void>()
);

export const updateEvent = createAction(
  '[Event] update event',
  props<any[]>()
);

export const subStore = createAction(
  '[Sub Store]',
  props<{ type: string, payload?: unknown }>()
);

export const readyToSubmit: () => Action<Partial<Status>> = () => setStatus({ submitEntry: true, loading: true });
export const resetStatusError: () => Action<Partial<Status>> = () => setStatus({ hasErrorOccured: false });
export const editFiltersByIndex: ([editMode, editFilterIndex]: ['insert' | 'update', number]) => Action<Partial<Status>> =
  ([editMode, editFilterIndex]) => setStatus({ editFilterIndex, editMode });
export const throwAuthenticationError: () => Action<StateError> = () => throwError({ type: "authentication" });
export const throwValidationError: () => Action<StateError> = () => throwError({ type: "validation" });

export { setStatus };
