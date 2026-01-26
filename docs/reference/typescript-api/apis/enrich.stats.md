# Client.enrich.stats

Get enrich stats. Returns enrich coordinator statistics and information about enrich policies that are currently executing.

## Method Signature

```typescript
client.enrich.stats(this: That, params?: T.EnrichStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`EnrichStatsRequest`](../types/EnrichStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EnrichStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
