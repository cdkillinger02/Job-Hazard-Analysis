import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: "#f0e9d2",
        padding: 4,
        fontWeight: "bold",
        fontSize: 9,
        textAlign: "center",
    },
    headerCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 4,
        fontSize: 8,
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 4,
        fontSize: 8,
    },
    tableCell: {
        margin: "auto",
        fontSize: 8,
    },
    bold: {
        fontWeight: "bold",
    },
    certificationText: {
        backgroundColor: "#d8ceac",
        fontStyle: "italic",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 6,
        textAlign: "center",
        fontSize: 9,
        marginBottom: 10,
    },
    listItem: {
        marginBottom: 2,
        fontSize: 8,
    },
    photoPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: "#d9e4f5",
        border: "1 solid #000",
    },
    bottomTable: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 20,
    },
    bottomTableRow: {
        flexDirection: "row",
    },
    bottomTableColHeader: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: "#d8ceac",
        padding: 4,
        fontWeight: "bold",
        fontSize: 9,
        textAlign: "center",
    },
    bottomTableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 4,
        fontSize: 9,
        color: "#999",
    },
    acknowledgementText: {
        fontStyle: "italic",
        fontSize: 7,
        marginTop: 8,
        marginBottom: 4,
    },
});

const renderList = (items) => (
    <View>
        {items.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>
                {item}
            </Text>
        ))}
    </View>
);

export default function Export({ metadata, steps }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Job Hazard Analysis</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Acme Widgets, Inc. (Location): </Text>
                                {metadata.location || "Choose or type a location."}
                            </Text>
                        </View>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Department: </Text>
                                {metadata.department || "Click to enter text."}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Activity or Process: </Text>
                                {metadata.activity || "Click to enter text."}
                            </Text>
                        </View>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Building/Room: </Text>
                                {metadata.buildingRoom || "Click to enter text."}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Job Title: </Text>
                                {metadata.jobTitle || "Click to enter text."}
                            </Text>
                        </View>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Supervisor: </Text>
                                {metadata.supervisor || "Click to enter text."}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Prepared By: </Text>
                                {metadata.preparedBy || "Click to enter text."}
                            </Text>
                        </View>
                        <View style={styles.headerCol}>
                            <Text>
                                <Text style={styles.bold}>Date: </Text>
                                {metadata.date || "Click to enter a date."}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.certificationText}>
                    This document is the certification of hazard assessment for PPE for the workplace.
                </Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>TASKS/STEPS</Text>
                        <Text style={styles.tableColHeader}>HAZARDS - CONSEQUENCES</Text>
                        <Text style={styles.tableColHeader}>CONTROLS (SAFEGUARDS)</Text>
                        <Text style={styles.tableColHeader}>PHOTO</Text>
                    </View>

                    {steps.length === 0 ? (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol} colSpan={4}>
                                No steps added.
                            </Text>
                        </View>
                    ) : (
                        steps.map((step, i) => (
                            <View style={styles.tableRow} key={step.id || i}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {step.task || `Click to add task/step.`}
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    {step.hazards && step.hazards.length > 0 ? (
                                        renderList(step.hazards)
                                    ) : (
                                        <Text style={{ fontStyle: "italic", color: "#777", fontSize: 8 }}>
                                            No Hazards Added.
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.tableCol}>
                                    {step.controls && step.controls.length > 0 ? (
                                        renderList(step.controls)
                                    ) : (
                                        <Text style={{ fontStyle: "italic", color: "#777", fontSize: 8 }}>
                                            No Controls Added.
                                        </Text>
                                    )}
                                </View>

                                <View style={[styles.tableCol, { justifyContent: "center", alignItems: "center" }]}>
                                    <View style={styles.photoPlaceholder} />
                                </View>
                            </View>
                        ))
                    )}
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableColHeader, { width: "50%" }]}>
                            Required Training
                        </Text>
                        <Text style={[styles.tableColHeader, { width: "50%" }]}>
                            Required PPE
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: "50%" }]}>
                            {(metadata.requiredTraining && metadata.requiredTraining.length > 0) ? (
                                metadata.requiredTraining.map((item, idx) => (
                                    <Text key={idx} style={{ fontSize: 8, color: "#999", marginBottom: 2 }}>
                                        {item}
                                    </Text>
                                ))
                            ) : (
                                <>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add required training.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add required training.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add required training.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add required training.</Text>
                                </>
                            )}
                        </View>

                        <View style={[styles.tableCol, { width: "50%" }]}>
                            {(metadata.requiredPPE && metadata.requiredPPE.length > 0) ? (
                                metadata.requiredPPE.map((item, idx) => (
                                    <Text key={idx} style={{ fontSize: 8, color: "#999", marginBottom: 2 }}>
                                        {item}
                                    </Text>
                                ))
                            ) : (
                                <>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add eye and face protection.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add head protection.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add body (foot, leg, hand, or arm) protection.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add hearing protection.</Text>
                                    <Text style={{ fontSize: 8, color: "#bbb" }}>Click to add respiratory protection.</Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>

                <Text style={styles.acknowledgementText}>
                    I have read and understand the contents of the job hazard analysis and the controls required to mitigate the risks from the <Text style={{ textDecoration: "underline", fontStyle: "normal" }}>idenitified</Text> hazards
                </Text>

                <View style={styles.bottomTable}>
                    <View style={styles.bottomTableRow}>
                        <Text style={styles.bottomTableColHeader}>Name</Text>
                        <Text style={styles.bottomTableColHeader}>Date</Text>
                    </View>
                    <View style={styles.bottomTableRow}>
                        <Text style={styles.bottomTableCol}>
                            {metadata.signatures && metadata.signatures.length > 0
                                ? metadata.signatures[0].name || "Click to enter text."
                                : "Click to enter text."}
                        </Text>
                        <Text style={styles.bottomTableCol}>
                            {metadata.signatures && metadata.signatures.length > 0
                                ? metadata.signatures[0].date || "Click to enter a date."
                                : "Click to enter a date."}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}