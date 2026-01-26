# Client.sql.getAsyncStatus

Get the async SQL search status. Get the current status of an async SQL search or a stored synchronous SQL search.

## Method Signature

```typescript
client.sql.getAsyncStatus(this: That, params: T.SqlGetAsyncStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlGetAsyncStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SqlGetAsyncStatusRequest`](../types/SqlGetAsyncStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SqlGetAsyncStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
