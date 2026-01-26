# Client.nodes.getRepositoriesMeteringInfo

Get cluster repositories metering. Get repositories metering information for a cluster. This API exposes monotonically non-decreasing counters and it is expected that clients would durably store the information needed to compute aggregations over a period of time. Additionally, the information exposed by this API is volatile, meaning that it will not be present after node restarts.

## Method Signature

```typescript
client.nodes.getRepositoriesMeteringInfo(this: That, params: T.NodesGetRepositoriesMeteringInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesGetRepositoriesMeteringInfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`NodesGetRepositoriesMeteringInfoRequest`](../types/NodesGetRepositoriesMeteringInfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.NodesGetRepositoriesMeteringInfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
