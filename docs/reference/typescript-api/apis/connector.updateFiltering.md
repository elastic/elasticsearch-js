# Client.connector.updateFiltering

Update the connector filtering. Update the draft filtering configuration of a connector and marks the draft validation state as edited. The filtering draft is activated once validated by the running Elastic connector service. The filtering property is used to configure sync rules (both basic and advanced) for a connector.

## Method Signature

```typescript
client.connector.updateFiltering(this: That, params: T.ConnectorUpdateFilteringRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorUpdateFilteringResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorUpdateFilteringRequest`](../types/ConnectorUpdateFilteringRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorUpdateFilteringResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
