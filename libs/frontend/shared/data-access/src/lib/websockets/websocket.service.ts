// import { Injectable } from '@angular/core';
// import { Observable, of, fromEvent } from 'rxjs';
// import io, { Socket } from 'socket.io-client';
// import { environment } from '@env/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private baseUrl = environment.serverUrl;
//   private socket: Socket;

//   initSocket(): void {
//     try {
//       if (!this.socket) {
//         this.socket = io(this.baseUrl, {
//           timeout: 10000,
//           upgrade: true,
//           transports: ['websocket']
//         });

//         this.socket.on('connect', () => {
//           console.log('socket connected');
//         });

//         this.socket.on('disconnect', () => {
//           console.log('socket connected');
//         });

//         this.socket.on('connect_error', err => {
//           console.log('connect error', err);
//         });
//       }
//     } catch (err) {
//       // Do something with the error
//       // For some reasons the 'connect_error' does not catch the connect error
//       // And still logs an error to the console. hence the try catch
//     }
//   }

//   disconnect(): void {
//     this.socket.disconnect();
//   }

//   emitMessage(nameSpace: string, message: any): void {
//     if (this.socket && this.socket.connected) {
//       this.socket.emit(nameSpace, message);
//     }
//   }

//   // Returns an observable from the namespaced message
//   onMessage<T>(nameSpace: string): Observable<T> {
//     // Initialize the socket if someone subscribes to messages
//     // And the socket has not been intialized
//     if (!this.socket) {
//       this.initSocket();
//     }

//     // Return a new observable that namespaces the message
//     return fromEvent<T>(this.socket, nameSpace);
//   }
// }
