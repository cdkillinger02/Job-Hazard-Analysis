import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JHAList() {
  const [jhas, setJhas] = useState([]);

  // Fetch all JHAs on component mount
  useEffect(() => {
    const fetchJHAs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/getAllAnalysis");
        if (!res.ok) {
          throw new Error("Failed to fetch JHAs");
        }
        const data = await res.json();
        setJhas(data);
      } catch (err) {
        console.error("Error fetching JHAs:", err);
      }
    };

    fetchJHAs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Analysis?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/deleteAnalysis/${id}`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to delete JHA");
      }
      setJhas((prev) => prev.filter((jha) => jha.id !== id));
    } catch (err) {
      console.error("Error deleting JHA:", err);
      alert("Failed to delete JHA");
    }
  };

  return (
    <>
      <div>
        <nav className="breadcrumbs">
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Home &gt;
          </span>
        </nav>
      </div >
      <div>
        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h1>Job Hazard Analysis</h1>
        </div>

        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ margin: "20px" }}>
            <Link to="/jha/new">
              <button
                style={{
                  backgroundColor: "#7eb8fa",
                  color: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Create New JHA
              </button>
            </Link>
          </div>

          <table
            border="1"
            cellPadding="10"
            width="100%"
            style={{
              borderCollapse: "collapse",
              textAlign: "center",
              borderRadius: "4px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <thead style={{ backgroundColor: "#d4d3d4" }}>
              <tr>
                <th>Job Title</th>
                <th>Prepared By</th>
                <th>Steps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jhas.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No JHAs found.
                  </td>
                </tr>
              ) : (
                jhas.map((jha) => (
                  <tr key={jha.id}>
                    <td>{jha.jobTitle}</td>
                    <td>{jha.preparedBy}</td>
                    <td>{jha.steps?.length || 0}</td>
                    <td>
                      <Link to={`/jha/${jha.id}/edit`}>
                        <button style={{ marginRight: "10px" }}>Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(jha.id)}
                        style={{ backgroundColor: "#eb8c8c", color: "#fff" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
}
