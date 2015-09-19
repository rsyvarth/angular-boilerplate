'use strict';

var ExampleDirective = BaseDirective.extend({

    init: function($scope, Events){
        this._super($scope, Events);
        console.log('Starting');
    },

    addListeners: function(){
        this._super();
    },

    setupScope: function(){
        this.$scope.text = "Hello world";
    },

    destroy: function() {
        this._super();
    }

});

angular.module('example',[])
    .directive('example', function(Events){
    return {
        restrict:'E',
        isolate:true,
        link: function($scope){
            new ExampleDirective($scope, Events);
        },
        scope:true,
        templateUrl: "partials/example/example.html"
    };
});
