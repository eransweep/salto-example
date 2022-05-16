import {
  DetailedChange,
  ElemID,
  Field,
  isField,
  ObjectType,
  Values,
} from "@salto-io/adapter-api";
import { detailedCompare } from "@salto-io/adapter-utils";
import { loadLocalWorkspace, closeAllRemoteMaps } from "@salto-io/core";
import { Workspace } from "@salto-io/workspace";
import { setFieldAnnotation } from "./annotation_defaults";

export interface NaclField {
  elemID: ElemID;
  annotations: object & { apiName: string; label: string; valueSet?: any[] };
  refType: { elemID: { typeName: string } };
}

export type SFDCPicklistValue = {
  label: string;
  fullName: string;
  default: boolean;
};

const getWorkspace = async (path: string): Promise<Workspace> => {
  return loadLocalWorkspace(path);
};
let ws: Workspace;

export type SweepField = {
  sfFieldName: string;
  objectName: string;
  fieldType: string;
  properties: any;
};

const addPicklistField = async (
  sweepField: SweepField,
  naclObj: ObjectType,
  ws: Workspace
): Promise<DetailedChange<any>[]> => {
  const picklistType = await ws.getValue(new ElemID("salesforce", "Picklist"));

  const newField = new Field(
    naclObj,
    sweepField.sfFieldName,
    picklistType,
    setFieldAnnotation(sweepField)
  );
  return [
    {
      action: "add",
      id: newField.elemID,
      data: { after: newField },
      path: [
        "salesforce",
        "Objects",
        sweepField.objectName,
        `${sweepField.objectName}CustomFields`,
      ], // this is optional, determines the file where this field will go
    },
  ];
};

const updatePicklist = async (
  naclField: Field,
  sweepField: SweepField
): Promise<DetailedChange[]> => {
  // We are currently supporting only picklist - //TODO support all updates
  if (sweepField.fieldType === "salesforce.Picklist") {
    return addValuesToExistingPicklistNaclField(
      naclField,
      sweepField.properties.valueSet
    );
  }
  // Should not reach here
  return null;
};

const addValuesToExistingPicklistNaclField = async (
  naclField: Field,
  valueSet: SFDCPicklistValue[]
): Promise<DetailedChange[]> => {
  const updatedNaclField = naclField.clone();
  updatedNaclField.annotations.valueSet = mergePicklistValues(
    naclField.annotations.valueSet,
    valueSet
  );
  // logger.log({ message: 'custom field nacl after change:', updatedNaclField });
  return detailedCompare(naclField, updatedNaclField);
};

const mergePicklistValues = (
  picklistA: SFDCPicklistValue[],
  picklistB: SFDCPicklistValue[]
): SFDCPicklistValue[] => {
  function listToMapByProperty(list: SFDCPicklistValue[], property: string) {
    const aMap = {};
    list.map((elem) => (aMap[elem[property]] = elem));
    return aMap;
  }

  const aMap = listToMapByProperty(picklistA, "fullName");
  const bMap = listToMapByProperty(picklistB, "fullName");
  const unified = [...picklistA];

  Object.keys(bMap).map((fullName: string) => {
    if (!aMap[fullName]) unified.push(bMap[fullName]);
  });
  return unified;
};

const fieldToNaclField = async (sweepField: SweepField): Promise<boolean> => {
  const naclObj = await ws.getValue(
    new ElemID("salesforce", sweepField.objectName)
  ); // We assume the object exists
  const naclField = await ws.getValue(
    new ElemID(
      "salesforce",
      sweepField.objectName,
      "field",
      sweepField.sfFieldName
    )
  );
  // If the fields exist, we should update it.
  const changes = isField(naclField)
    ? await updatePicklist(naclField, sweepField)
    : await addPicklistField(sweepField, naclObj, ws);
  await ws.updateNaclFiles(changes);
  await ws.flush();
  return true;
};

const loadField = async (sfFieldName: string): Promise<NaclField> => {
  const [objectName, fieldName] = sfFieldName.split(".");
  return await ws.getValue(
    new ElemID("salesforce", objectName, "field", fieldName)
  );
};

const createAndUpdatePicklist = async () => {
  const randNum = Math.floor(Math.random() * 100);

  const properties = {
    valueSet: [
      { fullName: "New", default: false, label: "New" },
      { fullName: "MQL", default: false, label: "MQL" },
      { fullName: "SQL", default: false, label: "SQL" },
      { fullName: "ClosedWon", default: false, label: "Closed - Won" },
    ],
  };
  const sweepField = {
    objectName: "Contact",
    fieldType: "salesforce.Picklist",
    sfFieldName: `sfFieldNamePick${randNum}__c`,
    properties: properties,
  } as SweepField;

  await fieldToNaclField(sweepField);

  const updatedProperties = {
    valueSet: [
      { fullName: "New", default: false, label: "New" },
      { fullName: "MQL", default: false, label: "MQL" },
      { fullName: "SQL", default: false, label: "SQL" },
      { fullName: "NewSQL", default: false, label: "NEW-SQL" },
      { fullName: "ClosedWon", default: false, label: "Closed - Won" },
    ],
  };

  const updatedSweepField = {
    objectName: "Contact",
    fieldType: "salesforce.Picklist",
    sfFieldName: `sfFieldNamePick${randNum}__c`,
    properties: updatedProperties,
  } as SweepField;

  await fieldToNaclField(updatedSweepField);

  const fieldUpdated = await loadField(`Contact.sfFieldNamePick${randNum}__c`);

  console.log(fieldUpdated);
};

const startRun = async () => {
  try {
    ws = await getWorkspace("sample_org");
    await createAndUpdatePicklist();
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
