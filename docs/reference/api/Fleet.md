# `Fleet` [class-Fleet]

## Constructor

```typescript
new Fleet(transport: [Transport](./Transport.md));
```

## Properties [class-properties-Fleet]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-Fleet]

| Name | Signature | Description |
| - | - | - |
| `deleteSecret` | `deleteSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Deletes a secret stored by Fleet. |
| `deleteSecret` | `deleteSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; |
| `deleteSecret` | `deleteSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; |
| `getSecret` | `getSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Retrieves a secret stored by Fleet. |
| `getSecret` | `getSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; |
| `getSecret` | `getSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; |
| `globalCheckpoints` | `globalCheckpoints(this: [That](./That.md), params: [FleetGlobalCheckpointsRequest](./FleetGlobalCheckpointsRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[FleetGlobalCheckpointsResponse](./FleetGlobalCheckpointsResponse.md)>;` | Get global checkpoints. Get the current global checkpoints for an index. This API is designed for internal use by the Fleet server project. |
| `globalCheckpoints` | `globalCheckpoints(this: [That](./That.md), params: [FleetGlobalCheckpointsRequest](./FleetGlobalCheckpointsRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[FleetGlobalCheckpointsResponse](./FleetGlobalCheckpointsResponse.md), unknown>>;` | &nbsp; |
| `globalCheckpoints` | `globalCheckpoints(this: [That](./That.md), params: [FleetGlobalCheckpointsRequest](./FleetGlobalCheckpointsRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[FleetGlobalCheckpointsResponse](./FleetGlobalCheckpointsResponse.md)>;` | &nbsp; |
| `msearch` | `msearch<TDocument = unknown>(this: [That](./That.md), params: [FleetMsearchRequest](./FleetMsearchRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[FleetMsearchResponse](./FleetMsearchResponse.md)<TDocument>>;` | Run multiple Fleet searches. Run several Fleet searches with a single API request. The API follows the same structure as the multi search API. However, similar to the Fleet search API, it supports the `wait_for_checkpoints` parameter. |
| `msearch` | `msearch<TDocument = unknown>(this: [That](./That.md), params: [FleetMsearchRequest](./FleetMsearchRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[FleetMsearchResponse](./FleetMsearchResponse.md)<TDocument>, unknown>>;` | &nbsp; |
| `msearch` | `msearch<TDocument = unknown>(this: [That](./That.md), params: [FleetMsearchRequest](./FleetMsearchRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[FleetMsearchResponse](./FleetMsearchResponse.md)<TDocument>>;` | &nbsp; |
| `postSecret` | `postSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[TODO](./TODO.md)>;` | Creates a secret stored by Fleet. |
| `postSecret` | `postSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[TODO](./TODO.md), unknown>>;` | &nbsp; |
| `postSecret` | `postSecret(this: [That](./That.md), params?: [TODO](./TODO.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[TODO](./TODO.md)>;` | &nbsp; |
| `search` | `search<TDocument = unknown>(this: [That](./That.md), params: [FleetSearchRequest](./FleetSearchRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[FleetSearchResponse](./FleetSearchResponse.md)<TDocument>>;` | Run a Fleet search. The purpose of the Fleet search API is to provide an API where the search will be run only after the provided checkpoint has been processed and is visible for searches inside of Elasticsearch. |
| `search` | `search<TDocument = unknown>(this: [That](./That.md), params: [FleetSearchRequest](./FleetSearchRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[FleetSearchResponse](./FleetSearchResponse.md)<TDocument>, unknown>>;` | &nbsp; |
| `search` | `search<TDocument = unknown>(this: [That](./That.md), params: [FleetSearchRequest](./FleetSearchRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[FleetSearchResponse](./FleetSearchResponse.md)<TDocument>>;` | &nbsp; |
