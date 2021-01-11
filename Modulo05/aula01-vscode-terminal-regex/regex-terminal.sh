find . -name '*.test.js'
find . -name '*.test.js' -not -path '*node_modules**'
find . -name '*.js' -not -path '*node_modules**'

npm i -g ipt
find . -name '*.js' -not -path '*node_modules**' | ipt

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}


find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}