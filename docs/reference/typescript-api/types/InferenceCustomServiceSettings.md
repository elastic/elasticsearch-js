# InferenceCustomServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `batch_size?` | `integer` | Specifies the batch size used for the semantic_text field. If the field is not provided, the default is 10.
The batch size is the maximum number of inputs in a single request to the upstream service.
The chunk within the batch are controlled by the selected chunking strategy for the semantic_text field. |
| `headers?` | `any` | Specifies the HTTP header parameters – such as `Authentication` or `Content-Type` – that are required to access the custom service.
For example:
```
"headers":{
  "Authorization": "Bearer ${api_key}",
  "Content-Type": "application/json;charset=utf-8"
}
``` |
| `input_type?` | `any` | Specifies the input type translation values that are used to replace the `${input_type}` template in the request body.
For example:
```
"input_type": {
  "translation": {
    "ingest": "do_ingest",
    "search": "do_search"
  },
  "default": "a_default"
},
```
If the subsequent inference requests come from a search context, the `search` key will be used and the template will be replaced with `do_search`.
If it comes from the ingest context `do_ingest` is used. If it's a different context that is not specified, the default value will be used. If no default is specified an empty string is used.
`translation` can be:
* `classification`
* `clustering`
* `ingest`
* `search` |
| `query_parameters?` | `any` | Specifies the query parameters as a list of tuples. The arrays inside the `query_parameters` must have two items, a key and a value.
For example:
```
"query_parameters":[
  ["param_key", "some_value"],
  ["param_key", "another_value"],
  ["other_key", "other_value"]
]
```
If the base url is `https://www.elastic.co` it results in: `https://www.elastic.co?param_key=some_value&param_key=another_value&other_key=other_value`. |
| `request` | [`InferenceCustomRequestParams`](InferenceCustomRequestParams.md) | The request configuration object. |
| `response` | [`InferenceCustomResponseParams`](InferenceCustomResponseParams.md) | The response configuration object. |
| `secret_parameters` | `any` | Specifies secret parameters, like `api_key` or `api_token`, that are required to access the custom service.
For example:
```
"secret_parameters":{
  "api_key":"<api_key>"
}
``` |
| `url?` | `string` | The URL endpoint to use for the requests. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
