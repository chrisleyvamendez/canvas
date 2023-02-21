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
exports.classes = void 0;
const axios = require('axios');
const canvas_tkn = '11299~aAHiTClQDxCZ43sUm0l9l5fHWtxMmaDy8D24PffKzrNrNdO7HXQKBO1dLuLkeDpz';
const classes = (apiKey = canvas_tkn, school = 'csus') => __awaiter(void 0, void 0, void 0, function* () {
    const header = {
        Authorization: `Bearer ${apiKey}`
    }, api_url = `https://${school}.instructure.com/api/v1`, date = new Date();
    date.setMonth(date.getMonth() - 5);
    let courses = yield axios.get(`${api_url}/courses`, {
        headers: header,
        params: {
            created_since: date.toISOString(),
            enrollment_state: 'active' || 'invited_or_pending',
            per_page: 100,
            enrollment_term_id: 172,
        }
    }).then(response => response.data).catch(e => console.error(e)).catch(e => console.error(e));
    courses = courses.filter(course => {
        const rule = !(/WPJ/gi.test(course.name) || /WPJ/gi.test(course.course_code));
        const createdAt = new Date(course.created_at);
        return rule;
    });
    return courses;
});
exports.classes = classes;
module.exports = {
    classes: exports.classes
};
//# sourceMappingURL=courses.js.map