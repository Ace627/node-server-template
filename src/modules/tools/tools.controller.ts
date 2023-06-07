import { Controller, Get } from '@nestjs/common'
import crypto from 'crypto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('工具类接口')
@Controller('tools')
export class ToolsController {
  @Get('uuid')
  @ApiOperation({ summary: '随机生成一个 uuid' })
  getUUID(): string {
    return crypto.randomUUID()
  }

  @Get('randomHexColor')
  @ApiOperation({ summary: '随机生成一个 Hex 格式的颜色' })
  getRandomHexColor(): string {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
  }

  @Get('randomRgbColor')
  @ApiOperation({ summary: '随机生成一个 Rgb 格式的颜色' })
  getRandomRgbColor(): string {
    const random = (): number => Math.floor(Math.random() * 256)
    return `rgb(${random()}, ${random()}, ${random()})`
  }
}
