const PMATCHMAKER_URL =
  "https://script.google.com/a/macros/paloaltonetworks.com/s/AKfycbzcauSxYsiQ6BVB38IFQPBHECxhNkV5FmBYb2v3GZbWCTV-XGHV8NK-ZzJhJDhPgR-Z/exec";

export default function PMatchmakerPanel() {
  return (
    <iframe
      src={PMATCHMAKER_URL}
      title="pMatchmaker"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      allow="same-origin"
    />
  );
}
