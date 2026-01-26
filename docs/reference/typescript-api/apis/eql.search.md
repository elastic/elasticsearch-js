# Client.eql.search

Get EQL search results. Returns search results for an Event Query Language (EQL) query. EQL assumes each document in a data stream or index corresponds to an event.

## Method Signature

```typescript
client.eql.search(this: That, params: T.EqlSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EqlSearchResponse<TEvent>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EqlSearchRequest`](../types/EqlSearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EqlSearchResponse<TEvent>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
