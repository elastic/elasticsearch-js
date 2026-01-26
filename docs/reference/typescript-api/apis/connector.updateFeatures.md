# Client.connector.updateFeatures

Update the connector features. Update the connector features in the connector document. This API can be used to control the following aspects of a connector: * document-level security * incremental syncs * advanced sync rules * basic sync rules Normally, the running connector service automatically manages these features. However, you can use this API to override the default behavior. To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

## Method Signature

```typescript
client.connector.updateFeatures(this: That, params: T.ConnectorUpdateFeaturesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorUpdateFeaturesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorUpdateFeaturesRequest`](../types/ConnectorUpdateFeaturesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorUpdateFeaturesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
