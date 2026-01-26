# Client.cluster.deleteVotingConfigExclusions

Clear cluster voting config exclusions. Remove master-eligible nodes from the voting configuration exclusion list.

## Method Signature

```typescript
client.cluster.deleteVotingConfigExclusions(this: That, params?: T.ClusterDeleteVotingConfigExclusionsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterDeleteVotingConfigExclusionsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterDeleteVotingConfigExclusionsRequest`](../types/ClusterDeleteVotingConfigExclusionsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterDeleteVotingConfigExclusionsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
