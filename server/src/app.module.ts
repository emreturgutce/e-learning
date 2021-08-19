import './config';
import { Logger, Module } from '@nestjs/common';
import { MongoProviderModule } from './providers/mongo/provider.module';
import { CourseModule } from './modules/course/course.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongoProviderModule, CourseModule, UserModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
