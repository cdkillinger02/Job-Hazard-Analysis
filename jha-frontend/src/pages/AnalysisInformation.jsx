export default function AnalysisInformation(props) {
    const updateMetadata = (field, value) => {
        props.setMetadata({
            ...props.metadata,
            [field]: value,
        });
    };

    return (
        <>
            <div
                style={{
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                }}
            >
                <h2 style={{ marginBottom: "15px" }}>Analysis Information</h2>
                <h4>This document is the certification of hazard assessment for PPE for the workplace.</h4>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "25px",
                    }}
                >
                    <div>
                        <label>Acme Widgets, Inc. (Location)</label>
                        <input
                            type="text"
                            placeholder="Choose or type a location"
                            value={props.metadata.location}
                            onChange={(e) => updateMetadata("location", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Department</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.department}
                            onChange={(e) => updateMetadata("department", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Activity or Process</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.activity}
                            onChange={(e) => updateMetadata("activity", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Building/Room</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.buildingRoom}
                            onChange={(e) => updateMetadata("buildingRoom", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Job Title</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.jobTitle}
                            onChange={(e) => updateMetadata("jobTitle", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Supervisor</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.supervisor}
                            onChange={(e) => updateMetadata("supervisor", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Prepared By</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.preparedBy}
                            onChange={(e) => updateMetadata("preparedBy", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            value={props.metadata.date}
                            onChange={(e) => updateMetadata("date", e.target.value)}
                            style={{
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                </div>
            </div >
        </>
    );
}