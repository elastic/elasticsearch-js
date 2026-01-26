# Client.connector.syncJobCancel

Cancel a connector sync job. Cancel a connector sync job, which sets the status to cancelling and updates `cancellation_requested_at` to the current time. The connector service is then responsible for setting the status of connector sync jobs to cancelled.

## Method Signature

```typescript
client.connector.syncJobCancel(this: That, params: T.ConnectorSyncJobCancelRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobCancelResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobCancelRequest`](../types/ConnectorSyncJobCancelRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobCancelResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
