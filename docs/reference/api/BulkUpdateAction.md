# `BulkUpdateAction` [interface-BulkUpdateAction]

| Name | Type | Description |
| - | - | - |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | If `false`, source retrieval is turned off. You can also specify a comma-separated list of the fields you want to retrieve. |
| `detect_noop` | boolean | If true, the `result` in the response is set to 'noop' when no changes to the document occur. |
| `doc_as_upsert` | boolean | Set to `true` to use the contents of `doc` as the value of `upsert`. |
| `doc` | TPartialDocument | A partial update to an existing document. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | The script to run to update the document. |
| `scripted_upsert` | boolean | Set to `true` to run the script whether or not the document exists. |
| `upsert` | TDocument | If the document does not already exist, the contents of `upsert` are inserted as a new document. If the document exists, the `script` is run. |
