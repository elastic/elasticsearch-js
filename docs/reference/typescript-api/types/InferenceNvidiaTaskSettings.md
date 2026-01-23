# InferenceNvidiaTaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `input_type?` | [`InferenceNvidiaInputType`](InferenceNvidiaInputType.md) | For a `text_embedding` task, type of input sent to the Nvidia endpoint.
Valid values are:

* `ingest`: Mapped to Nvidia's `passage` value in request. Used when generating embeddings during indexing.
* `search`: Mapped to Nvidia's `query` value in request. Used when generating embeddings during querying.

IMPORTANT: For Nvidia endpoints, if the `input_type` field is not specified, it defaults to `query`. |
| `truncate?` | [`InferenceCohereTruncateType`](InferenceCohereTruncateType.md) | For a `text_embedding` task, the method used by the Nvidia model to handle inputs longer than the maximum token length.
Valid values are:

* `END`: When the input exceeds the maximum input token length, the end of the input is discarded.
* `NONE`: When the input exceeds the maximum input token length, an error is returned.
* `START`: When the input exceeds the maximum input token length, the start of the input is discarded. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
