/**
 * Default route handler.
 *
 * @since 1.0.0
 */
export default eventHandler(() => {
  return { message: "🚀 It works! " + new Date().toLocaleDateString() };
});
