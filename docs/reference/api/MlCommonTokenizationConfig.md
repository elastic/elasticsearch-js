## Interface `MlCommonTokenizationConfig`

| Name | Type | Description |
| - | - | - |
| `do_lower_case` | boolean | Should the tokenizer lower case the text |
| `max_sequence_length` | [integer](./integer.md) | Maximum input sequence length for the model |
| `span` | [integer](./integer.md) | Tokenization spanning options. Special value of -1 indicates no spanning takes place |
| `truncate` | [MlTokenizationTruncate](./MlTokenizationTruncate.md) | Should tokenization input be automatically truncated before sending to the model for inference |
| `with_special_tokens` | boolean | Is tokenization completed with special tokens |
