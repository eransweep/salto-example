export const SALESFORCE = "salesforce";
export const CUSTOM_METADATA = "CustomMetadata";
export const STANDARD_VALUE_SET = "StandardValueSet";
export const GLOBAL_VALUE_SET = "GlobalValueSet";

export const FIELD = "field";
export enum NextStageTypeOptions {
  STAGE = "Stage",
  FUNNEL = "Funnel",
}

// Salesforce field types
export const ADDRESS = "Address";
export const AUTO_NUMBER = "AutoNumber";
export const CHECKBOX = "Checkbox";
export const CURRENCY = "Currency";
export const DATE = "Date";
export const DATE_TIME = "DateTime";
export const EMAIL = "Email";
export const GEO_LOCATION = "Geolocation";
export const HIRARCY = "Hierarchy";
export const LONG_TEXT = "LongTextArea";
export const LOOKUP = "Lookup";
export const MULTI_PICKLIST = "MultiselectPicklist";
export const NAME = "Name";
export const NUMBER = "Number";
export const PERCENT = "Percent";
export const PHONE = "Phone";
export const PICKLIST = "Picklist";
export const SUMMARY = "Summary";
export const TEXT = "Text";
export const TEXT_AREA = "TextArea";
export const TIME = "Time";
export const UNKNOWN = "Unknown"; //fields in sfdc with no visibility permissions
export const URL = "Url";

export const FORMULA_CHECKBOX = "FormulaCheckbox";
export const FORMULA_CURRENCY = "FormulaCurrency";
export const FORMULA_DATE = "FormulaDate";
export const FORMULA_DATETIME = "FormulaDateTime";
export const FORMULA_NUMBER = "FormulaNumber";
export const FORMULA_PERCENT = "FormulaPercent";
export const FORMULA_TEXT = "FormulaText";
export const FORMULA_TIME = "FormulaTime";

export const SF_FIELD_ADDRESS = `${SALESFORCE}.${ADDRESS}`;
export const SF_FIELD_CHECKBOX = `${SALESFORCE}.${CHECKBOX}`;
export const SF_FIELD_CURRENCY = `${SALESFORCE}.${CURRENCY}`;
export const SF_FIELD_AUTO_NUMBER = `${SALESFORCE}.${AUTO_NUMBER}`;
export const SF_FIELD_DATE = `${SALESFORCE}.${DATE}`;
export const SF_FIELD_DATE_TIME = `${SALESFORCE}.${DATE_TIME}`;
export const SF_FIELD_EMAIL = `${SALESFORCE}.${EMAIL}`;
export const SF_FIELD_GEO_LOCATION = `${SALESFORCE}.${GEO_LOCATION}`;
export const SF_FIELD_LONG_TEXT = `${SALESFORCE}.${LONG_TEXT}`;
export const SF_FIELD_LOOKUP = `${SALESFORCE}.${LOOKUP}`;
export const SF_FIELD_NUMBER = `${SALESFORCE}.${NUMBER}`;
export const SF_FIELD_PERCENT = `${SALESFORCE}.${PERCENT}`;
export const SF_FIELD_PHONE = `${SALESFORCE}.${PHONE}`;
export const SF_FIELD_PICKLIST = `${SALESFORCE}.${PICKLIST}`;
export const SF_FIELD_SUMMARY = `${SALESFORCE}.${SUMMARY}`;
export const SF_FIELD_TEXT = `${SALESFORCE}.${TEXT}`;
export const SF_FIELD_UNKNOWN = `${SALESFORCE}.${UNKNOWN}`; //?? what is it?
export const SF_FIELD_URL = `${SALESFORCE}.${URL}`;
export const SF_FIELD_HIRARCY = `${SALESFORCE}.${HIRARCY}`;
export const SF_FIELD_NAME = `${SALESFORCE}.${NAME}`;
export const SF_STRING = "string";

export const SF_FIELD_FORMULA_CHECKBOX = `${SALESFORCE}.${FORMULA_CHECKBOX}`;
export const SF_FIELD_FORMULA_CURRENCY = `${SALESFORCE}.${FORMULA_CURRENCY}`;
export const SF_FIELD_FORMULA_DATE = `${SALESFORCE}.${FORMULA_DATE}`;
export const SF_FIELD_FORMULA_DATETIME = `${SALESFORCE}.${FORMULA_DATETIME}`;
export const SF_FIELD_FORMULA_NUMBER = `${SALESFORCE}.${FORMULA_NUMBER}`;
export const SF_FIELD_FORMULA_PERCENT = `${SALESFORCE}.${FORMULA_PERCENT}`;
export const SF_FIELD_FORMULA_TEXT = `${SALESFORCE}.${FORMULA_TEXT}`;
export const SF_FIELD_FORMULA_TIME = `${SALESFORCE}.${FORMULA_TIME}`;

export const SF_CUSTOM_METADATA = "salesforce.CustomMetadata";
