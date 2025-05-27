## `Monitoring`

### Constructor

:::
new Monitoring(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `bulk` | `bulk<TDocument = unknown, TPartialDocument = unknown>(this: [That](./That.md), params: [MonitoringBulkRequest](./MonitoringBulkRequest.md)<TDocument, TPartialDocument>, options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[MonitoringBulkResponse](./MonitoringBulkResponse.md)>;` | Send monitoring data. This API is used by the monitoring features to send monitoring data. || `bulk` | `bulk<TDocument = unknown, TPartialDocument = unknown>(this: [That](./That.md), params: [MonitoringBulkRequest](./MonitoringBulkRequest.md)<TDocument, TPartialDocument>, options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[MonitoringBulkResponse](./MonitoringBulkResponse.md), unknown>>;` | &nbsp; || `bulk` | `bulk<TDocument = unknown, TPartialDocument = unknown>(this: [That](./That.md), params: [MonitoringBulkRequest](./MonitoringBulkRequest.md)<TDocument, TPartialDocument>, options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[MonitoringBulkResponse](./MonitoringBulkResponse.md)>;` | &nbsp; |