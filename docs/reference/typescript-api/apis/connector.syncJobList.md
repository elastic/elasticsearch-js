# Client.connector.syncJobList

Get all connector sync jobs. Get information about all stored connector sync jobs listed by their creation date in ascending order.

## Method Signature

```typescript
client.connector.syncJobList(this: That, params?: T.ConnectorSyncJobListRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobListResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ConnectorSyncJobListRequest`](../types/ConnectorSyncJobListRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobListResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
