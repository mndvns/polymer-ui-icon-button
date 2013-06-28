
build: components index.js template.js
	@component build --dev

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

jade:
	@jade --pretty . --obj component.json --watch

.PHONY: clean
