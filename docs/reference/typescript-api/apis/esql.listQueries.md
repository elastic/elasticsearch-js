# Client.esql.listQueries

Get running ES|QL queries information. Returns an object containing IDs and other information about the running ES|QL queries.

## Method Signature

```typescript
client.esql.listQueries(this: That, params?: T.EsqlListQueriesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlListQueriesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`EsqlListQueriesRequest`](../types/EsqlListQueriesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlListQueriesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
