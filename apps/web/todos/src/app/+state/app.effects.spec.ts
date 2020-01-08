// it('should invoke the NotificationService.emit() with a welcome message', done => {
//     const spy = jest.spyOn(ns, 'emit');
//     spy.mockReset();
//     const action = AuthActions.registerSuccess({ user: {} as IUser });

//     actions$ = hot('-a---', { a: action });

//     effects.registerSuccess$.subscribe(someAction => {
//       expect(spy).toHaveBeenCalled();
//       done();
//     });

//     Scheduler.get().flush();

//     spy.mockReset();
//   });
