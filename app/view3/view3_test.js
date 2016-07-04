'use strict';

describe('myApp.view3 module',function () {
    beforeEach(module('myApp.view3'));

    describe('view3 controller',function () {

        it('should ..',inject(function ($controller) {
           var view3Ctrl = $controller('view3Ctrl');
            expect(view3Ctrl).toBeDefined();
        }));
    });
});