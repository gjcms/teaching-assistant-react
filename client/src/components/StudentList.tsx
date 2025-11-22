import React, { useState } from 'react';
import { Student } from '../types/Student';
import { studentService } from '../services/StudentService';
import AcademicStatusBadge from './AcademicStatusBadge';
import AcademicStatusDetailModal from './AcademicStatusDetail';

interface StudentListProps {
  students: Student[];
  onStudentDeleted: () => void;
  onEditStudent: (student: Student) => void;
  onError: (errorMessage: string) => void;
  loading: boolean;
  selectedClass?: { id: string } | null;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onStudentDeleted,
  onEditStudent,
  onError,
  loading,
  selectedClass
}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStudentName, setModalStudentName] = useState("");
  const [modalStatus, setModalStatus] = useState<any>(null);

  const handleOpenDetail = (student: Student, status: any) => {
    setModalStudentName(student.name);
    setModalStatus(status);
    setModalOpen(true);
  };

  const handleDelete = async (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await studentService.deleteStudent(student.cpf);
        onStudentDeleted();
      } catch (error) {
        onError((error as Error).message);
      }
    }
  };

  if (loading) {
    return (
      <div className="students-list">
        <h2>Students</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="students-list">
      <h2>Students ({students.length})</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Academic Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.cpf}>
                <td>{student.name}</td>
                <td>{student.cpf}</td>
                <td>{student.email}</td>

                <td>
                  <AcademicStatusBadge
                    studentCPF={student.cpf}
                    classId={selectedClass ? selectedClass.id : null}
                    onClick={(status) => handleOpenDetail(student, status)}
                  />
                </td>

                <td>
                  <button className="edit-btn" onClick={() => onEditStudent(student)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(student)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <AcademicStatusDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        studentName={modalStudentName}
        status={modalStatus}
      />
    </div>
  );
};

export default StudentList;
