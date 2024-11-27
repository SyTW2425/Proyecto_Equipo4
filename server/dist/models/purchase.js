"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
const purchaseSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    total_price: { type: Number, required: true },
    date: { type: String, required: true }
});
exports.Purchase = (0, mongoose_1.model)("Purchase", purchaseSchema);
exports.default = exports.Purchase;
