import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'

import { DocumentActions } from './reducer'
import {
  DocumentContent,
  Navs,
  NavPage,
  DocumentFiles,
} from '@/modules/document/types'
import { PageRefsMapping } from '@/modules/document/types/page-refs'

export function useUpdateDocumentContent(): (
  content: DocumentContent | null
) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (content: DocumentContent | null) =>
      dispatch(DocumentActions.updateDocumentData(content)),
    [dispatch]
  )
}
export function useUpdateNavbarData(): (navbarData: Navs | null) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (navbarData: Navs | null) =>
      dispatch(DocumentActions.updateNavbar(navbarData)),
    [dispatch]
  )
}
export function useUpdateDocumentFiles(): (
  files: DocumentFiles | null
) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (files: DocumentFiles | null) =>
      dispatch(DocumentActions.updateDocumentFiles(files)),
    [dispatch]
  )
}
export function useUpdatePageRefsMapping(): (
  pageRefsMapping: PageRefsMapping
) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (pageRefsMapping: PageRefsMapping) =>
      dispatch(DocumentActions.updatePageRefsMapping(pageRefsMapping)),
    [dispatch]
  )
}

const findPage = (page: NavPage, pageId: string): NavPage | undefined => {
  for (let index = 0; index < page.pages.length; index++) {
    const element = page.pages[index]
    if (element.id === pageId) return element
    const res = findPage(element, pageId)
    if (res) {
      return res
    } else {
    }
  }
}

export function useFindPage(): (pageId: string) => NavPage | null {
  const { navbar } = useAppSelector((state) => state.document)
  return useCallback(
    (pageId: string) => {
      if (!navbar) return null
      for (let index = 0; index < navbar.pages.length; index++) {
        const element = navbar.pages[index]
        if (element.id === pageId) return element
        const res = findPage(element, pageId)
        if (res) {
          return res
        } else {
        }
      }
      return null
    },
    [navbar]
  )
}
