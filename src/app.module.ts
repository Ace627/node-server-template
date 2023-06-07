import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

/**
 * 1 分钟内只能请求 60 次，超过则报 status 为 429 的错误
 */
@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 60 })],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
