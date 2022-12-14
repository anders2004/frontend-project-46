setup: install-deps publish
	npm link

install-deps:
	npm ci

dev:
	npx simple-git-hooks

lint:
	npx eslint .

test:
	npm run test

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage --coverageProvider=v8