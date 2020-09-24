#!/usr/bin/env node
const fs = require('fs');

const colors = require('colors')
const request = require('request')


// patterns & splitter
const PT1 = /\bhttps?::\/\/\S+/gi
const PT2 = /\bhttps?:\/\/\S+/gi


// let filename = process.argv[2]
// if(process.argv.length === 3)
let argv3 = process.argv[2]
let argv4 = process.argv[3]

if (argv3 != null) {
    if(argv4 != null) { // for URL process
        if(argv3 === '-url' || argv3 === '/url') {
            request(argv4, function (error, response, body) {
                if(response.statusCode === 200) { // only process url with statusCode 200
                    let tempURL = getURLs(body);
                    printURLStatus(tempURL);
                } else {
                    console.log('Bad link'.red);
                }
            });

        } else {
            console.log('Command not found!');
        }
    } else {
        if(argv3 === '--version' || argv3 === '/v') {
            console.log('INSANE-CLI VERSION 0.69'.green)
        } else { // for local file process
            let filename = argv3;

            try {
                if(fs.existsSync(filename)) { // check if file exist
                    (async () => {
                        await fs.promises.readFile(filename)
                            .then(function (data) {

                                let finalURLs = getURLs(data)
                                printURLStatus(finalURLs)

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })()
                } else {
                    console.log('File not found!');
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

} else {
    showHelp()
}

// extract some special urls that regex can't do alone
function getURLs(data) {
    let finalURLs = []
    let tempArr = data.toString().split(/[({\\<"^`|>})]/)

    for (let i = tempArr.length; i--;) {
        let tmp = (tempArr[i].match(PT1) || tempArr[i].match(PT2)) != null ?
            tempArr[i].match(PT1) || tempArr[i].match(PT2) : ""

        if (tmp.length === 1) {
            if (tmp !== "") finalURLs.push(tmp[0])
        } else {
            for (let i = tmp.length; i--;) {
                finalURLs.push(tmp[i])
            }
        }
    }
    finalURLs = [...new Set(finalURLs)]
    return finalURLs
}

function printURLStatus(urls) {

    for (let i = urls.length; i--;) {
        try {
            request(urls[i],{method: 'HEAD', timeout: 1800}, function (error, response, body) {

                //console.error('error:', error);
                let status = response && response.statusCode;
                if (status !== null) {
                    if (status === 200) {
                        console.log('[' + status + ']GOOD - ' + urls[i].green)
                    } else if (status === 400 || status === 404) {
                        console.log('[' + status + ']BAD - ' + urls[i].red)
                    } else if (status === 301 || status === 307 || status === 308) {
                        console.log('[' + status + ']REDIRECT - ' + urls[i].blue)
                    } else {
                        console.log('UNKNOWN - ' + urls[i].grey)
                    }
                }
            });
        } catch (error) {
            console.error('WTF - ' + urls[i].yellow)
        }
    }
}

function showHelp() {
    console.log('HOW TO USE'.bgGreen)
    console.log('------------------------------------------------'.blue)
    console.log(' insane-cli'.green + ' for instructions'.blue)
    console.log(' insane-cli [--version][/v]'.green + ' to check current version'.blue)
    console.log(' insane-cli [file-path]'.green + ' process a file'.blue)
    console.log(' insane-cli -url [full-url-link]'.green + ' process body\'s link'.blue)
}