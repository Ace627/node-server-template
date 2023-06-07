import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import ResponseInterceptor from './common/response.interceptor' // 全局响应拦截器
import ExceptionInterceptor from './common/exception.interceptor' // 全局异常拦截器
import SwaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 移除 X-Powered-By 响应头，让攻击者更难以看到您的站点可能支持哪些潜在的易受攻击技术点
  app.disable('x-powered-by')

  // 配置全局路由前缀
  // http://localhost:3001/demo => http://localhost:3001/api/demo
  // app.setGlobalPrefix('/api')
  SwaggerConfig(app, 'api-docs')
  app.useStaticAssets('public') // 配置静态资源目录

  // 配置全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  // 配置全局异常拦截器
  app.useGlobalFilters(new ExceptionInterceptor())

  await app.listen(3000)

  console.log(`Node Server is running at http://localhost:3000`)
  console.log(`Swagger Api is running at http://localhost:3000/api-docs`)
}
bootstrap()
