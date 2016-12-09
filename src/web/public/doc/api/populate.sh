#!/bin/sh
#
# Original location of the following files
#

# or just from $WORKDIR/_build/x86_64/third-party/nodejs/node-v0.xx.x/doc/api
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/assert.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/buffer.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/console.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/punycode.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/querystring.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/url.markdown
wget --no-check-certificate http://raw.github.com/joyent/node/master/doc/api/util.markdown

# or just from $WORKDIR/third-party/node_modules/buffers/buffers-0.1.1.tgz/package/README.markdown
wget --no-check-certificate https://raw.github.com/substack/node-buffers/master/README.markdown -O buffers.markdown

# or just from $WORKDIR/third-party/node_modules/sprintf/sprintf-0.1.3.tgz/package/README.md
#wget --no-check-certificate https://raw.github.com/maritz/node-sprintf/master/README.md -O sprintf.markdown
wget --no-check-certificate https://raw.github.com/alexei/sprintf.js/master/README.md -O sprintf.markdown

