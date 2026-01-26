# Client.esql.asyncQuery

Run an async ES|QL query. Asynchronously run an ES|QL (Elasticsearch query language) query, monitor its progress, and retrieve results when they become available. The API accepts the same parameters and request body as the synchronous query API, along with additional async related properties.

## Method Signature

```typescript
client.esql.asyncQuery(this: That, params: T.EsqlAsyncQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlAsyncQueryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlAsyncQueryRequest`](../types/EsqlAsyncQueryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlAsyncQueryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
