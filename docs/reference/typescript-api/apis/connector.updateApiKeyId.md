# Client.connector.updateApiKeyId

Update the connector API key ID. Update the `api_key_id` and `api_key_secret_id` fields of a connector. You can specify the ID of the API key used for authorization and the ID of the connector secret where the API key is stored. The connector secret ID is required only for Elastic managed (native) connectors. Self-managed connectors (connector clients) do not use this field.

## Method Signature

```typescript
client.connector.updateApiKeyId(this: That, params: T.ConnectorUpdateApiKeyIdRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorUpdateApiKeyIdResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorUpdateApiKeyIdRequest`](../types/ConnectorUpdateApiKeyIdRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorUpdateApiKeyIdResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
