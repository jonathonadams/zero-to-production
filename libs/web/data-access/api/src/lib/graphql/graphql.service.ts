import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
// import omit from 'lodash.omit';
// import { omit } from 'lodash-es';

@Injectable()
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  query<T>(query: any, variables?: any): Observable<ApolloQueryResult<T>> {
    const cleanVariables = this.removeTypenameProperty(variables);
    return this.apollo.query<T>({
      query,
      variables: cleanVariables
    });
  }

  mutation<T>(mutation: any, variables: any): Observable<FetchResult<T>> {
    const cleanVariables = this.removeTypenameProperty(variables);
    return this.apollo.mutate<T>({
      mutation,
      variables: cleanVariables
    });
  }

  /**
   * Utility function to remove the '__typename' property that apollo cache created
   * @param variables the query variables to cleanse
   */
  // removeTypenameProperty(
  //   variables: undefined | { [key: string]: any | undefined }
  // ): undefined | { [key: string]: any | undefined } {
  //   if (variables) {
  //     const cleanVariables: any = {};
  //     Object.keys(variables).forEach(key => {
  //       if (typeof variables[key] === 'object') {
  //         // delete variables[key]['__typename'];
  //         // cleanVariables[key] = variables[key];
  //         cleanVariables[key] = omit(variables[key], '__typename');
  //       } else {
  //         if (key !== '__typename') {
  //           cleanVariables[key] = variables[key];
  //         }
  //       }
  //     });
  //     return cleanVariables;
  //   } else {
  //     return undefined;
  //   }
  // }

  removeTypenameProperty(value: any): any {
    if (value === null || value === undefined) {
      return value;
    } else if (Array.isArray(value)) {
      return value.map(v => this.removeTypenameProperty(v));
    } else if (typeof value === 'object') {
      const newObj: any = {};
      Object.entries(value).forEach(([key, v]) => {
        if (key !== '__typename') {
          newObj[key] = this.removeTypenameProperty(v);
        }
      });
      return newObj;
    }
    return value;
  }
}
