# `Client` [class-Client]

## Constructor

```typescript
new Client(opts: [ClientOptions](./ClientOptions.md));
```

## Properties [class-properties-Client]

| Name | Type | Description |
| - | - | - |
| `connectionPool` | [BaseConnectionPool](./BaseConnectionPool.md) | &nbsp; |
| `diagnostic` | [Diagnostic](./Diagnostic.md) | &nbsp; |
| `helpers` | [Helpers](./Helpers.md) | &nbsp; |
| `name` | string | symbol | &nbsp; |
| `serializer` | [Serializer](./Serializer.md) | &nbsp; |
| `transport` | [SniffingTransport](./SniffingTransport.md) | &nbsp; |

## Methods [class-methods-Client]

| Name | Signature | Description |
| - | - | - |
| `child` | `child(opts: [ClientOptions](./ClientOptions.md)): [Client](./Client.md);` | Creates a child client instance that shared its connection pool with the parent client |
| `close` | `close(): Promise<void>;` | Closes all connections in the connection pool. Connections shared with any parent or child instances will also be closed. |
