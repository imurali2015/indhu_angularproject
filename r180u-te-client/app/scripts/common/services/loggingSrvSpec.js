'use strict';

define(['scripts/common/services/loggingSrv'], function (targetSrv) {

    describe('Common Service: Logging Service: loggingSrv Test', function () {
        var msgHandler = {
                info: function (msg, callback, options) {
                },
                warning: function (msg, callback, options) {
                },
                success: function (msg, callback, options) {
                },
                error: function (msg, callback, options) {
                }
            },
            callback = {
                who: function () {
                    return true;
                }
            };

        beforeEach(function () {
            targetSrv.msgHandler = msgHandler;
            spyOn(targetSrv.msgHandler, 'info');
            spyOn(targetSrv.msgHandler, 'warning');
            spyOn(targetSrv.msgHandler, 'success');
            spyOn(targetSrv.msgHandler, 'error');
        });

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

        it('Test clear exist', function () {
            expect(targetSrv.clear).toBeDefined();
        });

        it('Test info exist', function () {
            expect(targetSrv.info).toBeDefined();
        });

        it('Test warning exist', function () {
            expect(targetSrv.warning).toBeDefined();
        });

        it('Test success exist', function () {
            expect(targetSrv.success).toBeDefined();
        });

        it('Test error exist', function () {
            expect(targetSrv.error).toBeDefined();
        });

        //info
        it('Test info message without arguments', function () {
            targetSrv.info('Hello');

            expect(targetSrv.msgHandler.info).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
        });

        it('Test info message with only callback', function () {
            targetSrv.info('Hello', callback.who);

            expect(targetSrv.msgHandler.info).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
        });

        it('Test info message with only options', function () {
            targetSrv.info('Hello', {myOption: 'Hello'});

            expect(targetSrv.msgHandler.info).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        it('Test info message with callback and options', function () {
            targetSrv.info('Hello', callback.who, {myOption: 'Hello'});

            expect(targetSrv.msgHandler.info).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        // warnings
        it('Test warning message without arguments', function () {
            targetSrv.warning('Hello');

            expect(targetSrv.msgHandler.warning).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
        });

        it('Test warning message with only callback', function () {
            targetSrv.warning('Hello', callback.who);

            expect(targetSrv.msgHandler.warning).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
        });

        it('Test warning message with only options', function () {
            targetSrv.warning('Hello', {myOption: 'Hello'});

            expect(targetSrv.msgHandler.warning).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        it('Test warning message with callback and options', function () {
            targetSrv.warning('Hello', callback.who, {myOption: 'Hello'});

            expect(targetSrv.msgHandler.warning).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        // success
        it('Test success message without arguments', function () {
            targetSrv.success('Hello');

            expect(targetSrv.msgHandler.success).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
        });

        it('Test success message with only callback', function () {
            targetSrv.success('Hello', callback.who);

            expect(targetSrv.msgHandler.success).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
        });

        it('Test success message with only options', function () {
            targetSrv.success('Hello', {myOption: 'Hello'});

            expect(targetSrv.msgHandler.success).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        it('Test success message with callback and options', function () {
            targetSrv.success('Hello', callback.who, {myOption: 'Hello'});

            expect(targetSrv.msgHandler.success).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        // error
        it('Test error message without arguments', function () {
            targetSrv.error('Hello');

            expect(targetSrv.msgHandler.error).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
        });

        it('Test error message with only callback', function () {
            targetSrv.error('Hello', callback.who);

            expect(targetSrv.msgHandler.error).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
        });

        it('Test error message with only options', function () {
            targetSrv.error('Hello', {myOption: 'Hello'});

            expect(targetSrv.msgHandler.error).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeUndefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });

        it('Test error message with callback and options', function () {
            targetSrv.error('Hello', callback.who, {myOption: 'Hello'});

            expect(targetSrv.msgHandler.error).toHaveBeenCalledWith('Hello');
            expect(targetSrv.msgHandler.options.onHidden).toBeDefined();
            expect(targetSrv.msgHandler.options.myOption).toBeDefined();
        });
    });
});
