# `DanglingIndices` [class-DanglingIndices]

## Constructor

```typescript
new DanglingIndices(transport: [Transport](./Transport.md));
```

## Properties [class-properties-DanglingIndices]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-DanglingIndices]

| Name | Signature | Description |
| - | - | - |
| `deleteDanglingIndex` | `deleteDanglingIndex(this: [That](./That.md), params: [DanglingIndicesDeleteDanglingIndexRequest](./DanglingIndicesDeleteDanglingIndexRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[DanglingIndicesDeleteDanglingIndexResponse](./DanglingIndicesDeleteDanglingIndexResponse.md)>;` | Delete a dangling index. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline. |
| `deleteDanglingIndex` | `deleteDanglingIndex(this: [That](./That.md), params: [DanglingIndicesDeleteDanglingIndexRequest](./DanglingIndicesDeleteDanglingIndexRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[DanglingIndicesDeleteDanglingIndexResponse](./DanglingIndicesDeleteDanglingIndexResponse.md), unknown>>;` | &nbsp; |
| `deleteDanglingIndex` | `deleteDanglingIndex(this: [That](./That.md), params: [DanglingIndicesDeleteDanglingIndexRequest](./DanglingIndicesDeleteDanglingIndexRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[DanglingIndicesDeleteDanglingIndexResponse](./DanglingIndicesDeleteDanglingIndexResponse.md)>;` | &nbsp; |
| `importDanglingIndex` | `importDanglingIndex(this: [That](./That.md), params: [DanglingIndicesImportDanglingIndexRequest](./DanglingIndicesImportDanglingIndexRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[DanglingIndicesImportDanglingIndexResponse](./DanglingIndicesImportDanglingIndexResponse.md)>;` | Import a dangling index. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline. |
| `importDanglingIndex` | `importDanglingIndex(this: [That](./That.md), params: [DanglingIndicesImportDanglingIndexRequest](./DanglingIndicesImportDanglingIndexRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[DanglingIndicesImportDanglingIndexResponse](./DanglingIndicesImportDanglingIndexResponse.md), unknown>>;` | &nbsp; |
| `importDanglingIndex` | `importDanglingIndex(this: [That](./That.md), params: [DanglingIndicesImportDanglingIndexRequest](./DanglingIndicesImportDanglingIndexRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[DanglingIndicesImportDanglingIndexResponse](./DanglingIndicesImportDanglingIndexResponse.md)>;` | &nbsp; |
| `listDanglingIndices` | `listDanglingIndices(this: [That](./That.md), params?: [DanglingIndicesListDanglingIndicesRequest](./DanglingIndicesListDanglingIndicesRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[DanglingIndicesListDanglingIndicesResponse](./DanglingIndicesListDanglingIndicesResponse.md)>;` | Get the dangling indices. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline. Use this API to list dangling indices, which you can then import or delete. |
| `listDanglingIndices` | `listDanglingIndices(this: [That](./That.md), params?: [DanglingIndicesListDanglingIndicesRequest](./DanglingIndicesListDanglingIndicesRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[DanglingIndicesListDanglingIndicesResponse](./DanglingIndicesListDanglingIndicesResponse.md), unknown>>;` | &nbsp; |
| `listDanglingIndices` | `listDanglingIndices(this: [That](./That.md), params?: [DanglingIndicesListDanglingIndicesRequest](./DanglingIndicesListDanglingIndicesRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[DanglingIndicesListDanglingIndicesResponse](./DanglingIndicesListDanglingIndicesResponse.md)>;` | &nbsp; |
