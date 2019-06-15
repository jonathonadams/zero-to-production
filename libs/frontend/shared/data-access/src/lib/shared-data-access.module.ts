import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLService } from './graphql/graphql.service';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createApollo } from './graphql/createApollo';
import { HttpLink } from 'apollo-angular-link-http';
import { ApiService } from './api/api.service';

@NgModule({
  imports: [CommonModule]
})
export class SharedDataAccessModule {
  static forRoot({
    graphQLUrl = 'graphql',
    apiBaseUrl = 'api'
  } = {}): ModuleWithProviders {
    return {
      ngModule: SharedDataAccessModule,
      providers: [
        ApiService,
        GraphQLService,
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink, 'graphQLUrl']
        },
        {
          provide: 'graphQLUrl',
          useValue: graphQLUrl
        },
        {
          provide: 'apiBaseUrl',
          useValue: apiBaseUrl
        }
      ]
    };
  }
}
