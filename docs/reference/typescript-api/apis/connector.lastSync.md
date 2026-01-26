# Client.connector.lastSync

Update the connector last sync stats. Update the fields related to the last sync of a connector. This action is used for analytics and monitoring.

## Method Signature

```typescript
client.connector.lastSync(this: That, params: T.ConnectorLastSyncRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorLastSyncResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorLastSyncRequest`](../types/ConnectorLastSyncRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorLastSyncResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
