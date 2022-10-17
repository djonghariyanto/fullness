import { ReactElement } from 'react';
import { ErrorType } from '@/common/errors';
import { Page, HistoryAction } from '@/pages';

export interface FilterItem {
  id: string,
  display: string,
}

export interface Filter {
  dates: FilterItem[],
  categories: FilterItem[],
  matchAll: boolean
}

export interface Status {
  loading: boolean,
  currentPage: Page,
  hasSearch: boolean,
  historyAction: HistoryAction,
  hasErrorOccured: boolean,
  submitEntry: boolean,
  authenticatedSession: boolean,
  hasDialogActivated: boolean,
  hasMenuPopupActivated: boolean,
  hasMenuSideActivated: boolean,
  isFilterUsed: boolean,
  editMode: 'insert' | 'update',
  editFilterIndex: number,
  searchFilterIndex: number
}

export interface Dialog {
  withClose: boolean,
  Component: ReactElement,
  result: any
}

export interface MenuPopup {
  Component?: ReactElement,
  byRef?: EventTarget & Element
}

export interface MenuSide {
  Component?: ReactElement,
}

export interface Session {
  username: string
}

export interface StateError {
  type: ErrorType
}

export interface Entry<T> {
  value: T,
  isValidEntry?: boolean,
  invalidMessage?: string
}

export interface Session {
  username: string
  verified: boolean
}

export interface LoginEntry {
  username: Entry<string>,
  password: Entry<string>
}

export interface RegisterEntry extends LoginEntry {
  rePassword: Entry<string>
}

export interface ApplicationState {
  status: Status,
  entry: LoginEntry | RegisterEntry,
  session: Session,
  error: StateError,
  dialog: Dialog,
  menuPopup: MenuPopup,
  menuSide: MenuSide,
  search: string,
  filters: Filter[],
  events: any[]
}

export const applicationState: ApplicationState = {
  status: {
    loading: false,
    currentPage: 'Root',
    historyAction: 'push',
    hasErrorOccured: false,
    submitEntry: false,
    authenticatedSession: false,
    hasDialogActivated: false,
    hasMenuPopupActivated: false,
    hasMenuSideActivated: false,
    isFilterUsed: false,
    hasSearch: false,
    editMode: 'insert',
    editFilterIndex: 0,
    searchFilterIndex:0
  },
  entry: null,
  session: null,
  error: null,
  dialog: null,
  menuPopup: null,
  menuSide: null,
  search: "",
  filters: [],
  events: []
}

