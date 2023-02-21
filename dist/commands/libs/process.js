"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessIDs = void 0;
const axios = require("axios");
function ProcessIDs(nums) {
    return __awaiter(this, void 0, void 0, function* () {
        const tkn = 'MTA3NDM0NDg5NTM2MTMzMTMwMQ.G-Xu_h.uLZ-r_lyvYrQdMpB6qJRxxeZziEfivaDYtzbI4';
        const canvas_tkn = '11299~aAHiTClQDxCZ43sUm0l9l5fHWtxMmaDy8D24PffKzrNrNdO7HXQKBO1dLuLkeDpz';
        if (nums.length === 0)
            return null;
        // [['Math26B',{...}],['Stat129', {...}]];
        return nums.map(id => {
            axios.get(`https://csus.instructure.com/api/v1/courses/` + id, {
                headers: { Authorization: ` Bearer ${canvas_tkn}` }
            }).then((response) => {
                console.log(response.data);
                return [response.data.name, response.data];
            }).catch((e) => {
                console.error(e);
            });
        });
    });
}
exports.ProcessIDs = ProcessIDs;
//# sourceMappingURL=process.js.map