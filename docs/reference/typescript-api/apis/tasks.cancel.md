# Client.tasks.cancel

Cancel a task. WARNING: The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible. A task may continue to run for some time after it has been cancelled because it may not be able to safely stop its current activity straight away. It is also possible that Elasticsearch must complete its work on other tasks before it can process the cancellation. The get task information API will continue to list these cancelled tasks until they complete. The cancelled flag in the response indicates that the cancellation command has been processed and the task will stop as soon as possible. To troubleshoot why a cancelled task does not complete promptly, use the get task information API with the `?detailed` parameter to identify the other tasks the system is running. You can also use the node hot threads API to obtain detailed information about the work the system is doing instead of completing the cancelled task.

## Method Signature

```typescript
client.tasks.cancel(this: That, params?: T.TasksCancelRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksCancelResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`TasksCancelRequest`](../types/TasksCancelRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TasksCancelResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
