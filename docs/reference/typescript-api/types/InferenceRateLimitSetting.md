# InferenceRateLimitSetting

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `requests_per_minute?` | `integer` | The number of requests allowed per minute.
By default, the number of requests allowed per minute is set by each service as follows:

* `alibabacloud-ai-search` service: `1000`
* `anthropic` service: `50`
* `azureaistudio` service: `240`
* `azureopenai` service and task type `text_embedding`: `1440`
* `azureopenai` service and task types `completion` or `chat_completion`: `120`
* `cohere` service: `10000`
* `contextualai` service: `1000`
* `elastic` service and task type `chat_completion`: `240`
* `googleaistudio` service: `360`
* `googlevertexai` service: `30000`
* `hugging_face` service: `3000`
* `jinaai` service: `2000`
* `llama` service: `3000`
* `mistral` service: `240`
* `openai` service and task type `text_embedding`: `3000`
* `openai` service and task type `completion`: `500`
* `openshift_ai` service: `3000`
* `voyageai` service: `2000`
* `watsonxai` service: `120` |

## See Also

- [All Types](./)
- [API Methods](../index.md)
