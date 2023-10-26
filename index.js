const http = require('http')
const path = require('path')
const fs = require('fs') 
const url = require('url')

let dataPath = path.join(__dirname, "data")

const server = http.createServer((req, res)=>{
    if(req.url == '/jokes' && req.method == 'GET'){
        getAllJokes(req, res)
    }
})

server.listen(3000)

function getAllJokes(req, res){
    let dir = fs.readdirSync(dataPath);
    let allJokes = [];
    // for(let i = 0; i < dir.length; i++) {
    //     let file = fs.readFileSync(path.join(dataPath, i+'.json'));
    //     let jokeJson = Buffer.from(file).toString();
    //     let joke = JSON.parse(jokeJson);
    //     joke.id = i;

    //     allJokes.push(joke);
    // }
    for(let i = 0; i < dir.length; i++) {
        try {
            let file = fs.readFileSync(path.join(dataPath, dir[i]));
            let jokeJson = Buffer.from(file).toString();
            let joke = JSON.parse(jokeJson);
            joke.id = i;
    
            allJokes.push(joke);
        } catch (error) {
            console.error(`Ошибка при чтении файла ${dir[i]}: ${error.message}`);
        }
    }
    res.end(JSON.stringify(allJokes));
}