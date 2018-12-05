export declare class TimeoutError extends Error {
  name: string;
  message: string;
  request: any;
  constructor(message: string, request: any);
}

export declare class ConnectionError extends Error {
  name: string;
  message: string;
  request: any;
  constructor(message: string, request: any);
}

export declare class NoLivingConnectionsError extends Error {
  name: string;
  message: string;
  constructor(message: string);
}

export declare class SerializationError extends Error {
  name: string;
  message: string;
  constructor(message: string);
}

export declare class DeserializationError extends Error {
  name: string;
  message: string;
  constructor(message: string);
}

export declare class ConfigurationError extends Error {
  name: string;
  message: string;
  constructor(message: string);
}

export declare class ResponseError extends Error {
  name: string;
  message: string;
  body: any;
  statusCode: number;
  headers: any;
  constructor({ body, statusCode, headers }: {
    [key: string]: any;
  });
}
