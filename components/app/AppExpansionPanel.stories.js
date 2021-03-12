import AppExpansionPanel from "./AppExpansionPanel";

export default {
  title: "components/AppExpansionPanel",
  argTypes: {
    open: {
      type: "boolean",
      control: { type: "boolean" },
      table: { category: "props", defaultValue: false },
      defaultValue: false,
      description: "if false item will be closed, otherwise opened",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { AppExpansionPanel },
  props: Object.keys(argTypes),
  template: `<AppExpansionPanel :item-index="1" :open="open">
                <template #title>title here</template>
                <template #default>this goes inside default</template>
            </AppExpansionPanel>`,
});

export const Basic = Template.bind({});
Basic.args = {};

export const Opened = Template.bind({});
Opened.args = { open: true };
