 import { LogParser } from './LogParser.js';
    const parser = new LogParser();
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const logContent = document.getElementById('log-content');
    function handleFile(file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const rawText = event.target.result;
        const entries = parser.parse(rawText);
        renderTable(entries);
      };
      reader.readAsText(file);
    }
    function renderTable(entries) {
      if (!entries.length) {
        logContent.innerHTML = "<p>Aucune entrée trouvée.</p>";
        return;
      }
      let html = `
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Module</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
      `;
      for (const entry of entries) {
        const levelClass = `level-${entry.level.toUpperCase()}`;
        html += `
          <tr>
            <td>${entry.timestamp || "-"}</td>
            <td class="${levelClass}">${entry.level}</td>
            <td>${entry.module || "-"}</td>
            <td>${escapeHtml(entry.message)}</td>
          </tr>
        `;
      }
      html += `
          </tbody>
        </table>
      `;
      logContent.innerHTML = html;
    }
    function escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFile(file);
    });
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('hover');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('hover');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('hover');
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    });