# Client.fleet.search

Run a Fleet search. The purpose of the Fleet search API is to provide an API where the search will be run only after the provided checkpoint has been processed and is visible for searches inside of Elasticsearch.

## Method Signature

```typescript
client.fleet.search(this: That, params: T.FleetSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetSearchResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`FleetSearchRequest`](../types/FleetSearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FleetSearchResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
