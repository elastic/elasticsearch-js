# Client.cat.mlJobs

Get anomaly detection jobs. Get configuration and usage information for anomaly detection jobs. This API returns a maximum of 10,000 jobs. If the Elasticsearch security features are enabled, you must have `monitor_ml`, `monitor`, `manage_ml`, or `manage` cluster privileges to use this API. IMPORTANT: CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get anomaly detection job statistics API.

## Method Signature

```typescript
client.cat.mlJobs(this: That, params?: T.CatMlJobsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatMlJobsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatMlJobsRequest`](../types/CatMlJobsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatMlJobsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
