import { Catch, ExceptionFilter, ExecutionContext, CallHandler, ArgumentsHost, HttpException } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'

@Catch()
export default class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const request = context.getRequest<Request>()
    const response = context.getResponse<Response>()

    const code = exception.getStatus() || 500 // HTTP 的异常状态码
    const msg = decodeURIComponent(exception.message) || '未知异常'
    const path = decodeURIComponent(request.path) // 发生异常的请求路径
    const timestamp = new Date().getTime() // 发生异常时的时间戳

    return response.json({ code, msg, data: { path, timestamp } })
  }
}
