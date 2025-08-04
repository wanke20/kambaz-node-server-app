import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}
export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}
export function findAssignmentById(assignmentId) {
    const { assignments } = Database;
    return assignments.find((assignment) => assignment._id === assignmentId);
}
export function findAllAssignments() {
    const { assignments } = Database;
    return assignments;
}