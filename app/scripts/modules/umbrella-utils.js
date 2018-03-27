import { u } from '../libs/umbrella.min.js';
export default {
  setValue: ($elem, val) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    $elem.nodes[0].value = val;
  },
  setSelectedValue: ($elem, val) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    $elem.children('option').each((elem) => {
      if (elem.value == val) {
        u(elem).attr('selected', true);
      }
    });
  },
  getValue: ($elem) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    return $elem.nodes[0].value;
  },
  show: ($elem, display = 'block') => {
    u($elem).attr({ style: 'display:' + display + ';' });
  },
  hide: ($elem) => {
    u($elem).attr({ style: 'display: none;' });
  }
};
