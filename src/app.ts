import { ElemID } from "@salto-io/adapter-api";
import { loadLocalWorkspace, closeAllRemoteMaps } from "@salto-io/core";

const startRun = async () => {
  try {
    const start = Date.now();
    const ws = await loadLocalWorkspace("sample_org");
    await ws.getValue(new ElemID("salesforce", "Account", "field", "Id"));
    const end = Date.now();
    console.log((end - start) / 1000, " Seconds");
    closeAllRemoteMaps();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

(async () => {
  startRun();
  return;
})();
