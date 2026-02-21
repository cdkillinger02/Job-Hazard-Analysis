import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JHAList() {
  const [jhas, setJhas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredValues, setFilteredValues] = useState([]);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const fetchJHAs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/getAllAnalysis");
        if (!res.ok) throw new Error("Failed to fetch JHAs");
        const data = await res.json();
        setJhas(data);
        setFilteredValues(data);
      } catch (err) {
        console.error("Error fetching JHAs:", err);
      }
    };
    fetchJHAs();
  }, []);

  useEffect(() => {
    setFilteredValues(
      jhas.filter((jha) => {
        let search = searchValue?.toLowerCase();
        return (
          jha.jobTitle?.toLowerCase().includes(search) ||
          jha.preparedBy?.toLowerCase().includes(search)
        );
      })
    );
  }, [searchValue, jhas])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Analysis?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/deleteAnalysis/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to delete JHA");
      setJhas((prev) => prev.filter((jha) => jha.id !== id));
    } catch (err) {
      console.error("Error deleting JHA:", err);
      alert("Failed to delete JHA");
    }
  };

  const totalPages = Math.ceil(jhas.length / rowsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="top-bar">
        <nav className="breadcrumbs">Home &gt;</nav>
        <div className="title">Acme Widgets Inc.</div>
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
                border: "1px solid #000000",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Create New JHA
            </button>
          </Link>
        </div>

        <div style={{ width: '25%', paddingBottom: '12px' }}>
          <input
            type="text"
            value={searchValue}
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className='form-input'
          />
        </div>

        <table className="rounded-table" cellPadding="10" border="1">
          <thead style={{ backgroundColor: "#d4d3d4" }}>
            <tr>
              <th>Job Title</th>
              <th>Prepared By</th>
              <th>Steps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#f4f4f4" }}>
            {filteredValues.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No Job Hazard Analysis found.
                </td>
              </tr>
            ) : (
              filteredValues.map((jha) => (
                <tr key={jha.id}>
                  <td>{jha.jobTitle}</td>
                  <td>{jha.preparedBy}</td>
                  <td>{jha.steps?.length || 0}</td>
                  <td>
                    <Link to={`/jha/${jha.id}/edit`}>
                      <button style={{ marginRight: "10px", border: "1px solid #000000", }}>Edit</button>
                    </Link>
                    <Link to={`/jha/${jha.id}/view`}>
                      <button style={{ marginRight: "10px", border: "1px solid #000000", }}>View</button>
                    </Link>
                    <button onClick={() => handleDelete(jha.id)} style={{ backgroundColor: "#eb8c8c", color: "#fff", border: "1px solid #000000", }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 0 && (
          <div style={{ display: "flex", justifyContent: "right", gap: "10px", marginTop: "20px" }}>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => goToPage(i + 1)} style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}