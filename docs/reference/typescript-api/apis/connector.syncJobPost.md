# Client.connector.syncJobPost

Create a connector sync job. Create a connector sync job document in the internal index and initialize its counters and timestamps with default values.

## Method Signature

```typescript
client.connector.syncJobPost(this: That, params: T.ConnectorSyncJobPostRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorSyncJobPostResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorSyncJobPostRequest`](../types/ConnectorSyncJobPostRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorSyncJobPostResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
