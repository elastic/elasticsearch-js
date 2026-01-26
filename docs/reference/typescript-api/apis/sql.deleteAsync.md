# Client.sql.deleteAsync

Delete an async SQL search. Delete an async SQL search or a stored synchronous SQL search. If the search is still running, the API cancels it. If the Elasticsearch security features are enabled, only the following users can use this API to delete a search: * Users with the `cancel_task` cluster privilege. * The user who first submitted the search.

## Method Signature

```typescript
client.sql.deleteAsync(this: That, params: T.SqlDeleteAsyncRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlDeleteAsyncResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SqlDeleteAsyncRequest`](../types/SqlDeleteAsyncRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SqlDeleteAsyncResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
