const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

// Custom container plugin simulation for alerts >
md.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
    return '<div class="design-box">';
};
md.renderer.rules.blockquote_close = function (tokens, idx, options, env, self) {
    return '</div>';
};


const style = `
<style>
    body {
        font-family: 'Segoe UI', 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', Arial, sans-serif;
        line-height: 1.6;
        max-width: 850px;
        margin: 40px auto;
        padding: 0 20px;
        color: #333;
    }
    h1 { color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    h2 { color: #2c3e50; margin-top: 30px; border-bottom: 1px solid #eee; }
    h3 { color: #34495e; margin-top: 25px; }
    
    /* Perfect Tables */
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 25px 0;
        box-shadow: 0 0 20px rgba(0,0,0,0.05);
    }
    th {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
        padding: 12px 15px;
    }
    td {
        padding: 12px 15px;
        border-bottom: 1px solid #dddddd;
    }
    tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }
    tr:last-of-type border-bottom {
        border-bottom: 2px solid #009879;
    }
    
    /* Design Boxes (Blockquotes) */
    .design-box {
        background: #f8f9fa;
        border-left: 5px solid #009879;
        margin: 20px 0;
        padding: 15px 20px;
        border-radius: 0 4px 4px 0;
    }
    .design-box p {
        margin: 0; 
        color: #555;
    }
    
    /* Image Styling */
    img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: block;
        margin: 10px auto;
    }
    
    /* Specific styling for images inside tables */
    table img {
        max-width: 300px; /* Constrain width for PDF readability */
        max-height: 400px;
        margin: 0 auto;
        display: block;
    }
    
    /* Ensure table text aligns nicely with images */
    td {
        vertical-align: middle;
    }
    
    code {
        background: #f4f4f4;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: 'Consolas', monospace;
    }
    pre {
        background: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
    }
</style>
`;

const files = ['submission_revised2.md', 'feature_design_prd.md'];

files.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
        const htmlContent = md.render(content);
        const finalHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${file}</title>${style}</head><body>${htmlContent}</body></html>`;

        fs.writeFileSync(path.join(__dirname, '..', 'print_ready_docs', file.replace('.md', '.html')), finalHtml);
        console.log(`Generated: ${file.replace('.md', '.html')}`);
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
});
