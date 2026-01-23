# TermvectorsFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_doc_freq?` | `integer` | Ignore words which occur in more than this many docs.
Defaults to unbounded. |
| `max_num_terms?` | `integer` | The maximum number of terms that must be returned per field. |
| `max_term_freq?` | `integer` | Ignore words with more than this frequency in the source doc.
It defaults to unbounded. |
| `max_word_length?` | `integer` | The maximum word length above which words will be ignored.
Defaults to unbounded. |
| `min_doc_freq?` | `integer` | Ignore terms which do not occur in at least this many docs. |
| `min_term_freq?` | `integer` | Ignore words with less than this frequency in the source doc. |
| `min_word_length?` | `integer` | The minimum word length below which words will be ignored. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
