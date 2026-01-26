# Client.connector.syncJobUpdateStats

Set the connector sync job stats. Stats include: `deleted_document_count`, `indexed_document_count`, `indexed_document_volume`, and `total_document_count`. You can also update `last_seen`. This API is mainly used by the connector service for updating sync job information. To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

## Method Signature

```typescript
client.connector.syncJobUpdateStats(this: That, params: T.ConnectorSyncJobUpdateStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobUpdateStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobUpdateStatsRequest`](../types/ConnectorSyncJobUpdateStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobUpdateStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
