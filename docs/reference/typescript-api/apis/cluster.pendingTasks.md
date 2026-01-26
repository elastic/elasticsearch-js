# Client.cluster.pendingTasks

Get the pending cluster tasks. Get information about cluster-level changes (such as create index, update mapping, allocate or fail shard) that have not yet taken effect. NOTE: This API returns a list of any pending updates to the cluster state. These are distinct from the tasks reported by the task management API which include periodic tasks and tasks initiated by the user, such as node stats, search queries, or create index requests. However, if a user-initiated task such as a create index command causes a cluster state update, the activity of this task might be reported by both task api and pending cluster tasks API.

## Method Signature

```typescript
client.cluster.pendingTasks(this: That, params?: T.ClusterPendingTasksRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterPendingTasksResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterPendingTasksRequest`](../types/ClusterPendingTasksRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterPendingTasksResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
