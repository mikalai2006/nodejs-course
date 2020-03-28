# Caesar cipher CLI tool (RS School NodeJS course)
Implement CLI tool that will encode and decode a text by  [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

**Fast start**

    git clone https://github.com/mikalai2006/nodejs-course.git
    cd task1
    npm install
    node my_caesar_cli -a encode -s 2


**Use**

    Usage: action [options]
    
**Options:**
CLI tool should accept 4 options (short alias and full name):

     -a,--action <action> an action encode/decode
     -V, --version output the version number
     -s, --shift <num> a shift
     -i, --input <file> an input file (default: false)
     -o, --output <file> an output file (default: false)
     -h, --help display help for command
| option| type| require | example
|--|--|--|--
| **-a** or **--action** | string [**encode, decode**] | yes | `-a encode`
| **-s** or **--shift** | number | yes| `-s 2`
| **-i** or **--input** | string [path to input file] | no | `-i input.txt`
| **-o** or **--output** | string [path to output file] | no| `-o output.txt`

**Examples:**

    node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
    node my_caesar_cli -a encode -s 7
    node my_caesar_cli -a decode -s 2
    node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"

