# Client.ingest.simulate

Simulate a pipeline. Run an ingest pipeline against a set of provided documents. You can either specify an existing pipeline to use with the provided documents or supply a pipeline definition in the body of the request.

## Method Signature

```typescript
client.ingest.simulate(this: That, params: T.IngestSimulateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestSimulateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IngestSimulateRequest`](../types/IngestSimulateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IngestSimulateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
