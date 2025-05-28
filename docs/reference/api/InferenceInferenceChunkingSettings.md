# `InferenceInferenceChunkingSettings` [interface-InferenceInferenceChunkingSettings]

| Name | Type | Description |
| - | - | - |
| `max_chunk_size` | [integer](./integer.md) | The maximum size of a chunk in words. This value cannot be higher than `300` or lower than `20` (for `sentence` strategy) or `10` (for `word` strategy). |
| `overlap` | [integer](./integer.md) | The number of overlapping words for chunks. It is applicable only to a `word` chunking strategy. This value cannot be higher than half the `max_chunk_size` value. |
| `sentence_overlap` | [integer](./integer.md) | The number of overlapping sentences for chunks. It is applicable only for a `sentence` chunking strategy. It can be either `1` or `0`. |
| `strategy` | string | The chunking strategy: `sentence` or `word`. |
