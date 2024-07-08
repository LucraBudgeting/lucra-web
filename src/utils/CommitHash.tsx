export const CommitHash = () => (
  <code style={stickyBottomStyle}>Build:{import.meta.env.VITE_COMMIT_HASH?.slice(0, 7)}</code>
);

const stickyBottomStyle: React.CSSProperties = {
  position: 'fixed', // Positioning context fixed relative to the viewport
  bottom: '10px', // Align to the bottom of the viewport
  left: '10px', // Align to the left of the viewport
  zIndex: 1000, // Ensures it stays on top of other content
  backgroundColor: 'transparent', // Background color
  textAlign: 'center', // Center the text inside the element
  fontSize: '8px',
};
