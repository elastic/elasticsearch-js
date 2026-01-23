# InferenceAzureAiStudioTaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `do_sample?` | `float` | For a `completion` task, instruct the inference process to perform sampling.
It has no effect unless `temperature` or `top_p` is specified. |
| `max_new_tokens?` | `integer` | For a `completion` task, provide a hint for the maximum number of output tokens to be generated. |
| `temperature?` | `float` | For a `completion` task, control the apparent creativity of generated completions with a sampling temperature.
It must be a number in the range of 0.0 to 2.0.
It should not be used if `top_p` is specified. |
| `top_p?` | `float` | For a `completion` task, make the model consider the results of the tokens with nucleus sampling probability.
It is an alternative value to `temperature` and must be a number in the range of 0.0 to 2.0.
It should not be used if `temperature` is specified. |
| `user?` | `string` | For a `text_embedding` task, specify the user issuing the request.
This information can be used for abuse detection. |
| `return_documents?` | `boolean` | For a `rerank` task, return doc text within the results. |
| `top_n?` | `integer` | For a `rerank` task, the number of most relevant documents to return.
It defaults to the number of the documents. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
