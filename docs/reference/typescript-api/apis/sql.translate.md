# Client.sql.translate

Translate SQL into Elasticsearch queries. Translate an SQL search into a search API request containing Query DSL. It accepts the same request body parameters as the SQL search API, excluding `cursor`.

## Method Signature

```typescript
client.sql.translate(this: That, params: T.SqlTranslateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlTranslateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SqlTranslateRequest`](../types/SqlTranslateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SqlTranslateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
