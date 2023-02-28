require("dotenv").config();
export const defaultCurrency = process.env.DEFAULT_CURRENCY || "EUR";
export const defaultAccountType = process.env.DEFAULT_ACCOUNT_TYPE || "General";
