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

    const handleFileChange = async (e, stepIndex) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/uploadPhoto", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            updateStepField(stepIndex, "photo", data.filename);

        } catch (err) {
            console.error("Upload failed", err);
        }
    };


    return (
        <>
            <div className='modal'>
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
                                        disabled={props.view}
                                    />
                                    <br />
                                    {!props.view &&
                                        <button type="button" style={{ margin: '6px' }} onClick={() => removeStep(stepIndex)}>
                                            Remove
                                        </button>
                                    }
                                </td>

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
                                            disabled={props.view}
                                        />
                                    ))}
                                    {!props.view &&
                                        <>
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
                                        </>
                                    }
                                </td>

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
                                            disabled={props.view}
                                        />
                                    ))}
                                    {!props.view &&
                                        <>
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
                                        </>
                                    }
                                </td>

                                <td>
                                    {!props.view &&
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, stepIndex)}
                                            style={{
                                                width: "100%",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                            }}
                                            disabled={props.view}
                                        />
                                    }
                                    {step && step.photo && (
                                        <img
                                            src={`http://127.0.0.1:8000/api/uploads/${step.photo}`}
                                            alt="Uploaded preview"
                                            style={{ marginTop: '10px', maxWidth: '200px', borderRadius: '6px' }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}