import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'
import dayjs from 'dayjs'
import crypto from 'crypto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import poemList from '@/db/poems.json'

@ApiTags('工具类接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tools/uuid')
  @ApiOperation({ summary: '随机生成一个 uuid' })
  getUUID(): string {
    return crypto.randomUUID()
  }

  @Get('/tools/poem')
  @ApiOperation({ summary: '随机一条诗词名句' })
  getRandomPoem(): any {
    const record = poemList[Math.floor(Math.random() * poemList.length)]
    return record
  }
}
