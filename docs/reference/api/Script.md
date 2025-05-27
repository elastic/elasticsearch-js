## Interface `Script`

| Name | Type | Description |
| - | - | - |
| `id` | [Id](./Id.md) | The `id` for a stored script. |
| `lang` | [ScriptLanguage](./ScriptLanguage.md) | Specifies the language the script is written in. |
| `options` | Record<string, string> | &nbsp; |
| `params` | Record<string, any> | Specifies any named parameters that are passed into the script as variables. Use parameters instead of hard-coded values to decrease compile time. |
| `source` | [ScriptSource](./ScriptSource.md) | The script source. |
