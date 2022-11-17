import { TableLayout } from './layout/table-layout.js';
import { LogLayout } from './layout/log-layout.js';
import { QuatCoreLayout } from './layout/quat-core-layout.js';
import { RockCoreLayout } from './layout/rock-core-layout.js';


const defaultLayout = TableLayout;
const availableLayouts = [
  defaultLayout,
  LogLayout,
  QuatCoreLayout,
  RockCoreLayout
];

export const layoutResolver = {
  getLayout: function getLayout(layoutName) {
    let layout = availableLayouts.find((el) => {
      return el.layoutName === layoutName;
    });
    if (!layout) {
      layout = defaultLayout;
    }
    return layout.include;
  }
}