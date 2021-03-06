import { get } from 'lodash';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import { blockById } from '@/store/blocks/getters';
import { Block } from '@/store/blocks/state';

import Widget from './Widget';

@Component
class BlockWidget extends Widget {
  /**
   * Use inputMapping to bind sources of values to the inputs used in the component.
   *
   * Object looks like:
   * {
   *    keyInput: {
   *      path: 'propertyName.propertyName.propertyName',
   *      default: 'anything'
   *    }
   * }
   *
   * The purpose is to have a single source of truth, while not updating the source when updating
   * the contents of the inputs.
   *
   * When the source is adjusted, the input value will be updated accordingly.
   *
   * 'path' in keyInput is used as 'path' is used in https://lodash.com/docs/4.17.5#get
   */
  inputMapping: {
    [inputPropName: string]: {
      path: string,   // path to value in object
      default?: any,   // default value
    },
  } = {};

  inputs: { [inputPropName: string]: any } = {};

  /**
   * Maps all the values found in the source to their respective input properties
   * @returns {{[key: string]: any}}
   */
  inputsFromSource(): { [key: string]: any } {
    return Object.keys(this.inputMapping)
      .reduce(
        (total, key) => {
          return {
            [key]: get(this, this.inputMapping[key].path) || this.inputMapping[key].default,
            ...total,
          };
        },
        {},
      );
  }

  /**
   * Checks for changes in the inputs compared to the source
   * @returns {boolean}
   */
  get changed() {
    const state = this.inputsFromSource();

    return Object.keys(state).some(key => state[key] !== this.inputs[key]);
  }

  /**
   * Block data from the store
   * @returns {Block}
   */
  get block(): Block {
    return blockById(this.$store, this.options.block);
  }

  /**
   * Updates the inputs when the source changes
   */
  @Watch('block', { immediate: true, deep: true })
  onBlockUpdate() {
    this.inputs = this.inputsFromSource();
  }
}

export default BlockWidget;
