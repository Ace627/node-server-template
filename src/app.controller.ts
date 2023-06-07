import crypto from 'crypto'
import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('工具类接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tools/uuid')
  @ApiOperation({ summary: '随机生成一个 uuid' })
  getUUID(): string {
    return crypto.randomUUID()
  }

  @Get('/tools/randomHexColor')
  @ApiOperation({ summary: '随机生成一个 Hex 格式的颜色' })
  getRandomHexColor(): string {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
  }

  @Get('/tools/randomRgbColor')
  @ApiOperation({ summary: '随机生成一个 Rgb 格式的颜色' })
  getRandomRgbColor(): string {
    const random = (): number => Math.floor(Math.random() * 256)
    return `rgb(${random()}, ${random()}, ${random()})`
  }
}
