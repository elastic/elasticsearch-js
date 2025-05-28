# `Shutdown` [class-Shutdown]

## Constructor

```typescript
new Shutdown(transport: [Transport](./Transport.md));
```

## Properties [class-properties-Shutdown]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-Shutdown]

| Name | Signature | Description |
| - | - | - |
| `deleteNode` | `deleteNode(this: [That](./That.md), params: [ShutdownDeleteNodeRequest](./ShutdownDeleteNodeRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[ShutdownDeleteNodeResponse](./ShutdownDeleteNodeResponse.md)>;` | Cancel node shutdown preparations. Remove a node from the shutdown list so it can resume normal operations. You must explicitly clear the shutdown request when a node rejoins the cluster or when a node has permanently left the cluster. Shutdown requests are never removed automatically by Elasticsearch. NOTE: This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If the operator privileges feature is enabled, you must be an operator to use this API. |
| `deleteNode` | `deleteNode(this: [That](./That.md), params: [ShutdownDeleteNodeRequest](./ShutdownDeleteNodeRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[ShutdownDeleteNodeResponse](./ShutdownDeleteNodeResponse.md), unknown>>;` | &nbsp; |
| `deleteNode` | `deleteNode(this: [That](./That.md), params: [ShutdownDeleteNodeRequest](./ShutdownDeleteNodeRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[ShutdownDeleteNodeResponse](./ShutdownDeleteNodeResponse.md)>;` | &nbsp; |
| `getNode` | `getNode(this: [That](./That.md), params?: [ShutdownGetNodeRequest](./ShutdownGetNodeRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[ShutdownGetNodeResponse](./ShutdownGetNodeResponse.md)>;` | Get the shutdown status. Get information about nodes that are ready to be shut down, have shut down preparations still in progress, or have stalled. The API returns status information for each part of the shut down process. NOTE: This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If the operator privileges feature is enabled, you must be an operator to use this API. |
| `getNode` | `getNode(this: [That](./That.md), params?: [ShutdownGetNodeRequest](./ShutdownGetNodeRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[ShutdownGetNodeResponse](./ShutdownGetNodeResponse.md), unknown>>;` | &nbsp; |
| `getNode` | `getNode(this: [That](./That.md), params?: [ShutdownGetNodeRequest](./ShutdownGetNodeRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[ShutdownGetNodeResponse](./ShutdownGetNodeResponse.md)>;` | &nbsp; |
| `putNode` | `putNode(this: [That](./That.md), params: [ShutdownPutNodeRequest](./ShutdownPutNodeRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[ShutdownPutNodeResponse](./ShutdownPutNodeResponse.md)>;` | Prepare a node to be shut down. NOTE: This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If you specify a node that is offline, it will be prepared for shut down when it rejoins the cluster. If the operator privileges feature is enabled, you must be an operator to use this API. The API migrates ongoing tasks and index shards to other nodes as needed to prepare a node to be restarted or shut down and removed from the cluster. This ensures that Elasticsearch can be stopped safely with minimal disruption to the cluster. You must specify the type of shutdown: `restart`, `remove`, or `replace`. If a node is already being prepared for shutdown, you can use this API to change the shutdown type. IMPORTANT: This API does NOT terminate the Elasticsearch process. Monitor the node shutdown status to determine when it is safe to stop Elasticsearch. |
| `putNode` | `putNode(this: [That](./That.md), params: [ShutdownPutNodeRequest](./ShutdownPutNodeRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[ShutdownPutNodeResponse](./ShutdownPutNodeResponse.md), unknown>>;` | &nbsp; |
| `putNode` | `putNode(this: [That](./That.md), params: [ShutdownPutNodeRequest](./ShutdownPutNodeRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[ShutdownPutNodeResponse](./ShutdownPutNodeResponse.md)>;` | &nbsp; |
