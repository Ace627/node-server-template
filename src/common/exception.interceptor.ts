import { ArgumentsHost, HttpException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch()
export default class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const request = context.getRequest<Request>()
    const response = context.getResponse<Response>()

    // HTTP 的异常状态码
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // HTTP 异常信息的处理
    let msg = decodeURIComponent(exception.message) || '未知异常'
    msg = msg.includes('Too Many Requests') ? '您的请求过于频繁，请稍后再试' : msg

    return response.json({
      code,
      msg,
      path: request.url,
      data: null,
      timestamp: new Date().toISOString(),
    })
  }
}
