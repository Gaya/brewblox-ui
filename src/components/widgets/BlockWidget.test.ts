import { SetPointSimpleBlock } from '@/store/blocks/SetPointSimple/SetPointSimple';

import BlockWidget from './BlockWidget';

describe('inputsFromSource', () => {
  it('Should find mapping on first level source', () => {
    class TestBlock extends BlockWidget {
      testProperty = 2;
      otherProperty = 4;
    }

    const blockWidget = new TestBlock();

    blockWidget.inputMapping = {
      test: { path: 'testProperty' },
      other: { path: 'otherProperty' },
    };

    const inputs = blockWidget.inputsFromSource();

    expect(inputs).toEqual({ test: 2, other: 4 });
  });

  it('Should should map multiple levels deep', () => {
    class TestNestedBlock extends BlockWidget {
      settings = {
        properties: {
          value: 4,
        },
        something: 'Test',
      };
    }

    const blockWidget = new TestNestedBlock();

    blockWidget.inputMapping = {
      value: { path: 'settings.properties.value' },
      something: { path: 'settings.something' },
    };

    const inputs = blockWidget.inputsFromSource();

    expect(inputs).toEqual({ value: 4, something: 'Test' });
  });

  it('Should fall back to defaults', () => {
    const blockWidget = new BlockWidget();

    blockWidget.inputMapping = {
      value: {
        path: 'value',
        default: 1,
      },
      something: {
        path: 'something',
        default: 2,
      },
    };

    const inputs = blockWidget.inputsFromSource();

    expect(inputs).toEqual({ value: 1, something: 2 });
  });
});

describe('changed', () => {
  it('Should be flagged as changed when source and inputs do not match', () => {
    class TestBlock extends BlockWidget {
      testProperty = 2;
      otherProperty = 4;
    }

    const blockWidget = new TestBlock();

    blockWidget.inputMapping = {
      test: { path: 'testProperty' },
      other: { path: 'otherProperty' },
    };

    // update internal inputs values
    blockWidget.onBlockUpdate();

    // set input to different value
    blockWidget.inputs.test = 'change';

    expect(blockWidget.changed).toBe(true);
  });
});
