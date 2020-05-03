//jshint esversion:6
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the project title?",
    },
    {
      type: "input",
      name: "user",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "repo",
      message: "What is the name of the GitHub repository?",
    },
    {
      type: "input",
      name: "description",
      message: "Please describe the project: ",
    },
    {
      type: "input",
      name: "install",
      message: "What are the steps to install the project?",
    },
    {
      type: "input",
      name: "usage",
      message: "What is the intended use of this project?",
    },
    {
      type: "input",
      name: "license",
      message: "What licenses apply to this project?",
    },
    {
      type: "input",
      name: "contributors",
      message: "Who contributed to this project?",
    },
  ])
  .then(function (data) {
    const filename = data.title.toLowerCase().split(" ").join("") + ".json";
    const user = data.user;
    const repo = data.repo;
    const token = "4c6680567ed3bd9c03dcbb18dc8286ad2684b591";

    console.log(data);

    axios({
      method: "get",
      url: `https://api.github.com/repos/${user}/${repo}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      //   auth: {
      //     username: user,
      //     password: pass,
      //   },
    })
      .then((res) => {
        callback(null, console.log(JSON.stringify(res.data)));

        // fs.writeFile(filename, JSON.stringify(data, null, "\n\n"), function (err) {
        //   if (err) {
        //     return console.log(err);
        //   }

        console.log(`Thank you! See ${filename} for output.`);
      })
      .catch((err) => {
        callback(err);
      });

    // });
  });

//   * Questions
//     * User GitHub profile picture
//     * User GitHub email
