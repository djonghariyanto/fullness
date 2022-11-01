import { ReactElement } from 'react';
import { Action } from '../';
import { Filter, ApplicationState, Session, StateError, Status, LoginEntry, RegisterEntry } from '../state';
import { updateEvent, fetchEvent, toggleFilterMatch, fetchSearchTerm, gotoSearchResultIndex, setFilter, removeEmptyFilter, activateDialog, updateDialogResult, closeDialog, toggleMenuSide, setMenuSideComponent, closeMenuSide, activateSearchPopup, closeSearchPopup, updateResultTerm, activateMenuPopup, closeMenuPopup, startAuthenticatedSession, endAuthenticatedSession, throwError, setStatus, commitPage, loadPath, updateLoginEntry, updateRegisterEntry } from '../action';
import { on, createReducer } from '@fullness/core';

type Login = Parameters<typeof updateLoginEntry>[0];
type Register = Parameters<typeof updateRegisterEntry>[0];
type CommitPage = Parameters<typeof commitPage>[0];
type LoadPath = Parameters<typeof loadPath>[0];
type ActivateSearchPopup = Parameters<typeof activateSearchPopup>[0];

const initialIndex = {
  curr: 0,
  prev: 0
}

const isNotEmptyFilter = (filter: Filter) =>
  filter.dates.length > 0 || filter.categories.length > 0

const _reduce = createReducer<ApplicationState>(
  on<ApplicationState, LoadPath>(loadPath, (state, { historyAction, search = "" }) => ({
    ...state,
    status: {
      ...state.status,
      hasSearch: search?.length > 0,
      hasDialogActivated: false,
      historyAction: historyAction === undefined ? 'push' : historyAction,
      loading: true
    },
    search: search
  })),

  on<ApplicationState, CommitPage>(commitPage, (state, { page, historyAction = null, search = null }) => ({
    ...state,
    status: {
      ...state.status,
      currentPage: page,
      hasDialogActivated: false,
      hasSearch: state.status.hasSearch || search != null,
      historyAction: historyAction === null ? state.status.historyAction : historyAction,
      hasMenuPopupActivated: false,
      loading: false,
      hasErrorOccured: false
    },
    search: search != null ? search : state.search,
    menuPopup: null
  })),

  on<ApplicationState, { Component: ReactElement, withClose?: boolean }>(activateDialog, (state, dialog) => ({
    ...state,
    status: {
      ...state.status,
      hasDialogActivated: true
    },
    dialog: {
      ...state.dialog,
      withClose: true,
      ...dialog
    }
  })),

  on<ApplicationState, { withConfirmation: boolean }>(closeDialog, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasDialogActivated: false
    },
    dialog: null
  })),

  on<ApplicationState, { result: any }>(updateDialogResult, (state, dialog) => ({
    ...state,
    dialog: {
      ...state.dialog,
      ...dialog
    }
  })),

  on<ApplicationState, void>(toggleMenuSide, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasMenuSideActivated: !state.status.hasMenuSideActivated
    }
  })),

  on<ApplicationState, { Component: ReactElement }>(setMenuSideComponent, (state, menuSide) => ({
    ...state,
    menuSide: {
      ...state.menuSide,
      ...menuSide
    }
  })),

  on<ApplicationState, void>(closeMenuSide, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasMenuSideActivated: false
    },
    menuSide: null
  })),

  on<ApplicationState, ActivateSearchPopup>(activateSearchPopup, (state, searchPopup) => ({
    ...state,
    status: {
      ...state.status,
      hasSearchPopupActivated: (<HTMLInputElement>state.searchPopup?.inputRef)?.value?.length > 0
    },
    searchPopup: {
      ...state.searchPopup,
      shouldUpdate: false,
      shouldFetch: false,
      index: initialIndex,
      ...searchPopup
    }
  })),

  on<ApplicationState, void>(closeSearchPopup, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasSearchPopupActivated: false
    }
  })),

  on<ApplicationState, void>(fetchSearchTerm, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasSearchPopupActivated: (<HTMLInputElement>state.searchPopup?.inputRef)?.value?.length > 0
    },
    searchPopup: {
      ...state.searchPopup,
      shoudFetch: true,
      shouldUpdate: false,
      index: {
        prev: state.searchPopup.index.curr,
        curr: 0
      }
    }
  })),

  on<ApplicationState, { index: number, shouldUpdate: boolean }>(gotoSearchResultIndex, (state, payload) => {
    const index = Object.assign({}, state.searchPopup.index);

    return {
      ...state,
      searchPopup: {
        ...state.searchPopup,
        shouldFetch: false,
        shouldUpdate: payload.shouldUpdate,
        index: {
          ...state.searchPopup.index,
          curr: payload.index,
          prev: index.curr
        }
      }
    }
  }),

  on<ApplicationState, string[]>(updateResultTerm, (state, result) => ({
    ...state,
    status: {
      ...state.status,
      hasSearchPopupActivated: result.length > 0
    },
    searchPopup: {
      ...state.searchPopup,
      shouldFetch: false,
      result
    }
  })),

  on<ApplicationState, { Component: ReactElement }>(activateMenuPopup, (state, menuPopup) => ({
    ...state,
    status: {
      ...state.status,
      hasMenuPopupActivated: !state.status.hasMenuPopupActivated
    },
    menuPopup: {
      ...state.menuPopup,
      ...menuPopup
    }
  })),

  on<ApplicationState, void>(closeMenuPopup, (state) => ({
    ...state,
    status: {
      ...state.status,
      hasMenuPopupActivated: false
    },
    menuPopup: null
  })),

  on<ApplicationState, void | { index: number }>(fetchEvent, (state, payload) => ({
    ...state,
    status: {
      ...state.status,
      isFilterUsed: payload !== undefined && payload !== null,
      searchFilterIndex: payload !== undefined ? (payload as { index: number })?.index : 1
    }
  })),

  on<ApplicationState, any[]>(updateEvent, (state, events) => ({
    ...state,
    events
  })),

  on<ApplicationState, Login>(updateLoginEntry, (state, entry: LoginEntry) => ({
    ...state,
    entry: {
      ...state.entry,
      ...entry
    }
  })),

  on<ApplicationState, Register>(updateRegisterEntry, (state, entry: RegisterEntry) => ({
    ...state,
    entry: {
      ...state.entry,
      ...entry
    }
  })),

  on<ApplicationState, Partial<Status>>(setStatus, (state, status) => ({
    ...state,
    status: {
      ...state.status,
      ...status
    }
  })),

  on<ApplicationState, Session>(startAuthenticatedSession, (state, session) => ({
    ...state,
    status: {
      ...state.status,
      loading: false,
      submitEntry: false,
      authenticatedSession: session ? true : false
    },
    session: {
      ...state.session,
      ...session
    }
  })),

  on<ApplicationState, void>(endAuthenticatedSession, state => ({
    ...state,
    status: {
      ...state.status,
      loading: false,
      authenticatedSession: false
    },
    session: null
  })),

  on<ApplicationState, Partial<Filter>>(setFilter, (state, filter) => {
    return {
      ...state,
      filters: state.filters.length !== state.status.editFilterIndex
        ? state.filters
          .reduce((a, c) => a.length === state.status.editFilterIndex ? [...a, { ...c, ...filter }] : [...a, c], <Filter[]>[])
        : [...state.filters, Object.assign({}, { dates: [], categories: [] } as Filter, filter)]
    }
  }),

  on<ApplicationState, number>(toggleFilterMatch, (state, filterIndex) => {
    return {
      ...state,
      filters: state.filters.map((filter, i) => i === filterIndex
        ? {
          ...filter,
          matchAll: !filter.matchAll
        }
        : filter
      )
    }
  }),

  on<ApplicationState, void>(removeEmptyFilter, (state) => {
    return {
      ...state,
      filters: state.filters.filter(isNotEmptyFilter)
    }
  }),

  on<ApplicationState, StateError>(throwError, (state, error) => ({
    ...state,
    status: {
      ...state.status,
      loading: false,
      submitEntry: false,
      hasErrorOccured: true
    },
    error: {
      ...state.error,
      ...error
    }
  }))
);

export const reduceStore = (store: ApplicationState, action: Action<any>) => _reduce(store, action);
