import { createSpyObj } from '../helpers';

export const renderer2Mock = createSpyObj('renderer2Mock', [
  'destroy',
  'createElement',
  'createComment',
  'createText',
  'destroyNode',
  'appendChild',
  'insertBefore',
  'removeChild',
  'selectRootElement',
  'parentNode',
  'nextSibling',
  'setAttribute',
  'removeAttribute',
  'addClass',
  'removeClass',
  'setStyle',
  'removeStyle',
  'setProperty',
  'setValue',
  'listen',
]);

export const rootRendererMock = {
  renderComponent: () => {
    return renderer2Mock;
  },
};

export const rendererFactory2Mock = {
  createRenderer(a: any, b: any) {
    return renderer2Mock;
  },
};
