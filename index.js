// Sample Web Scraper Android Dev Blog Articles 
const PORT = 8000 // Local server port number for Express
const ARTICLES_COUNT = 5

const axios = require('axios') // Promise based HTTP client for the browser and node.js
const cheerio = require('cheerio') // Read HTML files
const express = require('express') // Fast, unopinionated, minimalist web framework

const app = express()

const url = 'https://android-developers.googleblog.com'

axios(url)
    .then((result) => {
        const html = result.data
        const data = cheerio.load(html)
        const processedDataArray = []
        var count = 0

        // Look for spefic tag in the HTML file
        data('.post', html).each(function() {
            if(count == ARTICLES_COUNT){ return }

            const title = data(this).find('.title').text().trim()
            const url = data(this).find('.title').find('a').attr('href')
            const datePublished = data(this).find('.publishdate').text().trim()
            
            processedDataArray.push({
                title,
                url,
                datePublished
            })
            count++
        })
        console.log(processedDataArray.length)
        console.log(processedDataArray)
    }).catch((err) => {
        console.log(err)
    });

// Update the server whenever there is a change to this file
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))