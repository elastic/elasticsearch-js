# Client.cat.tasks

Get task information. Get information about tasks currently running in the cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the task management API.

## Method Signature

```typescript
client.cat.tasks(this: That, params?: T.CatTasksRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatTasksResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatTasksRequest`](../types/CatTasksRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatTasksResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
