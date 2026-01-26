# Client.inference.putCustom

Create a custom inference endpoint. The custom service gives more control over how to interact with external inference services that aren't explicitly supported through dedicated integrations. The custom service gives you the ability to define the headers, url, query parameters, request body, and secrets. The custom service supports the template replacement functionality, which enables you to define a template that can be replaced with the value associated with that key. Templates are portions of a string that start with `${` and end with `}`. The parameters `secret_parameters` and `task_settings` are checked for keys for template replacement. Template replacement is supported in the `request`, `headers`, `url`, and `query_parameters`. If the definition (key) is not found for a template, an error message is returned. In case of an endpoint definition like the following: ``` PUT _inference/text_embedding/test-text-embedding { "service": "custom", "service_settings": { "secret_parameters": { "api_key": "<some api key>" }, "url": "...endpoints.huggingface.cloud/v1/embeddings", "headers": { "Authorization": "Bearer ${api_key}", "Content-Type": "application/json" }, "request": "{\"input\": ${input}}", "response": { "json_parser": { "text_embeddings":"$.data[*].embedding[*]" } } } } ``` To replace `${api_key}` the `secret_parameters` and `task_settings` are checked for a key named `api_key`. > info > Templates should not be surrounded by quotes. Pre-defined templates: * `${input}` refers to the array of input strings that comes from the `input` field of the subsequent inference requests. * `${input_type}` refers to the input type translation values. * `${query}` refers to the query field used specifically for reranking tasks. * `${top_n}` refers to the `top_n` field available when performing rerank requests. * `${return_documents}` refers to the `return_documents` field available when performing rerank requests.

## Method Signature

```typescript
client.inference.putCustom(this: That, params: T.InferencePutCustomRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutCustomResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutCustomRequest`](../types/InferencePutCustomRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutCustomResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
