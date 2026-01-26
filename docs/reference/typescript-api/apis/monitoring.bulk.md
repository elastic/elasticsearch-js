# Client.monitoring.bulk

Send monitoring data. This API is used by the monitoring features to send monitoring data.

## Method Signature

```typescript
client.monitoring.bulk(this: That, params: T.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.MonitoringBulkResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MonitoringBulkRequest`](../types/MonitoringBulkRequest.md)<TDocument, TPartialDocument> | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MonitoringBulkResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
