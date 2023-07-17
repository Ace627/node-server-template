import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import ResponseInterceptor from './common/response.interceptor' // 全局响应拦截器
import ExceptionInterceptor from './common/exception.interceptor' // 全局异常拦截器
import SwaggerConfig from './common/swagger.config'
import { getWlanIP } from '@/utils'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 移除 X-Powered-By 响应头，让攻击者更难以看到您的站点可能支持哪些潜在的易受攻击技术点
  app.disable('x-powered-by')

  // 配置全局路由前缀
  // http://localhost:3001/demo => http://localhost:3001/api/demo
  // app.setGlobalPrefix('/api')

  // 配置 swagger 接口文档
  SwaggerConfig(app, 'api-docs')

  // 配置静态资源目录
  app.useStaticAssets('public')

  // 配置全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  // 配置全局异常拦截器
  app.useGlobalFilters(new ExceptionInterceptor())

  // 配置全局验证管道
  app.useGlobalPipes(new ValidationPipe())

  const SERVER_PORT = 3000
  const WLAN_IP = getWlanIP()
  await app.listen(SERVER_PORT)

  console.log(`Node Server is running at http://localhost:${SERVER_PORT}`)
  console.log(`Node Server is running at http://${WLAN_IP}:${SERVER_PORT}`)
  console.log(`接口文档访问地址: http://localhost:${SERVER_PORT}/doc.html`)
  console.log(`接口文档访问地址: http://${WLAN_IP}:${SERVER_PORT}/doc.html`)
}
bootstrap()
