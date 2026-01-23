# InferenceCustomRequestParams

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | `string` | The body structure of the request. It requires passing in the string-escaped result of the JSON format HTTP request body.
For example:
```
"request": "{\"input\":${input}}"
```
> info
> The content string needs to be a single line except when using the Kibana console. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
