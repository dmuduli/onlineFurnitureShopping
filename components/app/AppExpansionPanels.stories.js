import AppExpansionPanel from "../AppExpansionPanel";
import AppExpansionPanels from "./AppExpansionPanels";

export default {
  title: "components/AppExpansionPanels",
  argTypes: {
    multiple: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description:
        "if false only one item opens at a time, otherwise multiple can",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { AppExpansionPanels, AppExpansionPanel },
  props: Object.keys(argTypes),
  template: `<AppExpansionPanels :multiple="multiple" :items="[1,2,3,4]">
                <template #item="{itemIndex, open, ...itemProps}">
                  <AppExpansionPanel :item-index="itemIndex" :open="open">{{itemProps}}</AppExpansionPanel>
                </template>
            </AppExpansionPanels>`,
});

export const Basic = Template.bind({});
Basic.args = {};

export const Multiple = Template.bind({});
Multiple.args = { multiple: true };
