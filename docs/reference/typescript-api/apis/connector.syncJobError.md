# Client.connector.syncJobError

Set a connector sync job error. Set the `error` field for a connector sync job and set its `status` to `error`. To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

## Method Signature

```typescript
client.connector.syncJobError(this: That, params: T.ConnectorSyncJobErrorRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobErrorResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobErrorRequest`](../types/ConnectorSyncJobErrorRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobErrorResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
