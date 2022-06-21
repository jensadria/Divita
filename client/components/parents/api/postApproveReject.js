import { renderPage } from "../../../index.js";

// appvoroOrReject : String
// if approve, send a request to delete the targeted task
export function postApproveReject(form, appvoroOrReject, data, requestType) {
  const taskId = form.task_id.value;
  const jsonData = data;
  const errorMessage = document.getElementById("error-message");

  // if the form is about approving/ rejecting COMPLETED TASKS
  if (requestType === "completed") {
    if (appvoroOrReject === "approve") {
      // send a request to the server to change the status of the task "completed"
      axios
        .patch(`/api/parents/taskcomplete/${taskId}`, jsonData)
        .then(() => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    } else {
      console.log("reject confirmed");
    }
    // if the form is about approving/ rejecting REQUESTED TASKS
  } else if (requestType === "pendingTasks") {
    if (appvoroOrReject === "approve") {
      // send a delete request to the server
      axios
        .patch(`/api/parents/approvetask/${taskId}`, jsonData)
        .then((res) => {
          renderPage();
        })
        .catch((err) => {
          console.log(err);
          errorMessage.textContent =
            "There was a server error. Please try again.";
          errorMessage.style.display = "block";
        });
    } else {
      console.log("reject confirmed");
    }
  }
}
