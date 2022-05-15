import { loadLocalWorkspace, closeAllRemoteMaps } from "@salto-io/core";
import { Workspace } from "@salto-io/workspace";

const getWorkspace = async (path: string): Promise<Workspace> => {
  return loadLocalWorkspace(path);
};

const startRun = async (event: any, context: any) => {
  try {
    const ws = await getWorkspace("sample_org");
    console.log(ws);
    closeAllRemoteMaps();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

(async () => {
  startRun({ obj_key: "06ac9dab-9a02-4ce5-b7e0-1d5d440763f1.zip" }, null);
  return;
})();
