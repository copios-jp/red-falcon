import { ipcRenderer } from 'electron'

const ACTIVATE = 'activate'
const DEACTIVATE = 'deactivate'

export const Activate = () => {
  ipcRenderer.send(ACTIVATE)
}
export const Deactivate = () => {
  ipcRenderer.send(DEACTIVATE)
}

export default ipcRenderer

