export default function JobSteps(props) {
    const updateStepField = (index, field, value) => {
        const updated = [...props.steps];
        updated[index][field] = value;
        props.setSteps(updated);
    };

    const updateListField = (stepIndex, listName, itemIndex, value) => {
        const updated = [...props.steps];
        updated[stepIndex][listName][itemIndex] = value;
        props.setSteps(updated);
    };

    const addListItem = (stepIndex, listName) => {
        const updated = [...props.steps];
        updated[stepIndex][listName].push("");
        props.setSteps(updated);
    };

    const removeListItem = (stepIndex, listName) => {
        const updated = [...props.steps];
        updated[stepIndex][listName].pop("");
        props.setSteps(updated);
    };

    const removeStep = (index) => {
        props.setSteps(props.steps.filter((_, i) => i !== index));
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
                <h2>Job Steps</h2>
                <table border="1" cellPadding="10" width="100%" style={{ marginBottom: "20px", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>TASKS / STEPS</th>
                            <th style={{ width: "30%" }}>HAZARDS - CONSEQUENCES</th>
                            <th style={{ width: "30%" }}>CONTROLS (SAFEGUARDS)</th>
                            <th style={{ width: "20%" }}>PHOTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.steps.map((step, stepIndex) => (
                            <tr key={step.id}>
                                {/* TASK */}
                                <td>
                                    <textarea
                                        placeholder="Click to add task/step"
                                        value={step.task}
                                        onChange={(e) =>
                                            updateStepField(stepIndex, "task", e.target.value)
                                        }
                                        style={{
                                            width: "100%",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                    <br />
                                    <button type="button" style={{ margin: '6px' }} onClick={() => removeStep(stepIndex)}>
                                        Remove
                                    </button>
                                </td>

                                {/* HAZARDS */}
                                <td>
                                    {step.hazards.map((hazard, hazardIndex) => (
                                        <textarea
                                            key={hazardIndex}
                                            placeholder="Click to add hazard and consequence"
                                            value={hazard}
                                            onChange={(e) =>
                                                updateListField(
                                                    stepIndex,
                                                    "hazards",
                                                    hazardIndex,
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        style={{ margin: '6px' }}
                                        onClick={() => addListItem(stepIndex, "hazards")}
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        style={{ margin: '6px' }}
                                        onClick={() => removeListItem(stepIndex, "hazards")}
                                    >
                                        -
                                    </button>
                                </td>

                                {/* CONTROLS */}
                                <td>
                                    {step.controls.map((control, controlIndex) => (
                                        <textarea
                                            key={controlIndex}
                                            placeholder="Click to add control"
                                            value={control}
                                            onChange={(e) =>
                                                updateListField(
                                                    stepIndex,
                                                    "controls",
                                                    controlIndex,
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        style={{ margin: '6px' }}
                                        onClick={() => addListItem(stepIndex, "controls")}
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        style={{ margin: '6px' }}
                                        onClick={() => removeListItem(stepIndex, "controls")}
                                    >
                                        -
                                    </button>
                                </td>

                                {/* PHOTO */}
                                <td>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            updateStepField(stepIndex, "photo", e.target.files[0])
                                        }
                                        style={{
                                            width: "100%",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}