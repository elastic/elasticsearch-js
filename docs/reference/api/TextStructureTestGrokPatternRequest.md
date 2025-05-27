## Interface `TextStructureTestGrokPatternRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { ecs_compatibility?: never; grok_pattern?: never; text?: never; }) | All values in `body` will be added to the request body. |
| `ecs_compatibility` | string | The mode of compatibility with ECS compliant Grok patterns. Use this parameter to specify whether to use ECS Grok patterns instead of legacy ones when the structure finder creates a Grok pattern. Valid values are `disabled` and `v1`. |
| `grok_pattern` | [GrokPattern](./GrokPattern.md) | The Grok pattern to run on the text. |
| `querystring` | { [key: string]: any; } & { ecs_compatibility?: never; grok_pattern?: never; text?: never; } | All values in `querystring` will be added to the request querystring. |
| `text` | string[] | The lines of text to run the Grok pattern on. |
