import React, { useState } from "react";

export default function Certify() {
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

    // Add a new item to the training list
    const addTraining = () => {
        setTraining([...training, ""]);
    };

    // Remove the last item from the training list
    const removeTraining = () => {
        if (training.length > 1) {
            setTraining(training.slice(0, -1));
        }
    };

    // Update PPE fields dynamically
    const handlePPEChange = (e) => {
        setPPE({
            ...ppe,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log("Form submitted with data: ", { training, ppe, name, date });
    };

    return (
        <div
            style={{
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
            }}
        >
            <div>
                <h2>Certify Analysis</h2>

                {/* Required Training */}
                <div
                    style={{
                        padding: "0 20px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "40px",
                    }}
                >
                    {/* Required Training */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                    >
                        <h3 style={{ marginBottom: "10px" }}>Required Training</h3>

                        {training.map((item, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="Click to add required training."
                                value={item}
                                onChange={(e) => {
                                    const newTraining = [...training];
                                    newTraining[index] = e.target.value;
                                    setTraining(newTraining);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: "10px" }}>
                            <button type="button" onClick={addTraining} style={{
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}>
                                + Add Training
                            </button>
                            <button type="button" onClick={removeTraining} style={{
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}>
                                - Remove Training
                            </button>
                        </div>
                    </div>

                    {/* Required PPE */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                    >
                        <h3 style={{ marginBottom: "10px" }}>Required PPE</h3>

                        {[
                            { name: "eyeFaceProtection", placeholder: "Eye and face protection" },
                            { name: "headProtection", placeholder: "Head protection" },
                            {
                                name: "bodyProtection",
                                placeholder: "Body (foot, leg, hand, or arm) protection",
                            },
                            { name: "hearingProtection", placeholder: "Hearing protection" },
                            { name: "respiratoryProtection", placeholder: "Respiratory protection" },
                        ].map((field) => (
                            <input
                                key={field.name}
                                type="text"
                                name={field.name}
                                value={ppe[field.name]}
                                onChange={handlePPEChange}
                                placeholder={`Click to add ${field.placeholder}.`}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <br />
                {/* Understanding Statement */}
                <div style={{ marginBottom: "20px" }}>
                    <label>
                        I have read and understand the contents of the job hazard analysis and the controls required to mitigate the risks from the identified hazards.
                    </label>
                </div>

                {/* Name and Date */}
                <div style={{
                    padding: "0 20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                }}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Click to enter text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
