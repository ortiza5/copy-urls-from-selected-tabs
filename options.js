// Saves options to chrome.storage
function save_options() {
  const separatorChars = document.getElementById("separator").value;
  chrome.storage.local.set({ separatorChars: separatorChars }, function () {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}

// Restores state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({ separatorChars: ", \n" }, function (items) {
    document.getElementById("separator").value = items.separatorChars;
  });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
