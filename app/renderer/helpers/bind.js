import { ipcRenderer } from 'electron'

export default function(action)  {
  console.log(this)
  Object.keys(this.mainEvents).forEach((handler) => {
    this.mainEvents[handler].forEach((event) => {
      ipcRenderer[action](event, this[handler])
    })
  })
}

