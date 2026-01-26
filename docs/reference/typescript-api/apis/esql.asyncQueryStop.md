# Client.esql.asyncQueryStop

Stop async ES|QL query. This API interrupts the query execution and returns the results so far. If the Elasticsearch security features are enabled, only the user who first submitted the ES|QL query can stop it.

## Method Signature

```typescript
client.esql.asyncQueryStop(this: That, params: T.EsqlAsyncQueryStopRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlAsyncQueryStopResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlAsyncQueryStopRequest`](../types/EsqlAsyncQueryStopRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlAsyncQueryStopResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
