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

## Run program
```
// help
insane-cli

// check insane-cli version
insane-cli --version  or  /v

// check links which are extracted from file named 'test1' (or test2.html or any file)
insane-cli test1 

// // check links of body's webpage by URL
insane-cli -url https://www.google.com

```

### To run globally
You might need to use ```npm link``` in the current ```insane-cli``` directory. 
Otherwise you can use syntax ```node insane-cli <file>``` to run. 
