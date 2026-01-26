# Client.indices.getSettings

Get index settings. Get setting information for one or more indices. For data streams, it returns setting information for the stream's backing indices.

## Method Signature

```typescript
client.indices.getSettings(this: That, params?: T.IndicesGetSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesGetSettingsRequest`](../types/IndicesGetSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
