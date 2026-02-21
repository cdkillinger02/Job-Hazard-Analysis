import '../App.css'

export default function AnalysisInformation(props) {
    const updateMetadata = (field, value) => {
        props.setMetadata({
            ...props.metadata,
            [field]: value,
        });
    };

    return (
        <>
            <div className='modal'>
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
                        <label className="required">Acme Widgets, Inc. (Location)</label>
                        <input
                            type="text"
                            className='form-input'
                            placeholder="Choose or type a location"
                            value={props.metadata.location}
                            onChange={(e) => updateMetadata("location", e.target.value)}
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Department</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.department}
                            onChange={(e) => updateMetadata("department", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Activity or Process</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.activity}
                            onChange={(e) => updateMetadata("activity", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Building/Room</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.buildingRoom}
                            onChange={(e) => updateMetadata("buildingRoom", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Job Title</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.jobTitle}
                            onChange={(e) => updateMetadata("jobTitle", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Supervisor</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.supervisor}
                            onChange={(e) => updateMetadata("supervisor", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Prepared By</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={props.metadata.preparedBy}
                            onChange={(e) => updateMetadata("preparedBy", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                    <div>
                        <label className="required">Date</label>
                        <input
                            type="date"
                            value={props.metadata.date}
                            onChange={(e) => updateMetadata("date", e.target.value)}
                            className='form-input'
                            disabled={props.view}
                        />
                    </div>
                </div>
            </div >
        </>
    );
}