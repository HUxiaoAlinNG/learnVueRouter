export default {
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String
    }
  },
  render(h, context) {
    const tag = context.props.tag || "a";
    const handler = () => {
      context.parent.$router.push(context.props.to);
    }
    return h(
      tag,
      {
        on: {
          click: handler,
        }
      },
      context.slots().default
    )
  }
}
