# Client.logstash.putPipeline

Create or update a Logstash pipeline. Create a pipeline that is used for Logstash Central Management. If the specified pipeline exists, it is replaced.

## Method Signature

```typescript
client.logstash.putPipeline(this: That, params: T.LogstashPutPipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LogstashPutPipelineResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`LogstashPutPipelineRequest`](../types/LogstashPutPipelineRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LogstashPutPipelineResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
