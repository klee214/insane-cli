/*
Minh Huy Nguyen
https://x7z.net
I use semicolons in this code LOL
* */


const fs = require('fs');
const colors = require('colors');
const getStatusCode = require('url-status-code');

// patterns & splitter
const PT1 = /\bhttps?::\/\/\S+/gi;
const PT2 = /\bhttps?:\/\/\S+/gi;
const SPLTR = /[{\\<"^`|>}]/;


let filename = process.argv[2];

if(filename != null) {
    fs.readFile(filename, 'utf8', function(err, data) {
        // if (err) throw err;
        if (err) {
            console.log('FILE NOT FOUND');
        } else {

            let finalURLs = [];
            let tempArr = data.split(SPLTR);

            for (let i = 0; i < tempArr.length; i++) {
                let tmp = (tempArr[i].match(PT1) || tempArr[i].match(PT2)) != null ?
                    tempArr[i].match(PT1) || tempArr[i].match(PT2) : "";

                if (tmp.length === 1) {
                    if (tmp !== "") finalURLs.push(tmp[0]);
                } else {
                    for (let i = 0; i < tmp.length; i++) {
                        finalURLs.push(tmp[i]);
                    }
                }
            }

            finalURLs = [...new Set(finalURLs)];

            for (let i = 0; i < finalURLs.length; i++) {
                (async () => {
                    try {
                        const status = await getStatusCode(finalURLs[i])
                        if(status === 200) {
                            console.log('GOOD - ' + finalURLs[i].green)
                        } else if(status === 400 || status === 404) {
                            console.log('BAD - ' + finalURLs[i].red)
                        } else if(status === 301 || status === 307 || status === 308) {
                            console.log('REDIRECT - ' + finalURLs[i].blue)
                        } else {
                            console.log('UNKNOWN - ' + finalURLs[i].grey)
                        }
                    } catch (error) {
                        console.error('WTF - ' + finalURLs[i].yellow)
                    }
                })()
            }
        }
    });

} else {
    showHelp();
}

function showHelp() {
    console.log('HOW TO USE'.bgGreen);
    console.log('------------------------------------------------'.blue);
    console.log('node insane-cli'.green + ' for instructions'.blue);
    console.log('node insane-cli [--v][--version]'.green + ' to check current version'.blue);
    console.log('node insane-cli [file-path]'.green + ' process a file'.blue);
}








