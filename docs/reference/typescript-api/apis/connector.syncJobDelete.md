# Client.connector.syncJobDelete

Delete a connector sync job. Remove a connector sync job and its associated data. This is a destructive action that is not recoverable.

## Method Signature

```typescript
client.connector.syncJobDelete(this: That, params: T.ConnectorSyncJobDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobDeleteRequest`](../types/ConnectorSyncJobDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
