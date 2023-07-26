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
}
