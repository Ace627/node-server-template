import { networkInterfaces } from 'os'

export function getWlanIP(): string {
  const networkInfo = networkInterfaces()
  let ip = ''
  for (const key in networkInfo) {
    if (key.toUpperCase() === 'WLAN') {
      for (const item of networkInfo[key]) {
        if (item.family === 'IPv4') ip = item.address
      }
    }
  }
  return ip
}
