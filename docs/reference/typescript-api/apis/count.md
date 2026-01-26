# Client.count

Count search results. Get the number of documents matching a query. The query can be provided either by using a simple query string as a parameter, or by defining Query DSL within the request body. The query is optional. When no query is provided, the API uses `match_all` to count all the documents. The count API supports multi-target syntax. You can run a single count API search across multiple data streams and indices. The operation is broadcast across all shards. For each shard ID group, a replica is chosen and the search is run against it. This means that replicas increase the scalability of the count.

## Method Signature

```typescript
client.count(this: That, params?: T.CountRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CountResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CountRequest`](../types/CountRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CountResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
