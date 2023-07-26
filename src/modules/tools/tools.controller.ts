import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ToolsService } from './tools.service'
import { isQQ } from '@/utils/validate'

@ApiTags('工具类接口')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('uuid')
  @ApiOperation({ summary: '随机生成一个 uuid' })
  getUUID(): string {
    return this.toolsService.getUUID()
  }

  @Get('randomHexColor')
  @ApiOperation({ summary: '随机生成一个 Hex 格式的颜色' })
  getRandomHexColor(): string {
    return this.toolsService.getRandomHexColor()
  }

  @Get('randomRgbColor')
  @ApiOperation({ summary: '随机生成一个 Rgb 格式的颜色' })
  getRandomRgbColor(): string {
    return this.toolsService.getRandomRgbColor()
  }
}
