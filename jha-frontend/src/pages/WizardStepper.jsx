import React from "react";

export default function WizardStepper({ activeStep, setActiveStep }) {
    const steps = [
        { id: 1, name: "Analysis Information" },
        { id: 2, name: "Job Steps" },
        { id: 3, name: "Certify & Submit" },
    ];

    const handleStepClick = (step) => {
        if (step.id <= activeStep) {
            setActiveStep(step.id); // Navigate to clicked step if it's valid
        }
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
        <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
            <h3>Wizard Stepper</h3>
            {steps.map((step) => (
                <div
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: step.id <= activeStep ? "pointer" : "not-allowed",
                        opacity: step.id <= activeStep ? 1 : 0.5,
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: step.id <= activeStep ? "#2563eb" : "#ccc",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                        }}
                    >
                        {step.id}
                    </div>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>{step.name}</span>
                </div>
            ))}
        </div>
        </div>
    );
}
