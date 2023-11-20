import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((assignment) => assignment.course === cid);
        res.send(assignments);
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.status(201).send(newAssignment);
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((assignment) => assignment._id !== aid);
        res.sendStatus(204);
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((assignment) => assignment._id === aid);
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body,
            };
            res.sendStatus(204);
        } else {
            res.status(404).send("Assignment not found");
        }
    });
}

export default AssignmentRoutes;
