# Client.esql.query

Run an ES|QL query. Get search results for an ES|QL (Elasticsearch query language) query.

## Method Signature

```typescript
client.esql.query(this: That, params: T.EsqlQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlQueryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlQueryRequest`](../types/EsqlQueryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlQueryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
