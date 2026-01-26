# Client.connector.delete

Delete a connector. Removes a connector and associated sync jobs. This is a destructive action that is not recoverable. NOTE: This action doesn’t delete any API keys, ingest pipelines, or data indices associated with the connector. These need to be removed manually.

## Method Signature

```typescript
client.connector.delete(this: That, params: T.ConnectorDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorDeleteRequest`](../types/ConnectorDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
