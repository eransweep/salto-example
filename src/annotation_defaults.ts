import {
  SF_FIELD_TEXT,
  SF_FIELD_PICKLIST,
  SF_FIELD_DATE,
  SF_FIELD_CURRENCY,
  SF_FIELD_CHECKBOX,
  SF_FIELD_ADDRESS,
  SF_FIELD_AUTO_NUMBER,
  SF_FIELD_DATE_TIME,
  SF_FIELD_EMAIL,
  SF_FIELD_HIRARCY,
  SF_FIELD_LONG_TEXT,
  SF_FIELD_LOOKUP,
  SF_FIELD_NAME,
  SF_FIELD_NUMBER,
  SF_FIELD_PERCENT,
  SF_FIELD_PHONE,
  SF_FIELD_UNKNOWN,
  SF_FIELD_URL,
  SF_FIELD_GEO_LOCATION,
  SF_FIELD_FORMULA_CHECKBOX,
  SF_FIELD_FORMULA_CURRENCY,
  SF_FIELD_FORMULA_DATE,
  SF_FIELD_FORMULA_DATETIME,
  SF_FIELD_FORMULA_NUMBER,
  SF_FIELD_FORMULA_PERCENT,
  SF_FIELD_FORMULA_TEXT,
  SF_FIELD_FORMULA_TIME,
} from "./constants";
import { Values } from "@salto-io/adapter-api";
import { SweepField } from "./app";

const NUMBERS_DEFUALTS = { scale: 0, precision: 18 };
const FORMULA_DEFAULTS = { formula: "" };

const generateApiName = (objectName: string, sfFieldName: string): string => {
  return `${objectName}.${sfFieldName}`; // e.g 'Lead.MyNewField__c'
};

const annotationsDefaults = {
  [SF_FIELD_CURRENCY]: NUMBERS_DEFUALTS,
  [SF_FIELD_GEO_LOCATION]: { scale: 6, displayLocationInDecimal: false },
  [SF_FIELD_CHECKBOX]: { defaultValue: false },
  [SF_FIELD_LONG_TEXT]: { length: 32000 },
  [SF_FIELD_LOOKUP]: { referenceTo: undefined, relationshipName: undefined },
  [SF_FIELD_NUMBER]: NUMBERS_DEFUALTS,
  [SF_FIELD_PICKLIST]: { valueSet: {} },
  [SF_FIELD_TEXT]: { length: 80 },
  [SF_FIELD_PERCENT]: NUMBERS_DEFUALTS,

  //Formula types
  [SF_FIELD_FORMULA_CHECKBOX]: { ...FORMULA_DEFAULTS, defaultValue: false },
  [SF_FIELD_FORMULA_CURRENCY]: { ...FORMULA_DEFAULTS, ...NUMBERS_DEFUALTS },
  [SF_FIELD_FORMULA_DATE]: { ...FORMULA_DEFAULTS },
  [SF_FIELD_FORMULA_DATETIME]: { ...FORMULA_DEFAULTS },
  [SF_FIELD_FORMULA_NUMBER]: { ...FORMULA_DEFAULTS, ...NUMBERS_DEFUALTS },
  [SF_FIELD_FORMULA_PERCENT]: { ...FORMULA_DEFAULTS, ...NUMBERS_DEFUALTS },
  [SF_FIELD_FORMULA_TEXT]: { ...FORMULA_DEFAULTS, length: 80 },
  [SF_FIELD_FORMULA_TIME]: { ...FORMULA_DEFAULTS },

  //No specific annotations
  [SF_FIELD_AUTO_NUMBER]: {},
  [SF_FIELD_DATE]: {},
  [SF_FIELD_ADDRESS]: {},
  [SF_FIELD_DATE_TIME]: {},
  [SF_FIELD_EMAIL]: {},
  [SF_FIELD_HIRARCY]: {},
  [SF_FIELD_NAME]: {},
  [SF_FIELD_PHONE]: {},
  [SF_FIELD_UNKNOWN]: {},
  [SF_FIELD_URL]: {},

  // [SF_FIELD_SUMMARY]:'',
};

export const setFieldAnnotation = (sweepField: SweepField): Values => {
  if (!annotationsDefaults[sweepField.fieldType]) {
    throw new Error(`Unknown sfdc field type: ${sweepField.fieldType} `);
  }

  const properties = sweepField.properties || {};
  return Object.assign(
    {},
    annotationsDefaults[sweepField.fieldType],
    properties,
    {
      apiName: generateApiName(sweepField.objectName, sweepField.sfFieldName),
    }
  );
};
