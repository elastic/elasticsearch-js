# InferenceCustomResponseParams

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `json_parser` | `any` | Specifies the JSON parser that is used to parse the response from the custom service.
Different task types require different json_parser parameters.
For example:
```
# text_embedding
# For a response like this:

{
 "object": "list",
 "data": [
     {
       "object": "embedding",
       "index": 0,
       "embedding": [
           0.014539449,
           -0.015288644
       ]
     }
 ],
 "model": "text-embedding-ada-002-v2",
 "usage": {
     "prompt_tokens": 8,
     "total_tokens": 8
 }
}

# the json_parser definition should look like this:

"response":{
  "json_parser":{
    "text_embeddings":"$.data[*].embedding[*]"
  }
}

# Elasticsearch supports the following embedding types:
* float
* byte
* bit (or binary)

To specify the embedding type for the response, the `embedding_type`
field should be added in the `json_parser` object. Here's an example:
"response":{
  "json_parser":{
    "text_embeddings":"$.data[*].embedding[*]",
    "embedding_type":"bit"
  }
}

If `embedding_type` is not specified, it defaults to `float`.

# sparse_embedding
# For a response like this:

{
  "request_id": "75C50B5B-E79E-4930-****-F48DBB392231",
  "latency": 22,
  "usage": {
     "token_count": 11
  },
  "result": {
     "sparse_embeddings": [
        {
          "index": 0,
          "embedding": [
            {
              "token_id": 6,
              "weight": 0.101
            },
            {
              "token_id": 163040,
              "weight": 0.28417
            }
          ]
        }
     ]
  }
}

# the json_parser definition should look like this:

"response":{
  "json_parser":{
    "token_path":"$.result.sparse_embeddings[*].embedding[*].token_id",
    "weight_path":"$.result.sparse_embeddings[*].embedding[*].weight"
  }
}

# rerank
# For a response like this:

{
  "results": [
    {
      "index": 3,
      "relevance_score": 0.999071,
      "document": "abc"
    },
    {
      "index": 4,
      "relevance_score": 0.7867867,
      "document": "123"
    },
    {
      "index": 0,
      "relevance_score": 0.32713068,
      "document": "super"
    }
  ],
}

# the json_parser definition should look like this:

"response":{
  "json_parser":{
    "reranked_index":"$.result.scores[*].index",    // optional
    "relevance_score":"$.result.scores[*].score",
    "document_text":"xxx"    // optional
  }
}

# completion
# For a response like this:

{
 "id": "chatcmpl-B9MBs8CjcvOU2jLn4n570S5qMJKcT",
 "object": "chat.completion",
 "created": 1741569952,
 "model": "gpt-4.1-2025-04-14",
 "choices": [
   {
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I assist you today?",
      "refusal": null,
      "annotations": []
    },
    "logprobs": null,
    "finish_reason": "stop"
  }
 ]
}

# the json_parser definition should look like this:

"response":{
  "json_parser":{
    "completion_result":"$.choices[*].message.content"
  }
} |

## See Also

- [All Types](./)
- [API Methods](../index.md)
