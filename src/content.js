window.onload = function () {
  chrome.extension.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request == "addLinkToSuiteCase") {
      addLinkToSuiteCase();
    }
  });
  window.addEventListener("click", function () {
    setTimeout(addLinkToSuiteCase, 100);
  });
};

function addLinkToSuiteCase() {
  const suitecaseParamsList = Array.from(
    document.getElementsByClassName("suitecase-params")
  );
  suitecaseParamsList.forEach((suiteCaseParams) => {
    const suiteKeyElement = suiteCaseParams.children[0];

    const suiteKey = suiteKeyElement.innerHTML;
    if (suiteKey[0] === "<") {
      return;
    }

    const [projectId, suiteId] = suiteKey.split("-");
    const suiteLink = `https://app.qase.io/case/${projectId}/edit/${suiteId}`;

    suiteKeyElement.innerHTML = `<a href="${suiteLink}" target="_blank">${suiteKey}</a>`;
  });
}
