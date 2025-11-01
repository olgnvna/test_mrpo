import { marked } from 'marked';
import fetch from 'node-fetch';


const title = process.env.ISSUE_TITLE;
const body = process.env.ISSUE_BODY;
const url = process.env.ISSUE_URL;

const htmlBody = marked.parse(body);
const fullHtml = `<p><strong>Связанная задача:</strong> <a 
href='${url}'>${url}</a></p>\n${htmlBody}`;

const payload = {
    name: title,
    book_id: process.env.BOOKSTACK_BOOK_ID,
    html: fullHtml
};

fetch(`${process.env.BOOKSTACK_URL}/api/pages`, {
    method: 'POST',
    headers: {
        'Authorization': `Token ${process.env.BOOKSTACK_API_ID}:${process.env.BOOKSTACK_API_SECRET}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    if (!res.ok) {
        console.error('Failed to create page:', res.status, res.statusText);
        return res.text().then(text => console.error(text));
    } else {
        console.log('Page created successfully');
    }
}).catch(err => console.error('Request error:', err));
