import { useState, useEffect } from "react";

export default function Certify(props) {
    const [training, setTraining] = useState([""]);
    const [ppe, setPPE] = useState({
        eyeFaceProtection: "",
        headProtection: "",
        bodyProtection: "",
        hearingProtection: "",
        respiratoryProtection: "",
    });
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (props.metadata.requiredTraining && props.metadata.requiredTraining.length > 0) {
            setTraining(props.metadata.requiredTraining);
        }

        if (props.metadata.requiredPPE && props.metadata.requiredPPE.length > 0) {
            setPPE({
                eyeFaceProtection: props.metadata.requiredPPE[0] || "",
                headProtection: props.metadata.requiredPPE[1] || "",
                bodyProtection: props.metadata.requiredPPE[2] || "",
                hearingProtection: props.metadata.requiredPPE[3] || "",
                respiratoryProtection: props.metadata.requiredPPE[4] || "",
            });
        }

        if (props.metadata.signatures && props.metadata.signatures.length > 0) {
            setName(props.metadata.signatures[0].name || "");
            setDate(props.metadata.signatures[0].date || "");
        }
    }, []);

    useEffect(() => {
        props.setMetadata({
            ...props.metadata,
            requiredTraining: training.filter((t) => t.trim() !== ""),
            requiredPPE: Object.values(ppe).filter((p) => p.trim() !== ""),
            signatures: name
                ? [
                    {
                        name: name,
                        date: date || null,
                    },
                ]
                : [],
        });
    }, [training, ppe, name, date]);

    const addTraining = () => setTraining([...training, ""]);

    const removeTraining = () => {
        if (training.length > 1) setTraining(training.slice(0, -1));
    };

    const handleTrainingChange = (index, value) => {
        const newTraining = [...training];
        newTraining[index] = value;
        setTraining(newTraining);
    };

    const handlePPEChange = (e) => {
        setPPE({ ...ppe, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ borderRadius: "8px", padding: "16px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
            <h2>Certify Analysis</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", padding: "0 20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h3>Required Training</h3>
                    {training && training.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder="Click to add required training."
                            value={item}
                            onChange={(e) => handleTrainingChange(index, e.target.value)}
                            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
                        <button type="button" onClick={addTraining} style={{ borderRadius: "6px", border: "1px solid #ccc" }}>+ Add Training</button>
                        <button type="button" onClick={removeTraining} style={{ borderRadius: "6px", border: "1px solid #ccc" }}>- Remove Training</button>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h3>Required PPE</h3>
                    {[
                        { name: "eyeFaceProtection", placeholder: "Eye and face protection" },
                        { name: "headProtection", placeholder: "Head protection" },
                        { name: "bodyProtection", placeholder: "Body protection" },
                        { name: "hearingProtection", placeholder: "Hearing protection" },
                        { name: "respiratoryProtection", placeholder: "Respiratory protection" },
                    ].map((field) => (
                        <input
                            key={field.name}
                            type="text"
                            name={field.name}
                            placeholder={`Click to add ${field.placeholder}.`}
                            value={ppe[field.name]}
                            onChange={handlePPEChange}
                            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    ))}
                </div>
            </div>

            <br />

            <div style={{ marginBottom: "20px" }}>
                <label>
                    I have read and understand the contents of the job hazard analysis and the controls required to mitigate the risks from the identified hazards.
                </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", padding: "0 20px" }}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Click to enter text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                </div>
            </div>
        </div>
    );
}