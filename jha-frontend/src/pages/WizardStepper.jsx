export default function WizardStepper({ activeStep, setActiveStep }) {
    const steps = [
        { id: 1, name: "Analysis Information" },
        { id: 2, name: "Job Steps" },
        { id: 3, name: "Certify & Submit" },
    ];

    return (
        <div className='modal'>
            <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                <h3>Wizard Stepper</h3>
                {steps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            opacity: 1,
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: step.id == activeStep ? "#2563eb" : "#ccc",
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
