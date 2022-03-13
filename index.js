const inquirer = require('inquirer');
const fs = require('fs');
const license = [
    ['Apache License 2.0','[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'],
    ['Boost Software License 1.0','[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'], 
    ['GNU AGPLv3','[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'],
    ['GNU GPLVv3','[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'],
    ['GNU LGPLv3','[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'],  
    ['ISC','[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'],
    ['Mozilla Public License 2.0','[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'],
    ['MIT License','[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'],
    ['The Unlicense','[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)']
  ];
inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter project title',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Enter the description of your project and user story',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Add any installation instructions or depedencies',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Add in the deployed link',
            name: 'projectUse',
        },
        {
            type: 'list',
            message: 'What license does the project use?',
            choices: [
                'Apache License 2.0',
                'Boost Software License 1.0',
                'GNU AGPLv3',
                'GNU GPLVv3',
                'GNU LGPLv3',
                'ISC',
                'Mozilla Public License 2.0',
                'MIT License',
                'The Unlicense'
            ],
            name: 'license',
        },
        {
            type: 'input',
            message: 'What tests will be used?',
            name: 'test',
        },
        {
            type: 'input',
            message: 'Add in any contributors?',
            name: 'contributors',
        },
        {
            type: 'input',
            message: 'Enter GitHub username',
            name: 'gitHub',
        },
        {
            type: 'input',
            message: 'Enter email address',
            name: 'contact',
        },
    ])
    .then(answers => {
        gitLicense(answers);
    });

function gitLicense(answers) {
    for (const n in license){
        if (answers.license === license[n][0]){
            icon = license[n][1];
            link = icon.split('(')[2].slice(0,-1);
        }
    }
    answers.icon = icon;
    answers.link = link;
    makeReadMe(answers);
    console.log(answers);
}

function makeReadMe(answers) {
    fs.writeFile('README.md',
    `# ${answers.name}
    ${answers.icon}
    
    ## Description / User Story
    ${answers.description}
    
    ## Table of Contents
    - [Dependencies](#Dependencies)
    - [Deployed Link/App in Use](#Deployed Link/App in Use)
    - [License](#License)
    - [Contributors](#Contributors)
    - [Tests](#Tests)
    - [Questions](#Questions)
    
    ## Depedencies
    ${answers.installation}
          
    ## Deployed Link/App in Use
    ${answers.projectUse}
          
    ## License
    ${answers.icon}  
    ${answers.license} - Click [here](${answers.link}) for more information.
          
    ## Contributors
    ${answers.contributors}
    
    ## Tests
    ${answers.test}
    
    ## Questions
    Check out more of my work at: [${answers.gitHub}](https://www.github.com/${answers.gitHub})  
    Questions/Comments? [Contact Me](mailto:${answers.contact})`,
        err => err ? console.error(err) : console.log('Success'));
}