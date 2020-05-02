//jhsint esversion:6
var inquirer = require("inquirer");
var fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the project title?",
    },
    {
      type: "input",
      name: "url",
      message: "What is the URL for the GitHub repository?",
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
    var filename = data.title.toLowerCase().split(" ").join("") + ".json";

    fs.writeFile(filename, JSON.stringify(data, null, "\n\n"), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Success!");
    });
  });

//   * Questions
//     * User GitHub profile picture
//     * User GitHub email
