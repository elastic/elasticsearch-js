# Client.connector.syncJobClaim

Claim a connector sync job. This action updates the job status to `in_progress` and sets the `last_seen` and `started_at` timestamps to the current time. Additionally, it can set the `sync_cursor` property for the sync job. This API is not intended for direct connector management by users. It supports the implementation of services that utilize the connector protocol to communicate with Elasticsearch. To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

## Method Signature

```typescript
client.connector.syncJobClaim(this: That, params: T.ConnectorSyncJobClaimRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobClaimResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobClaimRequest`](../types/ConnectorSyncJobClaimRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobClaimResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
