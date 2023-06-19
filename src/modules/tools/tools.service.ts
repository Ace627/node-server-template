import { Injectable } from '@nestjs/common'
import crypto from 'crypto'
import axios from 'axios'
import iconvLite from 'iconv-lite'

@Injectable()
export class ToolsService {
  // 随机生成一个 uuid
  getUUID(): string {
    return crypto.randomUUID()
  }

  // 随机生成一个 Hex 格式的颜色
  getRandomHexColor(): string {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
  }

  // 随机生成一个 Rgb 格式的颜色
  getRandomRgbColor(): string {
    const random = (): number => Math.floor(Math.random() * 256)
    return `rgb(${random()}, ${random()}, ${random()})`
  }

  // 根据 QQ 号获取用户信息
  async getQQInfo(qq: string) {
    const resposne = await axios.get(`http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?g_tk=1518561325&uins=${qq}`, { responseType: 'arraybuffer' })
    const nameReg = /portraitCallBack\((.*)\)/i
    const result = iconvLite.decode(resposne.data, 'GB2312')
    const nickname = result.includes('error') ? '未知用户' : JSON.parse(result.match(nameReg)[1])[qq].at(-2) || ''
    const email = `${qq}@qq.com`
    const avatar = `http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100&t=${Date.now()}`
    return { qq, nickname, email, avatar }
  }
}
