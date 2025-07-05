// app/not-found.tsx
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem" }}>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
