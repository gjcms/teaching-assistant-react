import React, { useEffect, useState } from 'react';

interface AcademicStatusResult {
  color: 'green' | 'orange' | 'red';
  label: string;
  reasons: string[];
}

interface AcademicStatusBadgeProps {
  studentCPF: string;
  classId: string | null;
  onClick?: (status: AcademicStatusResult) => void;
}

const AcademicStatusBadge: React.FC<AcademicStatusBadgeProps> = ({
  studentCPF,
  classId,
  onClick
}) => {

  const [status, setStatus] = useState<AcademicStatusResult | null>(null);

  useEffect(() => {
    if (!classId) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/academic-status/${classId}/${studentCPF}`
        );

        if (!response.ok) throw new Error("");

        const data = await response.json();
        setStatus(data);
      } catch {
        // fallback inicial
        setStatus({
          color: "green",
          label: "Situação OK",
          reasons: ["Status inicial mockado"]
        });
      }
    };

    fetchStatus();
  }, [classId, studentCPF]);

  if (!classId) return null;
  if (!status) return <span>...</span>;

  const colorMap: any = {
    green: { bg: "#dcfce7", text: "#166534", border: "#22c55e" },
    orange: { bg: "#fef3c7", text: "#b45309", border: "#f59e0b" },
    red: { bg: "#fee2e2", text: "#b91c1c", border: "#ef4444" }
  };

  const colors = colorMap[status.color];

  return (
    <div
      title="Clique para ver detalhes"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        padding: "4px 10px",
        borderRadius: "20px",
        border: `2px solid ${colors.border}`,
        fontWeight: 600,
        fontSize: "0.8rem",
        cursor: "pointer",
        transition: "0.2s",
        display: "inline-block"
      }}
      onClick={() => onClick && onClick(status)}
    >
      {status.label}
    </div>
  );
};

export default AcademicStatusBadge;
