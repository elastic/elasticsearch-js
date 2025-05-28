# `IndicesModifyDataStreamAction` [interface-IndicesModifyDataStreamAction]

| Name | Type | Description |
| - | - | - |
| `add_backing_index` | [IndicesModifyDataStreamIndexAndDataStreamAction](./IndicesModifyDataStreamIndexAndDataStreamAction.md) | Adds an existing index as a backing index for a data stream. The index is hidden as part of this operation. WARNING: Adding indices with the `add_backing_index` action can potentially result in improper data stream behavior. This should be considered an expert level API. |
| `remove_backing_index` | [IndicesModifyDataStreamIndexAndDataStreamAction](./IndicesModifyDataStreamIndexAndDataStreamAction.md) | Removes a backing index from a data stream. The index is unhidden as part of this operation. A data stream’s write index cannot be removed. |
