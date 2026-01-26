# Client.security.enrollKibana

Enroll Kibana. Enable a Kibana instance to configure itself for communication with a secured Elasticsearch cluster. NOTE: This API is currently intended for internal use only by Kibana. Kibana uses this API internally to configure itself for communications with an Elasticsearch cluster that already has security features enabled.

## Method Signature

```typescript
client.security.enrollKibana(this: That, params?: T.SecurityEnrollKibanaRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityEnrollKibanaResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityEnrollKibanaRequest`](../types/SecurityEnrollKibanaRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityEnrollKibanaResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
