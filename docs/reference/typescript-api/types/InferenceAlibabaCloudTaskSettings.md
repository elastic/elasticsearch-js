# InferenceAlibabaCloudTaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `input_type?` | `string` | For a `sparse_embedding` or `text_embedding` task, specify the type of input passed to the model.
Valid values are:

* `ingest` for storing document embeddings in a vector database.
* `search` for storing embeddings of search queries run against a vector database to find relevant documents. |
| `return_token?` | `boolean` | For a `sparse_embedding` task, it affects whether the token name will be returned in the response.
It defaults to `false`, which means only the token ID will be returned in the response. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
