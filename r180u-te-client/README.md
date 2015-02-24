samee-tlsp
=============

This repository contains the front-end code for Scholastic Central 2.0 (SCENT 2.0).  The project uses a standard front-end technology stack that includes:

* [AngularJS](https://angularjs.org)
* [Bower](http://bower.io/)
* [gulp](http://gulpjs.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Jasmine](http://jasmine.github.io/)
* [Karma](http://karma-runner.github.io/)
* [API Blueprint](http://apiblueprint.org/)

[This confluence page](https://confluence.education.scholastic.com/display/SC2ARCH/Tech+Stacks) has more discussion of these components.


setup
=====

The list of technologies is long, but getting it all set up is actually fairly painless.  The grunt build system depends on [Node.js](http://nodejs.org), so the first step is to install that.  

For MacOS X environments, my favorite method is to install using [Homebrew](http://brew.sh/):

    brew install node

This will install both NodeJs and [NPM](http://npmjs.org), the Node Package Manager.

If you're not using Homebrew: there's a Mac installer .dmg (that I haven't tried); if you're on Windows, there's an installer for that as well, and Linux people can use their favorite package manager.  This and more can be found [here](http://nodejs.org/download/).

Also: the [SASS](http://sass-lang.com/)/[Compass](http://compass-style.org/) compiler requires ruby to be installed on your system, which if you're on a Mac is already done for you.  On Windows, the best way to do that is to use [RubyInstaller](http://rubyinstaller.org/).

Then:

    npm -g install grunt-cli bower karma    
                            # install grunt, bower, karma
    git clone https://github.com/ScholasticInc/samee-r180u-te.git
                            # clone this project
    cd r180-te-client       # move to the root directory. A must for the follow on commands
    npm install             # install the node modules for this project
    bower install           # install the bower components for this project
    gulp serve-dev          # start it all up

At this point, you should be up and running.  

We are using gulp instead of grunt. They both do the same thing but gulp uses a pipe technique while grunt uses configuration files. Gulp is easier to debug. Presently we
have the following tasks/sub tasks defined

Main Tasks
------------------------------
    clean
    default
    fonts
    help
    images
    inject
    optimize
    plato
    requireconfig
    styles
    vendor
    vendor1
    vendor2
    vet
    wiredep

Sub Tasks
------------------------------
    clean-build
    clean-code
    clean-fonts
    clean-images
    clean-styles
    clean-vendor
    less-watcher
    serve-dev
    serve-prod


conventions and guidelines
==========================

The code presented in this repository is intended to represent the recommended way to write code for the Teacher Experience. The project outline follows
most of the angular generators out there at the time this is written.

architecture overview
=====================

In general terms, what we have implemented here so far is a fairly standard AngularJS app.  There are a few things to highlight:

### files organized by feature

We sort the various files that comprise our application by feature rather than by file type; this is the current recommended practice [as described here](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1) by the Angular core team.

The primary reason for moving to this style is to encourage thinking of the application in terms of separate and possibly separable components, with a recursive hierarchical ('fractal') structure that leads to better modularization.  

### angular ui-router

This file organization meshes well with the use of the [Angular ui-router library](https://github.com/angular-ui/ui-router), which is a drop-in replacement for the standard AngularJS router.  ui-router's primary contribution is the ability to express navigation through the application as movement through states in a state machine.  It also facilitates spliting up monolithic routing configuration into modules, so that each component/feature can manage its own internal routing.
Along with this we have added demand loading using an enhanced version of ui-router-extra. We enhanced it to facilitate nested routes and nested views.

### `app` vs `common`

We differentiate between source files that implement program states and source files that implement common services or visual components that may be reusable across program states.  The former reside in subdirectories underneath the `app` directory, where each subdirectory corresponds to a routable page or screen; the latter fall in the `common` directory, and consist of shared Angular services and directives.

### services for REST requests

In particular, there is an Angular service in the `common` directory that is responsible for communicating with each REST service used by the application.  We use the [ng-resource](https://docs.angularjs.org/api/ngResource) library to make the REST requests themselves.

### web components

We go to all this trouble in order to encourage conceiving of application features as individual components that are assembled together within the overall framework of the Scent application.  We should note, however, that we want to modularize the application along two dimensions; program states represent the temporal sequencing of the application, while visual components ('widgets') divide up the areas of the screen.  

We have two technologies that can address this second category of visual components: [custom Angular directives](https://docs.angularjs.org/guide/directive) and [the Polymer framework](https://www.polymer-project.org/).  Polymer can be seen as Angular directives taken to their logical conclusion: the two projects share the same [benefactor](https://www.google.com) and many of the same ideas, but Polymer as the newer initiative targets W3C standards (the [Web Components](http://webcomponents.org/) suite) that are not yet(?) supported by all browsers.  

Probably the most useful of these new standards is [shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/), which allows components to render themselves in a separate encapsulated DOM subtree.  This introduces a properly scoped context for component code and styling, so that it's possible to develop components without having to worry about them having unwanted external side effects.

The Read 180 team is planning to use Polymer as their component framework.  While we currently do not include any Polymer components, we have verified in an earlier proof-of-concept implementation that it is possible to integrate Polymer components within an Angular application, where an Angular resource or model object is injected into a Polymer component -- so, in effect, the Polymer component is acting as a view in an Angular MVC architecture.  Components that adopt this basic interaction protocol should be easy to reuse across projects.  Components should also follow the guidelines from [this design document](https://drive.google.com/folderview?id=0B7Ovm8bUYiUDR29iSkEyMk5pVUk&usp=sharing#list) published by the Angular 2.0 core  team; these guidelines describe how a "well-behaved" web component should act from an Angular perspective.

### unit testing and Jasmine/Karma

The unit testing framework that we have adopted is [Jasmine](http://jasmine.github.io/), which uses an rspec-style "literate" behavior-driven syntax that expresses clearly what exactly each test is intended to test.  The [Karma](http://karma-runner.github.io/) test runner makes it convenient to write your tests first -- since it is continuously running in the background, you can quickly sketch out your ideas regarding how your code should be structured by writing tests, and Karma will let you know when your tests pass.

The tests we have implemented are unit tests; each module has associated with it a corresponding test, and the tests are scoped to exercise the functionality of that module only.  There is a separate initiative to provide integration-level automated testing using Cucumber, so we have left that alone for now.
