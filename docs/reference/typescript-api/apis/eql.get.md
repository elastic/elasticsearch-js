# Client.eql.get

Get async EQL search results. Get the current status and available results for an async EQL search or a stored synchronous EQL search.

## Method Signature

```typescript
client.eql.get(this: That, params: T.EqlGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EqlGetResponse<TEvent>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EqlGetRequest`](../types/EqlGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EqlGetResponse<TEvent>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
