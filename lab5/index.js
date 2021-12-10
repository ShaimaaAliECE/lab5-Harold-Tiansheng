const e = require("express");
const express = require("express");
const jobList = require("./jobs.json");

const app = express();

app.use(express.static("static"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

//question 1
app.get(`/jobCategory`, (req, res) => {
    let list = {};
    let content = "";
    for (let j in jobList) {
        for (let c of jobList[j].categories) {
            if (!list[c]) {
                list[c] = 1;
            } else list[c]++;
        }
    }
    content += `<h1>All the categories and how many times it is been mentioned</h1>`;
    //ßconsole.log(list);
    for (let l in list) {
        content += `<div>${l} :  ${list[l]}</div>`;
    }
    res.send(content);
});

//question 2

app.get(`/findJob/:category`, (req, res) => {
    let cate = req.params.category;
    cate = cate.toLowerCase();
    let num = 1;
    let content = ``;
    content += `<h1>'${cate}' search result: </h1>`;
    for (let j in jobList) {
        for (let c of jobList[j].categories) {
            if (c.includes(cate) || cate.includes(c)) {
                content += `<div>${num}. ${jobList[j].title}</div>`;
                num++;
            }
        }
    }
    if (num == 1) {
        content += `</br><div>Sorry, there is no result about '${cate}'</div>`;
    }
    content += `</br><div>${num - 1} result in total</div>`;
    res.send(content);
});

//question 3

app.get(`/findJobFromCity`, (req, res) => {
    let city = req.query.city;
    let num = 1;
    let content = ``;
    content += `<h1>'${city}' city search result: </h1>`;
    city = city.toLowerCase();
    for (let j in jobList) {
        let title = jobList[j].title;
        //console.log(title);
        title = title.toLowerCase();
        let findCity = title.split("(");
        c = findCity[1];
        if (c.includes(city)) {
            content += `<div>${num}. ${jobList[j].title}</div>`;
            num++;
        }
    }

    if (num == 1) {
        content += `</br><div>Sorry, there is no result about '${city}'</div>`;
    }
    content += `</br><div>${num - 1} result in total</div>`;
    res.send(content);
});

app.listen(80);
