# `Simulate` [class-Simulate]

## Constructor

```typescript
new Simulate(transport: [Transport](./Transport.md));
```

## Properties [class-properties-Simulate]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-Simulate]

| Name | Signature | Description |
| - | - | - |
| `ingest` | `ingest(this: [That](./That.md), params: [SimulateIngestRequest](./SimulateIngestRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SimulateIngestResponse](./SimulateIngestResponse.md)>;` | Simulate data ingestion. Run ingest pipelines against a set of provided documents, optionally with substitute pipeline definitions, to simulate ingesting data into an index. This API is meant to be used for troubleshooting or pipeline development, as it does not actually index any data into Elasticsearch. The API runs the default and final pipeline for that index against a set of documents provided in the body of the request. If a pipeline contains a reroute processor, it follows that reroute processor to the new index, running that index's pipelines as well the same way that a non-simulated ingest would. No data is indexed into Elasticsearch. Instead, the transformed document is returned, along with the list of pipelines that have been run and the name of the index where the document would have been indexed if this were not a simulation. The transformed document is validated against the mappings that would apply to this index, and any validation error is reported in the result. This API differs from the simulate pipeline API in that you specify a single pipeline for that API, and it runs only that one pipeline. The simulate pipeline API is more useful for developing a single pipeline, while the simulate ingest API is more useful for troubleshooting the interaction of the various pipelines that get applied when ingesting into an index. By default, the pipeline definitions that are currently in the system are used. However, you can supply substitute pipeline definitions in the body of the request. These will be used in place of the pipeline definitions that are already in the system. This can be used to replace existing pipeline definitions or to create new ones. The pipeline substitutions are used only within this request. |
| `ingest` | `ingest(this: [That](./That.md), params: [SimulateIngestRequest](./SimulateIngestRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SimulateIngestResponse](./SimulateIngestResponse.md), unknown>>;` | &nbsp; |
| `ingest` | `ingest(this: [That](./That.md), params: [SimulateIngestRequest](./SimulateIngestRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SimulateIngestResponse](./SimulateIngestResponse.md)>;` | &nbsp; |
