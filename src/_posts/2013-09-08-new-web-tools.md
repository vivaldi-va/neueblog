---
layout : post
title :  Automate your workflow. Yeoman, NPM and Bower for easy front-end development
categories : [blog]
---


Modern web development has moved on from notepad and simple HTML, it now encompasses a whole wealth of technologies built upon each other to deliver better, neater and faster end-results. Package and dependency management and task automation are the big players that can assist with anything from a small web page to a full blown web-app. I shall describe 4 of my favorite such tools which can provide the groundwork for setting up any kind of web project, with Yeoman setting up a bootstrap project, installing required tools with NPM and code libraries with Bower, then compiling your production version with Grunt.js. It’s really too easy.

<!--more-->

##NPM
NPM, or Node Package Manager, is the package manager offered by Node.js. Simply put, it is a great repository for all manner of development tools and utilities. Minification, concatenation, image optimisation, testing and also all the other tools I will mention herein, are installed using NPM. Node packages can be installed in two ways using NPM, either by installing as a local resource, or as a global program.

The former deposits the relevant scripts in your project folder and creates a JSON configuration file in the root directory, you can find it as ‘package.json’. This file is simply a JSON array containing the package names delegated as dependencies, as well as other configuration information that may be of importance. This method works for adding project-specific tool dependencies, as it will automatically download all the required files and store them locally when you run ‘NPM install’ through your command line in your project root directory. When sharing a project or committing it to a version control system, this file is all you need.

The latter enables you to install scripts globally, and gives them a command that can be run in your CLI. these are installed with the ‘-g’ option.

##Yeoman leads the way
Yeoman—installed using NPM as the global package ‘yo’—is a tool to automate the creation of a project and it’s associated dependencies. Specifically, it will generate all the required files for a particular development environment, be it a simple website—perhaps using HTML5 Boilerplate for instance—or AngularJS, Backbone or whatever else. There are an abundance of generators available, for every web framework or set-up I have ever heard of, and a lot I haven’t, so you will unlikely be starved of choice. If you’re interested in browsing such generators, run a search with ‘npm search generator-’ in your command line.

Simply put, Yeoman will add the bootstrap files to the current directory and use package managers to download dependencies. It is wonderful for setting up the prep work, which is usually a tedious effort of creating directory structures and downloading various libraries or setting up configuration files. But, thankfully, with this you largely avoid this tedium. It will set you up with your required files, configuration files for NPM, Bower as well as Grunt.js, which is nice, allowing you to dive right into the important stuff with no hassle.

##Bower for libraries.
Bower is a package manager installed through NPM, though unlike NPM itself, it simply works by downloading a directory from a git repository and saving it in your project folder. It does, however, function similarly to NPM as it creates a JSON file, which is shared along with the rest of your project files, and can be used to download library dependencies all at once. It is an essential tool for keeping your libraries organized and up to date, I think, and is one of the tools that has most helped me in recent times.

##Grunt is the master builder
Grunt.js, again installed through NPM, is a task runner which, unsurprisingly, works by running a list of tasks consecutively. It’s use comes into full fruition when preparing a project for production, as it can automate all the testing, optimization and cache-busting for you with no hassle. Any NPM-installable tool can be utilized in Grunt, all that needs doing is to configure it right, and tune your process to be in the right sequence. Aside from installing grunt locally, you can install it’s command line access via NPM using the global package ‘grunt-cli’.


