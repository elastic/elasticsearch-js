## Interface `SecurityRoleTemplateQuery`

| Name | Type | Description |
| - | - | - |
| `template` | [SecurityRoleTemplateScript](./SecurityRoleTemplateScript.md) | [SecurityRoleTemplateInlineQuery](./SecurityRoleTemplateInlineQuery.md) | When you create a role, you can specify a query that defines the document level security permissions. You can optionally use Mustache templates in the role query to insert the username of the current authenticated user into the role. Like other places in Elasticsearch that support templating or scripting, you can specify inline, stored, or file-based templates and define custom parameters. You access the details for the current authenticated user through the _user parameter. |
