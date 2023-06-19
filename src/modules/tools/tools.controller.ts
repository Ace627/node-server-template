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

  @Get('qqInfo')
  @ApiOperation({ summary: '根据 QQ 号获取用户信息' })
  @ApiQuery({ name: 'qq', required: true, type: 'string', description: 'QQ 号码' })
  getQQInfo(@Query('qq') qq: string) {
    if (!isQQ(qq)) throw new HttpException('QQ 号码格式异常', HttpStatus.BAD_REQUEST)
    return this.toolsService.getQQInfo(qq)
  }
}
