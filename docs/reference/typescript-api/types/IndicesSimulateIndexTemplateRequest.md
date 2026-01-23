# IndicesSimulateIndexTemplateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | Name of the index to simulate |
| `create?` | `boolean` | Whether the index template we optionally defined in the body should only be dry-run added if new or can also replace an existing one |
| `cause?` | `string` | User defined reason for dry-run creating the new template for simulation purposes |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `include_defaults?` | `boolean` | If true, returns all relevant default configurations for the index template. |
| `index_template?` | [`IndicesIndexTemplate`](IndicesIndexTemplate.md) | - |
| `body?` | `string | { [key: string]: any } & { name?: never, create?: never, cause?: never, master_timeout?: never, include_defaults?: never, index_template?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, create?: never, cause?: never, master_timeout?: never, include_defaults?: never, index_template?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
