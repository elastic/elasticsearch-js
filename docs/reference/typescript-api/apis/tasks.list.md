# Client.tasks.list

Get all tasks. Get information about the tasks currently running on one or more nodes in the cluster. WARNING: The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible. **Identifying running tasks** The `X-Opaque-Id header`, when provided on the HTTP request header, is going to be returned as a header in the response as well as in the headers field for in the task information. This enables you to track certain calls or associate certain tasks with the client that started them. For example: ``` curl -i -H "X-Opaque-Id: 123456" "http://localhost:9200/_tasks?group_by=parents" ``` The API returns the following result: ``` HTTP/1.1 200 OK X-Opaque-Id: 123456 content-type: application/json; charset=UTF-8 content-length: 831 { "tasks" : { "u5lcZHqcQhu-rUoFaqDphA:45" : { "node" : "u5lcZHqcQhu-rUoFaqDphA", "id" : 45, "type" : "transport", "action" : "cluster:monitor/tasks/lists", "start_time_in_millis" : 1513823752749, "running_time_in_nanos" : 293139, "cancellable" : false, "headers" : { "X-Opaque-Id" : "123456" }, "children" : [ { "node" : "u5lcZHqcQhu-rUoFaqDphA", "id" : 46, "type" : "direct", "action" : "cluster:monitor/tasks/lists[n]", "start_time_in_millis" : 1513823752750, "running_time_in_nanos" : 92133, "cancellable" : false, "parent_task_id" : "u5lcZHqcQhu-rUoFaqDphA:45", "headers" : { "X-Opaque-Id" : "123456" } } ] } } } ``` In this example, `X-Opaque-Id: 123456` is the ID as a part of the response header. The `X-Opaque-Id` in the task `headers` is the ID for the task that was initiated by the REST request. The `X-Opaque-Id` in the children `headers` is the child task of the task that was initiated by the REST request.

## Method Signature

```typescript
client.tasks.list(this: That, params?: T.TasksListRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksListResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`TasksListRequest`](../types/TasksListRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TasksListResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
