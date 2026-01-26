# Client.cluster.putComponentTemplate

Create or update a component template. Component templates are building blocks for constructing index templates that specify index mappings, settings, and aliases. An index template can be composed of multiple component templates. To use a component template, specify it in an index template’s `composed_of` list. Component templates are only applied to new data streams and indices as part of a matching index template. Settings and mappings specified directly in the index template or the create index request override any settings or mappings specified in a component template. Component templates are only used during index creation. For data streams, this includes data stream creation and the creation of a stream’s backing indices. Changes to component templates do not affect existing indices, including a stream’s backing indices. You can use C-style `/* *\/` block comments in component templates. You can include comments anywhere in the request body except before the opening curly bracket. **Applying component templates** You cannot directly apply a component template to a data stream or index. To be applied, a component template must be included in an index template's `composed_of` list.

## Method Signature

```typescript
client.cluster.putComponentTemplate(this: That, params: T.ClusterPutComponentTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterPutComponentTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ClusterPutComponentTemplateRequest`](../types/ClusterPutComponentTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterPutComponentTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
