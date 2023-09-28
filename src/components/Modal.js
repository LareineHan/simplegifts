import React, { useState } from 'react'; // the reason why adding ',' is because we are importing two things from react

function Modal({ item, closeModal }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!item) return null; // if item is undefined or null, return nothing

  const details = item.details; // Accessing details from the item object
  const renderDetails = () => {
    if (!details) return null;
    const parts = details.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3);
        return (
          <div key={index} style={{ position: 'relative' }} className="code">
            <button
              className="copy-btn"
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
              }}
              onClick={() => handleCopyClick(code)}>
              {isCopied ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="fas fa-copy"></i>
              )}
            </button>
            <pre>
              <code
                style={{
                  paddingTop: '10px',
                  display: 'block',
                  whiteSpace: 'pre-wrap',
                }}>
                {code}
              </code>
            </pre>
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="modal">
      <h4 className="modal-title">
        {item.title} {/* Accessing title from the item object */}
      </h4>
      <div className="modal-details">{renderDetails()}</div>
      <button className="btn-close" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default Modal;
