# Client.fleet.globalCheckpoints

Get global checkpoints. Get the current global checkpoints for an index. This API is designed for internal use by the Fleet server project.

## Method Signature

```typescript
client.fleet.globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetGlobalCheckpointsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`FleetGlobalCheckpointsRequest`](../types/FleetGlobalCheckpointsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FleetGlobalCheckpointsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
