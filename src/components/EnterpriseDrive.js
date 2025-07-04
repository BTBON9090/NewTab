import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EnterpriseDrive = ({ showMessage }) => {
  const [recentFiles, setRecentFiles] = useState([
    { id: 1, name: 'Project Proposal.pdf', url: 'https://example.com/drive/project_proposal.pdf', shareLink: 'https://example.com/share/project_proposal' },
    { id: 2, name: 'Team Meeting Notes.docx', url: 'https://example.com/drive/meeting_notes.docx', shareLink: 'https://example.com/share/meeting_notes' },
    { id: 3, name: 'Q3 Report.xlsx', url: 'https://example.com/drive/q3_report.xlsx', shareLink: 'https://example.com/share/q3_report' },
  ]);

  const handleFileClick = (file) => {
    alert(`Opening file: ${file.name}\nURL: ${file.url}`);
    window.open(file.url, '_blank');
  };

  const handleShareClick = (file) => {
    navigator.clipboard.writeText(file.shareLink)
      .then(() => showMessage(`Share link copied to clipboard: ${file.shareLink}`, 'success')) 
      .catch(err => showMessage(`Failed to copy link: ${err}`, 'error'));
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '12px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)'
    }}>
      <h3>企业网盘 (模拟数据)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recentFiles.map((file) => (
          <li key={file.id} style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span 
              onClick={() => handleFileClick(file)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {file.name}
            </span>
            <button 
              onClick={() => handleShareClick(file)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Share
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnterpriseDrive;

EnterpriseDrive.propTypes = {
  showMessage: PropTypes.func.isRequired,
};