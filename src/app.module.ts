import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { FirebaseModule } from './services/firebase/firebase.module';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ORMConfig from './config/ormconfig';

dotenv.config({});

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    FirebaseModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE_64, 'base64')
            .toString('utf8')
            .replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      }),
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(ORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
