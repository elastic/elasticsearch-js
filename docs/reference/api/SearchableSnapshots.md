# `SearchableSnapshots` [class-SearchableSnapshots]

## Constructor

```typescript
new SearchableSnapshots(transport: [Transport](./Transport.md));
```

## Properties [class-properties-SearchableSnapshots]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-SearchableSnapshots]

| Name | Signature | Description |
| - | - | - |
| `cacheStats` | `cacheStats(this: [That](./That.md), params?: [SearchableSnapshotsCacheStatsRequest](./SearchableSnapshotsCacheStatsRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SearchableSnapshotsCacheStatsResponse](./SearchableSnapshotsCacheStatsResponse.md)>;` | Get cache statistics. Get statistics about the shared cache for partially mounted indices. |
| `cacheStats` | `cacheStats(this: [That](./That.md), params?: [SearchableSnapshotsCacheStatsRequest](./SearchableSnapshotsCacheStatsRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SearchableSnapshotsCacheStatsResponse](./SearchableSnapshotsCacheStatsResponse.md), unknown>>;` | &nbsp; |
| `cacheStats` | `cacheStats(this: [That](./That.md), params?: [SearchableSnapshotsCacheStatsRequest](./SearchableSnapshotsCacheStatsRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SearchableSnapshotsCacheStatsResponse](./SearchableSnapshotsCacheStatsResponse.md)>;` | &nbsp; |
| `clearCache` | `clearCache(this: [That](./That.md), params?: [SearchableSnapshotsClearCacheRequest](./SearchableSnapshotsClearCacheRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SearchableSnapshotsClearCacheResponse](./SearchableSnapshotsClearCacheResponse.md)>;` | Clear the cache. Clear indices and data streams from the shared cache for partially mounted indices. |
| `clearCache` | `clearCache(this: [That](./That.md), params?: [SearchableSnapshotsClearCacheRequest](./SearchableSnapshotsClearCacheRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SearchableSnapshotsClearCacheResponse](./SearchableSnapshotsClearCacheResponse.md), unknown>>;` | &nbsp; |
| `clearCache` | `clearCache(this: [That](./That.md), params?: [SearchableSnapshotsClearCacheRequest](./SearchableSnapshotsClearCacheRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SearchableSnapshotsClearCacheResponse](./SearchableSnapshotsClearCacheResponse.md)>;` | &nbsp; |
| `mount` | `mount(this: [That](./That.md), params: [SearchableSnapshotsMountRequest](./SearchableSnapshotsMountRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SearchableSnapshotsMountResponse](./SearchableSnapshotsMountResponse.md)>;` | Mount a snapshot. Mount a snapshot as a searchable snapshot index. Do not use this API for snapshots managed by index lifecycle management (ILM). Manually mounting ILM-managed snapshots can interfere with ILM processes. |
| `mount` | `mount(this: [That](./That.md), params: [SearchableSnapshotsMountRequest](./SearchableSnapshotsMountRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SearchableSnapshotsMountResponse](./SearchableSnapshotsMountResponse.md), unknown>>;` | &nbsp; |
| `mount` | `mount(this: [That](./That.md), params: [SearchableSnapshotsMountRequest](./SearchableSnapshotsMountRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SearchableSnapshotsMountResponse](./SearchableSnapshotsMountResponse.md)>;` | &nbsp; |
| `stats` | `stats(this: [That](./That.md), params?: [SearchableSnapshotsStatsRequest](./SearchableSnapshotsStatsRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SearchableSnapshotsStatsResponse](./SearchableSnapshotsStatsResponse.md)>;` | Get searchable snapshot statistics. |
| `stats` | `stats(this: [That](./That.md), params?: [SearchableSnapshotsStatsRequest](./SearchableSnapshotsStatsRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SearchableSnapshotsStatsResponse](./SearchableSnapshotsStatsResponse.md), unknown>>;` | &nbsp; |
| `stats` | `stats(this: [That](./That.md), params?: [SearchableSnapshotsStatsRequest](./SearchableSnapshotsStatsRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SearchableSnapshotsStatsResponse](./SearchableSnapshotsStatsResponse.md)>;` | &nbsp; |
