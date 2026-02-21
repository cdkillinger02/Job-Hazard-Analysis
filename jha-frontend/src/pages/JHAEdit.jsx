import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { useParams } from "react-router-dom";
import AnalysisInformation from "./AnalysisInformation";
import JobSteps from "./JobSteps";
import WizardStepper from "./WizardStepper";
import Certify from "./Certify";

export default function JHAEdit(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [requiredFields, setRequiredFields] = useState(false);
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

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        } // Only fetch if editing an existing JHA
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
                    })) : []
                );
                setIsLoading(false);
            })
            .catch(err => console.error("Error fetching JHA:", err));
    }, []);

    const addStep = () => {
        setSteps([
            ...steps,
            {
                id: Date.now(),
                task: "",
                hazards: [""],
                controls: [""],
                photo: null,
            },
        ]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            location: metadata.location,
            department: metadata.department,
            activity: metadata.activity,
            buildingRoom: metadata.buildingRoom,
            jobTitle: metadata.jobTitle,
            supervisor: metadata.supervisor,
            preparedBy: metadata.preparedBy,
            date: metadata.date || null,
            steps: steps.map(step => ({
                task: step.task,
                hazards: step.hazards.filter(h => h.trim() !== ""),
                controls: step.controls.filter(c => c.trim() !== ""),
                photo: step.photo ?? null,
            })),
            requiredTraining: metadata.requiredTraining.filter(t => t.trim() !== ""),
            requiredPPE: metadata.requiredPPE.filter(p => p.trim() !== ""),
            signatures: metadata.signatures.map(sig => ({
                name: sig.name,
                date: sig.date || null
            })),
        };

        if (metadata.location == '' || metadata.department == '' || metadata.activity == '' || metadata.buildingRoom == '' ||
            metadata.jobTitle == '' || metadata.supervisor == '' || metadata.preparedBy == ''
            || metadata.signatures[0].name == '' || metadata.signatures[0].date == '') {
            if (!window.alert("There are required values missing from this analysis. Please return and complete all required values!")) return;
        } else {

            try {
                let res;
                if (id) {
                    res = await fetch(`http://127.0.0.1:8000/api/updateExistingAnalysis/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                } else {
                    res = await fetch("http://127.0.0.1:8000/api/createNewAnalysis", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                }

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(errText);
                }

                const data = await res.json();
                console.log("JHA saved:", data);

                setMetadata({
                    location: "",
                    department: "",
                    activity: "",
                    buildingRoom: "",
                    jobTitle: "",
                    supervisor: "",
                    preparedBy: "",
                    date: "",
                });
                props.setActiveStep(1);
                setSteps([]);
                navigate("/");

            } catch (err) {
                console.error("Error saving JHA:", err);
            }
        }
    };


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
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '20px' }}>
                            <div style={{ width: '1/3' }}>
                                <WizardStepper activeStep={props.activeStep} setActiveStep={props.setActiveStep} />
                            </div>
                            <div style={{ width: '2/3' }}>
                                {props.activeStep == 1 &&
                                    <AnalysisInformation metadata={metadata} setMetadata={setMetadata} view={false} />
                                } {props.activeStep == 2 &&
                                    <JobSteps steps={steps} setSteps={setSteps} view={false} />
                                } {props.activeStep == 3 &&
                                    <Certify metadata={metadata} setMetadata={setMetadata} view={false} />
                                }
                            </div>
                        </div>
                        <footer>
                            {props.activeStep == 1 ?
                                <button type="button" style={{ margin: '6px' }} onClick={() => navigate("/")}>Exit</button> :
                                <button type="button" style={{ margin: '6px' }} onClick={() => props.setActiveStep(props.activeStep - 1)}>Previous</button>}
                            {props.activeStep == 2 && <button type="button" style={{ margin: '6px' }} onClick={addStep}>+ Add Step</button>}
                            {props.activeStep == 3 ?
                                <button type="button" style={{ margin: '6px' }} onClick={handleSubmit}>Submit</button> :
                                <button type="button" style={{ margin: '6px' }} onClick={() => props.setActiveStep(props.activeStep + 1)}>Next</button>
                            }
                        </footer>
                    </>
            }
        </>
    );
}