# Client.streams.logsEnable

Enable logs stream. Turn on the logs stream feature for this cluster. NOTE: To protect existing data, this feature can be turned on only if the cluster does not have existing indices or data streams that match the pattern `logs|logs.*`. If those indices or data streams exist, a `409 - Conflict` response and error is returned.

## Method Signature

```typescript
client.streams.logsEnable(this: That, params?: T.StreamsLogsEnableRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.StreamsLogsEnableResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`StreamsLogsEnableRequest`](../types/StreamsLogsEnableRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.StreamsLogsEnableResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
