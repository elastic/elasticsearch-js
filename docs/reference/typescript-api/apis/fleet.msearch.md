# Client.fleet.msearch

Run multiple Fleet searches. Run several Fleet searches with a single API request. The API follows the same structure as the multi search API. However, similar to the Fleet search API, it supports the `wait_for_checkpoints` parameter.

## Method Signature

```typescript
client.fleet.msearch(this: That, params: T.FleetMsearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetMsearchResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`FleetMsearchRequest`](../types/FleetMsearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FleetMsearchResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
