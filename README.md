# node-child-basher

execute bash commands on a directory utilizing node child processes with timeouts.

### Arguments
- command (use $ as placeholder for filepath)
- directory
- (optional) file end to filter directory by

### ENV
- TIMEOUT (default 30s)

### Use
- install tsc
```bash
yarn install
```
- build
```bash
yarn build
```
- execute 'head -n 1' command on every csv in directory
```bash
node dist/src/index.js "head -n 1 $" /home/user/csvs .csv
```
- copy all .txt files in /usr/bin to '/new' directory
```bash
node dist/src/index.js "cp -r $ /new" /usr/bin .txt
```
- mv all .csv files in /usr/bin to /data with 5s timeout
```bash
TIMEOUT=5 node dist/src/index.js "mv $ /data" /usr/bin .csv
```
\.
### Personal Use
- I build this tool to execute python scripts on a directory of csv files. The script takes a single filename as an argument and does some processing.
```bash
node dist/src/index.js "python3 myscript.py $" /dir/of/csvs .csv 
```