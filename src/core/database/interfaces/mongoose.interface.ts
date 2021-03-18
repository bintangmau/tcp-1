import { ConnectOptions } from 'mongoose';

export interface IMongooseConfig {
  development: {
    uri: string,
    options: ConnectOptions
  };
  test: {
    uri: string,
    options: ConnectOptions
  };
  production: {
    uri: string,
    options: ConnectOptions
  };
}