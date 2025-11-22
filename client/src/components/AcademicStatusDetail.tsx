import React from "react";

interface AcademicStatusDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  status: {
    color: string;
    label: string;
    reasons: string[];
  } | null;
}

const AcademicStatusDetailModal: React.FC<AcademicStatusDetailModalProps> = ({
  isOpen,
  onClose,
  studentName,
  status
}) => {
  if (!isOpen || !status) return null;

  const colorMap: any = {
    green: "#16a34a",
    orange: "#d97706",
    red: "#dc2626"
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Situação Acadêmica de <br /> <strong>{studentName}</strong>
        </h2>

        <div
          style={{
            backgroundColor: colorMap[status.color],
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 600
          }}
        >
          {status.label}
        </div>

        <ul style={{ lineHeight: "1.6", marginBottom: "1.5rem" }}>
          {status.reasons.map((reason, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              • {reason}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "6px",
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: 600,
            border: "none",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default AcademicStatusDetailModal;
