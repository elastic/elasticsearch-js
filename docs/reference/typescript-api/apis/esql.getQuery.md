# Client.esql.getQuery

Get a specific running ES|QL query information. Returns an object extended information about a running ES|QL query.

## Method Signature

```typescript
client.esql.getQuery(this: That, params: T.EsqlGetQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlGetQueryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EsqlGetQueryRequest`](../types/EsqlGetQueryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EsqlGetQueryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
