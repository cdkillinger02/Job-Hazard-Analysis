import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { useParams } from "react-router-dom";
import AnalysisInformation from "./AnalysisInformation";
import JobSteps from "./JobSteps";
import Certify from "./Certify";
import { pdf } from "@react-pdf/renderer";
import Export from "./Export";

export default function JHAView(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState({
        location: "",
        department: "",
        activity: "",
        buildingRoom: "",
        jobTitle: "",
        supervisor: "",
        preparedBy: "",
        date: "",
    });
    const [steps, setSteps] = useState([{
        id: Date.now(),
        task: "",
        hazards: [""],
        controls: [""],
        photo: null,
    }]);

    const handleExport = async () => {
        const blob = await pdf(<Export metadata={metadata} steps={steps} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "job_hazard_analysis.pdf";
        a.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/jhas/${id}`)
            .then(res => res.json())
            .then(data => {
                setMetadata({
                    location: data.location,
                    department: data.department,
                    activity: data.activity,
                    buildingRoom: data.building_room,
                    jobTitle: data.job_title,
                    supervisor: data.supervisor,
                    preparedBy: data.prepared_by,
                    date: data.date,
                    requiredTraining: data.requiredTraining,
                    requiredPPE: data.requiredPPE,
                    signatures: data.signatures
                });
                setSteps(
                    data.steps ? data.steps.map(step => ({
                        id: step.id,
                        task: step.task,
                        hazards: step.hazards,
                        controls: step.controls,
                        photo: step.photo,
                        photoBase64Encoded: step.photoBase64Encoded ?? null
                    })) : []
                );
                setIsLoading(false);
            })
            .catch(err => console.error("Error fetching JHA:", err));
    }, []);

    return (
        <>
            <div className="top-bar">
                <nav className="breadcrumbs"><span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Home &gt;
                </span>{" "}<span>Job Hazard Analysis Wizard</span></nav>
                <div className="title">Acme Widgets Inc.</div>
            </div>

            <div className='modal'>
                <h1>Job Hazard Analysis Wizard</h1>
            </div>
            {
                isLoading ?
                    <span className="loader"></span>
                    : <>
                        <div style={{ gap: '20px' }}>
                            <div>
                                <AnalysisInformation metadata={metadata} setMetadata={setMetadata} view={true} />
                                <JobSteps steps={steps} setSteps={setSteps} view={true} />
                                <Certify metadata={metadata} setMetadata={setMetadata} view={true} />
                            </div>
                        </div>
                        <footer>
                            <button type="button" style={{ margin: '6px' }} onClick={() => navigate("/")}>Return</button>
                            <button type="button" style={{ margin: '6px' }} onClick={handleExport}>
                                Export PDF
                            </button>
                        </footer>
                    </>
            }
        </>
    );
}