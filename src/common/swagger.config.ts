import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { NestExpressApplication } from '@nestjs/platform-express'

export default (app: NestExpressApplication, path: string) => {
  const options = new DocumentBuilder().setTitle('API 文档的标题').setDescription('API 文档的描述').setVersion('0.0.1').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(path, app, document)
}
