window.onload = function () {
  chrome.extension.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request == "addLink") {
      applyChanges(false);
    }
  });

  window.addEventListener("click", function () {
    applyChanges(true);
  });

  applyChanges(true);
};

function applyChanges(withSleep) {
  const url = getActiveTabUrl();
  if (url.includes("plan")) {
    if (withSleep) {
      sleep(1000);
    }

    addLinkToSuiteCaseInTestPlan();
  } else if (url.includes("project")) {
    if (withSleep) {
      sleep(6000);
    }

    addLinkToCaseInRepository();
  }
}

function getActiveTabUrl() {
  return location.href;
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function addLinkToSuiteCaseInTestPlan() {
  const suitecaseParamsElementList = Array.from(
    document.getElementsByClassName("suitecase-params")
  );

  for (var suiteCaseParamsElement of suitecaseParamsElementList) {
    const suiteKeyElement = suiteCaseParamsElement.children[0];

    const suiteCaseId = suiteKeyElement.innerHTML;
    if (suiteCaseId[0] === "<") {
      break;
    }

    const [projectId, caseId] = suiteCaseId.split("-");
    const caseLink = `https://app.qase.io/case/${projectId}/edit/${caseId}`;

    suiteKeyElement.innerHTML = `<a href="${caseLink}" target="_blank">${suiteCaseId}</a>`;
  }
}

function addLinkToCaseInRepository() {
  const caseRowIdElementList = Array.from(
    document.getElementsByClassName("case-row-id")
  );

  for (var caseRowIdElement of caseRowIdElementList) {
    const suiteCaseId = caseRowIdElement.innerHTML;

    if (suiteCaseId[0] === "<") {
      break;
    }

    const [projectId, caseId] = suiteCaseId.split("-");
    const caseLink = `https://app.qase.io/case/${projectId}/edit/${caseId}`;

    caseRowIdElement.innerHTML = `<a href="${caseLink}" target="_blank">${suiteCaseId}</a>`;
  }
}
