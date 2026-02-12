workspace_dir := "/workspaces"
output_folder := ".buildkite/output"
version := "main"

[doc('set up dependencies')]
setup: clean
  rm -rf node_modules package-lock.json
  npm install

[doc('clean workspace')]
clean:
  @echo '{{BLUE + BOLD}}TARGET: clean workspace {{output_folder}}{{NORMAL}}'
  rm -rf {{output_folder}}
  @echo "{{BLUE + BOLD}}done.{{NORMAL}}"

[doc('build client artifacts with version')]
assemble version=version:
  @echo '{{BLUE + BOLD}}TARGET: assemble API {{version}}{{NORMAL}}'
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

[doc('generate endpoints')]
codegen version=version: clone-generator
  @echo '{{BLUE + BOLD}}TARGET: codegen API {{version}}{{NORMAL}}'
  node .buildkite/make.mjs --task codegen {{version}}
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

[doc('generate documentation')]
docsgen version=version:
  @echo '{{BLUE + BOLD}}TARGET: docsgen API {{version}}{{NORMAL}}'
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

[doc('bump client internals to version')]
bump version=version:
  @echo '{{BLUE + BOLD}}TARGET: bump API {{version}}{{NORMAL}}'
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

[doc('bump stack version in test matrix to version')]
bumpmatrix version=version:
  @echo '{{BLUE + BOLD}}TARGET: bumpmatrix API {{version}}{{NORMAL}}'
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

[doc('generate the doc examples')]
examplegen:
  @echo '{{BLUE + BOLD}}TARGET: examplegen{{NORMAL}}'
  @echo '{{BLUE + BOLD}}TODO{{NORMAL}}'

clone-generator:
  [ -d {{workspace_dir}}/elastic-client-generator-js ] || gh repo clone elastic/elastic-client-generator-js {{workspace_dir}}/elastic-client-generator-js -- --depth=1
  cd {{workspace_dir}}/elastic-client-generator-js && npm install
