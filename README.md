# insane-cli

## Clone and change to working directory
```
git clone https://github.com/VietnameZe/insane-cli.git
cd insane-cli
```

## Required dependencies 
Install [colors](https://www.npmjs.com/package/colors), [request](https://www.npmjs.com/package/request):
```
npm i --save colors request
```
## To run globally
You might need to use ```npm link``` in ```insane-cli``` directory. 
Otherwise you can use syntax: ```node insane-cli <args-see-below>``` to run. 

## Run program
```
// help
insane-cli

// check insane-cli version
insane-cli --version  or  /v

// check links which are extracted from file named 'sample.txt'
insane-cli sample.txt 

// // check links of body's webpage by URL
insane-cli -url https://www.google.com

```


