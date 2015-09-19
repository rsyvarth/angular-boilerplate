'use strict';

var app = angular.module('boilerplate', [
    'events',

    'example',
    // 'example.exampleModel',
    // 'example.exampleService',

    'ui.router',
    'pascalprecht.translate'
]);


app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});