# Client.sql.getAsync

Get async SQL search results. Get the current status and available results for an async SQL search or stored synchronous SQL search. If the Elasticsearch security features are enabled, only the user who first submitted the SQL search can retrieve the search using this API.

## Method Signature

```typescript
client.sql.getAsync(this: That, params: T.SqlGetAsyncRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlGetAsyncResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SqlGetAsyncRequest`](../types/SqlGetAsyncRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SqlGetAsyncResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
