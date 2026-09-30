const noComments = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: { forbidden: "Comments are not allowed; express intent through naming and tests." },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          context.report({ loc: comment.loc, messageId: "forbidden" });
        }
      },
    };
  },
};

export default noComments;
