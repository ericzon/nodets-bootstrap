import { ToolsController } from '../src/controllers/tools.server.controller';
import * as chai from 'chai';
import * as sinon from 'sinon';

const assert = chai.assert;

describe('Tools', () => {
    describe('#normalizePort()', () => {
        it('should normalize a given port', () => {
            assert(ToolsController.normalizePort('8899') == 8899,'Port should be normalized ok');
        });
    });
});
