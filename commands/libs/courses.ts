const axios = require('axios');
const canvas_tkn:string = '11299~aAHiTClQDxCZ43sUm0l9l5fHWtxMmaDy8D24PffKzrNrNdO7HXQKBO1dLuLkeDpz'
export const classes = async (apiKey= canvas_tkn, school = 'csus') => {
    const header: { Authorization: string } = {
        Authorization: `Bearer ${apiKey}`
    }, api_url: string = `https://${school}.instructure.com/api/v1`, date = new Date();
    date.setMonth(date.getMonth()-5);
    let courses = await axios.get(`${api_url}/courses`, {
        headers: header,
        params: {
            created_since: date.toISOString(),
            enrollment_state: 'active' || 'invited_or_pending',
            per_page: 100,
            enrollment_term_id : 172,
        }
    }).then(response => response.data).catch(e => console.error(e)).catch(e => console.error(e));
    courses = courses.filter(course => {
        const rule = !(/WPJ/gi.test(course.name) || /WPJ/gi.test(course.course_code))
        const createdAt = new Date(course.created_at);
        return rule && createdAt >= date;
    })
    return courses;
}
module.exports = {
    classes
}