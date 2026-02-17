
export default function todo(task, description = "", duedate = "", status = 0) {
  return {
    task: task,
    description: description,
    duedate: duedate,
    status: status,
  };
}
