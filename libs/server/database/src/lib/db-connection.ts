import mongoose, { ConnectionOptions } from 'mongoose';

export function dbConnection(
  connectionString: string,
  opts: ConnectionOptions
) {
  return mongoose.connect(connectionString, opts).catch((err: any) => {
    console.error('There was an error connecting to the DataBase');
    console.error(err);
  });
}
