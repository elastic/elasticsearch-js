# Client.inference.putHuggingFace

Create a Hugging Face inference endpoint. Create an inference endpoint to perform an inference task with the `hugging_face` service. Supported tasks include: `text_embedding`, `completion`, and `chat_completion`. To configure the endpoint, first visit the Hugging Face Inference Endpoints page and create a new endpoint. Select a model that supports the task you intend to use. For Elastic's `text_embedding` task: The selected model must support the `Sentence Embeddings` task. On the new endpoint creation page, select the `Sentence Embeddings` task under the `Advanced Configuration` section. After the endpoint has initialized, copy the generated endpoint URL. Recommended models for `text_embedding` task: * `all-MiniLM-L6-v2` * `all-MiniLM-L12-v2` * `all-mpnet-base-v2` * `e5-base-v2` * `e5-small-v2` * `multilingual-e5-base` * `multilingual-e5-small` For Elastic's `chat_completion` and `completion` tasks: The selected model must support the `Text Generation` task and expose OpenAI API. HuggingFace supports both serverless and dedicated endpoints for `Text Generation`. When creating dedicated endpoint select the `Text Generation` task. After the endpoint is initialized (for dedicated) or ready (for serverless), ensure it supports the OpenAI API and includes `/v1/chat/completions` part in URL. Then, copy the full endpoint URL for use. Recommended models for `chat_completion` and `completion` tasks: * `Mistral-7B-Instruct-v0.2` * `QwQ-32B` * `Phi-3-mini-128k-instruct` For Elastic's `rerank` task: The selected model must support the `sentence-ranking` task and expose OpenAI API. HuggingFace supports only dedicated (not serverless) endpoints for `Rerank` so far. After the endpoint is initialized, copy the full endpoint URL for use. Tested models for `rerank` task: * `bge-reranker-base` * `jina-reranker-v1-turbo-en-GGUF`

## Method Signature

```typescript
client.inference.putHuggingFace(this: That, params: T.InferencePutHuggingFaceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutHuggingFaceResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutHuggingFaceRequest`](../types/InferencePutHuggingFaceRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutHuggingFaceResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
