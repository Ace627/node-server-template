import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'
import dayjs from 'dayjs'
import crypto from 'crypto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('工具类接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tools/uuid')
  @ApiOperation({ summary: '随机生成一个 uuid' })
  getUUID(): string {
    return crypto.randomUUID()
  }
}
