setup: install-deps publish
	npm link

install-deps:
	npm ci

dev:
	npx simple-git-hooks

lint:
	npx eslint .

publish:
	npm publish --dry-run