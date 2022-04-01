import { DynamicModule, Global, Module } from '@nestjs/common';
import { FirebaseAdminModuleAsyncOptions } from 'src/common/interface/firebase-admin.interface';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_INJECT, FIREBASE_ADMIN_MODULE_OPTIONS } from 'src/common/constants';
import { FirebaseAuthService } from './firebase.service';

@Global()
@Module({})
export class FirebaseModule {
  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const FirebaseModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const FirebaseService = {
      provide: FIREBASE_ADMIN_INJECT,
      useFactory: (opt: admin.AppOptions) => {
        const app = admin.apps.length === 0 ? admin.initializeApp(opt) : admin.apps[0];
        return app;
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    };
    return {
      module: FirebaseModule,
      imports: options.imports,
      providers: [FirebaseModuleOptions, FirebaseService, FirebaseAuthService],
      exports: [FirebaseModuleOptions, FirebaseService, FirebaseAuthService],
    };
  }
}
