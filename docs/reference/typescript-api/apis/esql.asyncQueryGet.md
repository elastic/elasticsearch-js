# Client.esql.asyncQueryGet

Get async ES|QL query results. Get the current status and available results or stored results for an ES|QL asynchronous query. If the Elasticsearch security features are enabled, only the user who first submitted the ES|QL query can retrieve the results using this API.

## Method Signature

```typescript
client.esql.asyncQueryGet(this: That, params: T.EsqlAsyncQueryGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlAsyncQueryGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlAsyncQueryGetRequest`](../types/EsqlAsyncQueryGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlAsyncQueryGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
