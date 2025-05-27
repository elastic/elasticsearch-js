## Interface `IngestScriptProcessor`

| Name | Type | Description |
| - | - | - |
| `id` | [Id](./Id.md) | ID of a stored script. If no `source` is specified, this parameter is required. |
| `lang` | [ScriptLanguage](./ScriptLanguage.md) | Script language. |
| `params` | Record<string, any> | Object containing parameters for the script. |
| `source` | [ScriptSource](./ScriptSource.md) | Inline script. If no `id` is specified, this parameter is required. |
