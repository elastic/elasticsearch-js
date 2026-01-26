# Client.connector.post

Create a connector. Connectors are Elasticsearch integrations that bring content from third-party data sources, which can be deployed on Elastic Cloud or hosted on your own infrastructure. Elastic managed connectors (Native connectors) are a managed service on Elastic Cloud. Self-managed connectors (Connector clients) are self-managed on your infrastructure.

## Method Signature

```typescript
client.connector.post(this: That, params?: T.ConnectorPostRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorPostResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ConnectorPostRequest`](../types/ConnectorPostRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorPostResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
