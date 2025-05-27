## Interface `InferenceAlibabaCloudServiceSettings`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key for the AlibabaCloud AI Search API. |
| `host` | string | The name of the host address used for the inference task. You can find the host address in the API keys section of the documentation. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from AlibabaCloud AI Search. By default, the `alibabacloud-ai-search` service sets the number of requests allowed per minute to `1000`. |
| `service_id` | string | The name of the model service to use for the inference task. The following service IDs are available for the `completion` task: * `ops-qwen-turbo` * `qwen-turbo` * `qwen-plus` * `qwen-max ÷ qwen-max-longcontext`The following service ID is available for the `rerank` task: * `ops-bge-reranker-larger`The following service ID is available for the `sparse_embedding` task: * `ops-text-sparse-embedding-001`The following service IDs are available for the `text_embedding` task: `ops-text-embedding-001` `ops-text-embedding-zh-001` `ops-text-embedding-en-001` `ops-text-embedding-002` |
| `workspace` | string | The name of the workspace used for the inference task. |
