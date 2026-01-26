# Client.tasks.get

Get task information. Get information about a task currently running in the cluster. WARNING: The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible. If the task identifier is not found, a 404 response code indicates that there are no resources that match the request.

## Method Signature

```typescript
client.tasks.get(this: That, params: T.TasksGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TasksGetRequest`](../types/TasksGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TasksGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
