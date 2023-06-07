import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

/**
 * 控制层，主要是写路由相关代码以及处理前端传来的一些参数
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
