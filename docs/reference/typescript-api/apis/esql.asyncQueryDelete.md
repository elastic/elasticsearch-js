# Client.esql.asyncQueryDelete

Delete an async ES|QL query. If the query is still running, it is cancelled. Otherwise, the stored results are deleted. If the Elasticsearch security features are enabled, only the following users can use this API to delete a query: * The authenticated user that submitted the original query request * Users with the `cancel_task` cluster privilege

## Method Signature

```typescript
client.esql.asyncQueryDelete(this: That, params: T.EsqlAsyncQueryDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlAsyncQueryDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlAsyncQueryDeleteRequest`](../types/EsqlAsyncQueryDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlAsyncQueryDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
