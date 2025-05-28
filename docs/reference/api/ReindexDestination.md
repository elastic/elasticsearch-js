# `ReindexDestination` [interface-ReindexDestination]

| Name | Type | Description |
| - | - | - |
| `index` | [IndexName](./IndexName.md) | The name of the data stream, index, or index alias you are copying to. |
| `op_type` | [OpType](./OpType.md) | If it is `create`, the operation will only index documents that do not already exist (also known as "put if absent"). IMPORTANT: To reindex to a data stream destination, this argument must be `create`. |
| `pipeline` | string | The name of the pipeline to use. |
| `routing` | [Routing](./Routing.md) | By default, a document's routing is preserved unless it's changed by the script. If it is `keep`, the routing on the bulk request sent for each match is set to the routing on the match. If it is `discard`, the routing on the bulk request sent for each match is set to `null`. If it is `=value`, the routing on the bulk request sent for each match is set to all value specified after the equals sign ( `=`). |
| `version_type` | [VersionType](./VersionType.md) | The versioning to use for the indexing operation. |
