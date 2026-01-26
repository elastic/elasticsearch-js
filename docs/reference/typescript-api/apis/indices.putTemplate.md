# Client.indices.putTemplate

Create or update a legacy index template. Index templates define settings, mappings, and aliases that can be applied automatically to new indices. Elasticsearch applies templates to new indices based on an index pattern that matches the index name. IMPORTANT: This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8. Composable templates always take precedence over legacy templates. If no composable template matches a new index, matching legacy templates are applied according to their order. Index templates are only applied during index creation. Changes to index templates do not affect existing indices. Settings and mappings specified in create index API requests override any settings or mappings specified in an index template. You can use C-style `/* *\/` block comments in index templates. You can include comments anywhere in the request body, except before the opening curly bracket. **Indices matching multiple templates** Multiple index templates can potentially match an index, in this case, both the settings and mappings are merged into the final configuration of the index. The order of the merging can be controlled using the order parameter, with lower order being applied first, and higher orders overriding them. NOTE: Multiple matching templates with the same order value will result in a non-deterministic merging order.

## Method Signature

```typescript
client.indices.putTemplate(this: That, params: T.IndicesPutTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutTemplateRequest`](../types/IndicesPutTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
