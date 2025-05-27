## `Logstash`

### Constructor

:::
new Logstash(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `deletePipeline` | `deletePipeline(this: [That](./That.md), params: [LogstashDeletePipelineRequest](./LogstashDeletePipelineRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[LogstashDeletePipelineResponse](./LogstashDeletePipelineResponse.md)>;` | Delete a Logstash pipeline. Delete a pipeline that is used for Logstash Central Management. If the request succeeds, you receive an empty response with an appropriate status code. || `deletePipeline` | `deletePipeline(this: [That](./That.md), params: [LogstashDeletePipelineRequest](./LogstashDeletePipelineRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[LogstashDeletePipelineResponse](./LogstashDeletePipelineResponse.md), unknown>>;` | &nbsp; || `deletePipeline` | `deletePipeline(this: [That](./That.md), params: [LogstashDeletePipelineRequest](./LogstashDeletePipelineRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[LogstashDeletePipelineResponse](./LogstashDeletePipelineResponse.md)>;` | &nbsp; || `getPipeline` | `getPipeline(this: [That](./That.md), params?: [LogstashGetPipelineRequest](./LogstashGetPipelineRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[LogstashGetPipelineResponse](./LogstashGetPipelineResponse.md)>;` | Get Logstash pipelines. Get pipelines that are used for Logstash Central Management. || `getPipeline` | `getPipeline(this: [That](./That.md), params?: [LogstashGetPipelineRequest](./LogstashGetPipelineRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[LogstashGetPipelineResponse](./LogstashGetPipelineResponse.md), unknown>>;` | &nbsp; || `getPipeline` | `getPipeline(this: [That](./That.md), params?: [LogstashGetPipelineRequest](./LogstashGetPipelineRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[LogstashGetPipelineResponse](./LogstashGetPipelineResponse.md)>;` | &nbsp; || `putPipeline` | `putPipeline(this: [That](./That.md), params: [LogstashPutPipelineRequest](./LogstashPutPipelineRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[LogstashPutPipelineResponse](./LogstashPutPipelineResponse.md)>;` | Create or update a Logstash pipeline. Create a pipeline that is used for Logstash Central Management. If the specified pipeline exists, it is replaced. || `putPipeline` | `putPipeline(this: [That](./That.md), params: [LogstashPutPipelineRequest](./LogstashPutPipelineRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[LogstashPutPipelineResponse](./LogstashPutPipelineResponse.md), unknown>>;` | &nbsp; || `putPipeline` | `putPipeline(this: [That](./That.md), params: [LogstashPutPipelineRequest](./LogstashPutPipelineRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[LogstashPutPipelineResponse](./LogstashPutPipelineResponse.md)>;` | &nbsp; |