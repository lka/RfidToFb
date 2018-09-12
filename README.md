# RfidToDb

read data from RFID-Reader or Barcode-Scanner from stdin, append station-number and timestamp and write it to the configured table in a firebird database

## Editing
I use Atom Editor...
Configure it with eslint support (install linter-eslint) and substitution of Windows eol to unix style (install line-ending-converter and use LF only).
Set in editor configuration TAB to soft-tabs with 2 spaces.

## Environment
use nvm and install node (32Bits) locally

## Installation
get project from github and use

> npm install

to install all dependencies

create table in your firebird database with:
  ID integer not null autoincrement,
  DAT timestamp,
  STATION integer,
  SN varchar(40)

create directory 'config' in project directory
create JSON file 'configuration.json' in config directory and enter:
{"host":"IPV4-address of your firebird server","database":"path to your database file","table":"name of your table in database to write to","station":Number,"transaction":1 for use transaction=yes or 0 for no}

## Quick Start

> node main.js

## Usage

use RFID-Reader or Barcode-Scanner as USB-Keyboard emulation
read RFID-Chip or Barcode
after eol the program sends the entered string to the database
use a trigger in the database to give it intelligence and handle the data

## Running the build

> npm pack

## Test

use Keyboard
enter string, end with "Enter"
look at database, whether string and timestamp was entered in table

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(c) Copyright H.Lischka, 03.09.2018
