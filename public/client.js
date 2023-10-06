function toggleEditMode(taskId) {
  // Toggle the visibility of the edit form for the specified task
  const editForm = document.getElementById(`edit-form-${taskId}`);
  editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
}

function updateTask(taskId) {
  // Get the updated description and assignee values from the edit form
  const descriptionInput = document.getElementById(
    `edit-description-${taskId}`
  );
  const assigneeInput = document.getElementById(`edit-assignee-${taskId}`);
  const updatedDescription = descriptionInput.value;
  const updatedAssignee = assigneeInput.value;

  // Create a FormData object to send as the request body
  const formData = new FormData();
  formData.append('description', updatedDescription);
  formData.append('assignee', updatedAssignee);

  // Make a POST request to update the task with the new values
  fetch(`/tasks/${taskId}`, {
    method: 'POST', // Change to POST
    body: formData, // Use the FormData object
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the task's description and assignee in the UI
      const descriptionSpan = document.getElementById(`description-${taskId}`);
      const assigneeSpan = document.getElementById(`assignee-${taskId}`);
      descriptionSpan.textContent = updatedDescription;
      assigneeSpan.textContent = updatedAssignee;

      // Hide the edit form
      toggleEditMode(taskId);
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
}
