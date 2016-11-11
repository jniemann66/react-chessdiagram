### Explanation of files and folder structure:

Folders:

Folder | Description | Comments
---------|----------|---------
 **__tests__** | contains test scrips | test.js files placed in here will be run upon invoking **npm test** 
 **.vscode** | vscode config | configuration settings for vscode editor
 **build** | compilation output | dev: **dev.chessdiagram.js** prod: **dist.chessdiagram.js**
 **demo** | source code for demo | run on invoking **npm run dev**
 **node_modules** | node modules | modules installed through **npm install**
 **src** | source code | source code for component

Files:

File | Description | Comments
---------|----------|---------
 .editorconfig | GitHub editor settings | controls how code is displayed in GitHub editor windows
 .eslintrc.js | ES Lint configutaion |
 .gitignore | git ignore list | describes files that are not tracked in git / GitHub
 api.md | Chessdiagram API reference | describes the API interface for the component
 generate-docs.js | doc generation script | auto-generates api.md from source code
 generateMarkdown.js | JSON-Markdown converter |
 LICENSE | license file |
 package.json | npm package config | npm configuration for project
 README.md | main README | This file
 screenshot.PNG | screenshot | screenshot of demo, showing the component
 webpack.config.js | webpack dist config | configures webpack for the output of **build/dist.chessdiagram.js**
 webpack.dev.config.js | webpack dev config | configures webpack for the output of **build/dev.chessdiagram.js**