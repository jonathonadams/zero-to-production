# Issues to track / tidy up before release.

- Mongo DB - Sanitization [Warning](https://github.com/mongodb-js/mongodb-core/issues/453)

## Jest & ES6 Modules

Currently Jest does not support es6 Modules, so modules can not be used in testing
lodash-es is tree shakeable, however fails tests at the moment so install individual common lodash libraries for now then remove them when
the below issue is resolved.
https://github.com/facebook/jest/issues/4842

## RXJS & TypeScript Filter Issues

TS does not correctly infer the types when using filters, current typescript issues

https://github.com/Microsoft/TypeScript/issues/10734
https://github.com/Microsoft/TypeScript/issues/16069

## Angular IVY and Strict Mode

Generic template checking.
https://github.com/angular/angular/issues/30235

## TS Path References are not inherited

Once merged, remove references from the tsconfig.lib.json's

https://github.com/Microsoft/TypeScript/issues/27098

## RouterLink directive is broken for relative paths with empty strings

https://github.com/angular/angular/issues/13011

## Nativescript does not currently support the monorepo design

https://github.com/NativeScript/NativeScript/issues/7537

## Remove typing once merged

@types/node-fetch
https://github.com/apollographql/apollo-tooling/issues/1670
https://github.com/apollographql/apollo-tooling/pull/1701
