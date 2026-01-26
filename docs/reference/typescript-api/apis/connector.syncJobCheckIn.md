# Client.connector.syncJobCheckIn

Check in a connector sync job. Check in a connector sync job and set the `last_seen` field to the current time before updating it in the internal index. To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

## Method Signature

```typescript
client.connector.syncJobCheckIn(this: That, params: T.ConnectorSyncJobCheckInRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobCheckInResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobCheckInRequest`](../types/ConnectorSyncJobCheckInRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobCheckInResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
