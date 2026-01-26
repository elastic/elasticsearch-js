# Client.logstash.deletePipeline

Delete a Logstash pipeline. Delete a pipeline that is used for Logstash Central Management. If the request succeeds, you receive an empty response with an appropriate status code.

## Method Signature

```typescript
client.logstash.deletePipeline(this: That, params: T.LogstashDeletePipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LogstashDeletePipelineResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`LogstashDeletePipelineRequest`](../types/LogstashDeletePipelineRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LogstashDeletePipelineResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
