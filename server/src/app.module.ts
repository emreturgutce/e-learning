import './config';
import { Logger, Module } from '@nestjs/common';
import { MongoProviderModule } from './providers/mongo/provider.module';
import { CourseModule } from './modules/course/course.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './providers/redis/redis.module';

@Module({
  imports: [
    MongoProviderModule,
    CourseModule,
    UserModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
