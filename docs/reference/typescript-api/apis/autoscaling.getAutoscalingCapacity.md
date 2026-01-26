# Client.autoscaling.getAutoscalingCapacity

Get the autoscaling capacity. NOTE: This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. This API gets the current autoscaling capacity based on the configured autoscaling policy. It will return information to size the cluster appropriately to the current workload. The `required_capacity` is calculated as the maximum of the `required_capacity` result of all individual deciders that are enabled for the policy. The operator should verify that the `current_nodes` match the operator’s knowledge of the cluster to avoid making autoscaling decisions based on stale or incomplete information. The response contains decider-specific information you can use to diagnose how and why autoscaling determined a certain capacity was required. This information is provided for diagnosis only. Do not use this information to make autoscaling decisions.

## Method Signature

```typescript
client.autoscaling.getAutoscalingCapacity(this: That, params?: T.AutoscalingGetAutoscalingCapacityRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AutoscalingGetAutoscalingCapacityResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`AutoscalingGetAutoscalingCapacityRequest`](../types/AutoscalingGetAutoscalingCapacityRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.AutoscalingGetAutoscalingCapacityResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
