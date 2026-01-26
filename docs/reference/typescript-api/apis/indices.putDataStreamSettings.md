# Client.indices.putDataStreamSettings

Update data stream settings. NOTE: Available in 8.19. Not available in earlier versions. This API can be used to override settings on specific data streams. These overrides will take precedence over what is specified in the template that the data stream matches. To prevent your data stream from getting into an invalid state, only certain settings are allowed. If possible, the setting change is applied to all backing indices. Otherwise, it will be applied when the data stream is next rolled over.

## Method Signature

```typescript
client.indices.putDataStreamSettings(this: That, params: T.IndicesPutDataStreamSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutDataStreamSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutDataStreamSettingsRequest`](../types/IndicesPutDataStreamSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutDataStreamSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
