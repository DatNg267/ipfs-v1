import { createContext } from 'react'

export type StatusRevoke = 'none' | 'revoking'
export type ApiKeysPageContextProps = {
  handleRefreshApiKeysList: () => void
  handleRevokeApiKey: (id: string) => void
  handleOpenRevokeModal: (id: string, name: string) => void
  setStatusRevoke: (status: StatusRevoke) => void
  statusRevoke: StatusRevoke
}
export const ApiKeysPageContext = createContext<ApiKeysPageContextProps>({
  handleRefreshApiKeysList: () => {},
  handleRevokeApiKey: () => {},
  handleOpenRevokeModal: () => {},
  setStatusRevoke: () => {},
  statusRevoke: 'none',
})
