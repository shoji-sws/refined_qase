window.onload = function () {
  chrome.extension.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request == "addLink") {
      handleOnTapIcon();
    }
  });

  window.addEventListener("click", function () {
    handlePageChange();
  });

  handleOnLoad();
};

function handleOnTapIcon() {
  const url = getActiveTabUrl();
  if (url.includes("plan")) {
    addLinkToSuiteCaseInTestPlan();
  } else if (url.includes("project")) {
    addLinkToCaseInRepository();
  }
}

async function handlePageChange() {
  const url = getActiveTabUrl();

  if (url.includes("plan")) {
    await sleep(1000);
    addLinkToSuiteCaseInTestPlan();
  } else if (url.includes("project")) {
    await sleep(6000);
    addLinkToCaseInRepository();
  }
}

async function handleOnLoad() {
  const url = getActiveTabUrl();
  if (url.includes("project")) {
    await sleep(6000);
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
  suitecaseParamsElementList.forEach((suiteCaseParamsElement) => {
    const suiteKeyElement = suiteCaseParamsElement.children[0];

    const suiteCaseId = suiteKeyElement.innerHTML;
    if (suiteCaseId[0] === "<") {
      return;
    }

    const [projectId, caseId] = suiteCaseId.split("-");
    const caseLink = `https://app.qase.io/case/${projectId}/edit/${caseId}`;

    suiteKeyElement.innerHTML = `<a href="${caseLink}" target="_blank">${suiteCaseId}</a>`;
  });
}

function addLinkToCaseInRepository() {
  const caseRowIdElementList = Array.from(
    document.getElementsByClassName("case-row-id")
  );

  caseRowIdElementList.forEach((caseRowIdElement) => {
    const suiteCaseId = caseRowIdElement.innerHTML;
    const [projectId, caseId] = suiteCaseId.split("-");
    const caseLink = `https://app.qase.io/case/${projectId}/edit/${caseId}`;

    caseRowIdElement.innerHTML = `<a href="${caseLink}" target="_blank">${suiteCaseId}</a>`;
  });
}
