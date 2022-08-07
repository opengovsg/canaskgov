import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppService } from './app.service'
import { UtilModule, ApiConfigService, validationSchema } from './util'
import { QuestionModule } from './question'
import { AuthModule } from './auth/auth.module'
import { SessionMiddleware } from './middleware'
import { UserModule } from './user'
import { join } from 'path'

@Module({
  imports: [
    UtilModule,
    QuestionModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  exports: [AppService],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*')
  }
}
