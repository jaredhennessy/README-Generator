//jshint esversion:6
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      name: "user",
      message:
        "What is the GitHub username of the project owner to be documented?",
    },
    {
      type: "input",
      name: "repo",
      message:
        "What is the name of the GitHub repository to be documented (not the full URL)?",
    },
    {
      type: "input",
      name: "title",
      message:
        "What is the project title (leave blank to use GitHub project title)?",
    },
    {
      type: "input",
      name: "desc",
      message:
        "Please describe the project (leave blank to use GitHub project desc):",
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
    // {
    //   type: "input",
    //   name: "demo",
    //   message: "Include a link to a giphy or other demo: ",
    // },
    {
      type: "input",
      name: "tests",
      message: "What are the steps to test this project?",
    },
    {
      type: "input",
      name: "contact",
      message: "Include an email address for questions:",
    },
  ])
  .then(function (data) {
    const gitLogin = "jaredhennessy";
    const gitToken = "4c6680567ed3bd9c03dcbb18dc8286ad2684b591";

    const projectUser = data.user;
    const projectRepo = data.repo;
    let projectTitle;
    let projectUrl;
    let projectLang;
    let projectLangBadge;
    let projectDesc;
    const projectInst = data.install;
    const projectUse = data.usage;
    const projectLic = data.license;
    const projectLicBadge =
      "https://img.shields.io/static/v1?label=license&message=" +
      data.license +
      "&color=brightgreen";
    const projectCont = data.contributors;
    const projectTests = data.tests;
    const projectContact = data.contact;

    // console.log(data);

    axios
      .get(`https://api.github.com/repos/${projectUser}/${projectRepo}`, {
        params: {
          user: gitLogin,
          token: gitToken,
        },
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        if (data.title === "") {
          projectTitle = res.data.name;
        } else {
          projectTitle = data.title;
        }

        if (data.desc === "") {
          projectDesc = res.data.description;
        } else {
          projectDesc = data.desc;
        }
        projectUrl = res.data.html_url;
        projectLang = res.data.language;
        projectLangBadge =
          "https://img.shields.io/static/v1?label=made%20with&message=" +
          projectLang +
          "&color=informational";

        const filename = projectTitle.toLowerCase().split(" ").join("") + ".md";
        let fileText = `# [${projectTitle}](${projectUrl})\n`;

        if (projectLang !== "") {
          fileText += `![${projectLang}](${projectLangBadge}) `;
        }
        if (projectLang !== "") {
          fileText += ` ![${projectLang}](${projectLangBadge})\n`;
        }

        fileText +=
          `\n## Description\n` +
          `${projectDesc}\n` +
          `## Table of Contents\n` +
          `- [Installation](#installation)\n` +
          `- [Usage](#usage)\n` +
          `- [License](#license)\n` +
          `- [Contributing](#contributing)\n` +
          `- [Tests](#tests)\n` +
          `- [Questions](#questions)\n` +
          `## Installation\n` +
          `To install necessary dependencies, run the following command:\n` +
          "```\n" +
          `${projectInst}\n` +
          "```\n" +
          `## Usage\n` +
          `${projectUse}\n` +
          `## License\n` +
          `This project is licensed under the ${projectLic} license.\n` +
          `## Contributing\n` +
          `${projectCont}​\n`;

        if (projectTests !== "") {
          fileText +=
            `## Tests\n` +
            `To run tests, run the following command:\n` +
            "```\n" +
            `${projectTests}\n` +
            "```\n";
        }

        fileText +=
          `## Questions\n` +
          `If you have any questions about the repo, open an issue or contact ${projectUser} directly at [${projectContact}](${projectContact}).`;

        fs.writeFile(filename, fileText, function (err) {
          if (err) {
            return console.log(err);
          }

          console.log(`Thank you! See ${filename} for output.`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
