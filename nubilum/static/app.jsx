const { useState, useEffect, useRef } = React;

// HL7 Message Display Component with inline editing
function HL7MessageDisplay({ message, onMessageChange, editable = false }) {
    const [editedMessage, setEditedMessage] = useState(message);

    useEffect(() => {
        setEditedMessage(message);
    }, [message]);

    if (!message || message.trim() === '') {
        return (
            <div className="hl7-message" style={{ color: '#a0aec0', fontStyle: 'italic' }}>
                {editable ? 'Paste your HL7 message here...' : 'Anonymized message will appear here...'}
            </div>
        );
    }

    const handleFieldEdit = (segmentIndex, fieldIndex, newValue) => {
        const lines = editedMessage.split('\n');
        const fields = lines[segmentIndex].split('|');
        fields[fieldIndex] = newValue;
        lines[segmentIndex] = fields.join('|');
        const newMessage = lines.join('\n');
        setEditedMessage(newMessage);
        if (onMessageChange) {
            onMessageChange(newMessage);
        }
    };

    const lines = editedMessage.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="hl7-message">
            {lines.map((line, lineIndex) => {
                const fields = line.split('|');
                const segmentType = fields[0];
                const segmentClass = `hl7-segment hl7-segment-${segmentType.toLowerCase()}`;

                return (
                    <div key={lineIndex} className={segmentClass}>
                        {fields.map((field, fieldIndex) => (
                            <React.Fragment key={fieldIndex}>
                                {fieldIndex > 0 && (
                                    <span className="field-separator">|</span>
                                )}
                                {editable && fieldIndex > 0 ? (
                                    <span
                                        className="hl7-field hl7-field-editable"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleFieldEdit(lineIndex, fieldIndex, e.target.textContent)}
                                    >
                                        {field}
                                    </span>
                                ) : (
                                    <span className="hl7-field">
                                        {field.split('^').map((component, compIndex) => (
                                            <React.Fragment key={compIndex}>
                                                {compIndex > 0 && (
                                                    <span className="component-separator">^</span>
                                                )}
                                                {component}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

// Alert Component
function Alert({ type, message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`alert alert-${type}`}>
            <span>{type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span>{message}</span>
        </div>
    );
}

// Main App Component
function App() {
    const [inputMessage, setInputMessage] = useState('');
    const [outputMessage, setOutputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [version, setVersion] = useState('');
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Fetch version on load
        fetch('/api/version')
            .then(res => res.json())
            .then(data => setVersion(data.version))
            .catch(err => console.error('Failed to fetch version:', err));
    }, []);

    const handleAnonymize = async () => {
        if (!inputMessage.trim()) {
            setAlert({ type: 'error', message: 'Please enter an HL7 message to anonymize.' });
            return;
        }

        setLoading(true);
        setAlert(null);

        try {
            const response = await fetch('/api/anonymize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();

            if (data.success) {
                setOutputMessage(data.anonymized_message);
                setAlert({ type: 'success', message: 'Message anonymized successfully!' });
            } else {
                setAlert({ type: 'error', message: data.error || 'Anonymization failed.' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to connect to the server.' });
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setInputMessage('');
        setOutputMessage('');
        setAlert({ type: 'info', message: 'Messages cleared.' });
    };

    const handleCopy = async () => {
        if (!outputMessage) {
            setAlert({ type: 'error', message: 'No message to copy.' });
            return;
        }

        try {
            await navigator.clipboard.writeText(outputMessage);
            setAlert({ type: 'success', message: 'Message copied to clipboard!' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to copy message.' });
        }
    };

    const handleLoadExample = () => {
        const exampleMessage = `MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20250107120000||ADT^A01|MSG00001|P|2.5
EVN|A01|20250107120000|||OPERATOR123^Smith^John
PID|1||123456789^^^HOSPITAL^MR||Doe^John^Robert||19800515|M|||123 Main Street^Apt 4B^Lisbon^Lisboa^1000-001^PT||+351912345678|+351213456789|EN|M|CAT|987654321^^^HOSPITAL^AN||123-45-6789
NK1|1|Doe^Jane^||SPOUSE|456 Oak Avenue^^Porto^^4000-001^PT|+351918765432
PV1|1|I|ICU^101^01^HOSPITAL|||DOC123^Johnson^Michael^^^Dr.|||SUR||||2|||DOC123^Johnson^Michael^^^Dr.|INP|VISIT123456|||||||||||||||||||HOSPITAL||REG|||20250107110000
ORC|NW|ORDER123|FILLER456|GROUP789|SC||^^^^^R||20250107120000|NURSE456^Williams^Sarah
OBR|1|ORDER123|FILLER456|CBC^Complete Blood Count^L|||20250107120000|||TECH789^Brown^David`;

        setInputMessage(exampleMessage);
        setAlert({ type: 'info', message: 'Example message loaded.' });
    };

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-left">
                    <img
                        src="hl7pt_logo.png"
                        alt="HL7 Portugal Logo"
                        className="logo"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="header-text">
                        <h1>Nubilum</h1>
                        <p>HL7 Portugal Message Anonymization Tool</p>
                    </div>
                </div>
                {version && <div className="version">v{version}</div>}
            </header>

            <div className="disclaimer">
                <span className="disclaimer-icon">⚠️</span>
                <div className="disclaimer-content">
                    <h3>Privacy Notice</h3>
                    <p>
                        This tool does NOT store any messages. All anonymization is performed in real-time,
                        and no data is retained on our servers. However, please ensure you have the proper
                        authorization to process any HL7 messages containing personal health information.
                    </p>
                </div>
            </div>

            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="legend">
                <h3>Segment Color Legend</h3>
                <div className="legend-items">
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(102, 126, 234, 0.1)' }}></div>
                        <span>MSH - Message Header</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(237, 100, 166, 0.1)' }}></div>
                        <span>PID - Patient Identification</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(52, 211, 153, 0.1)' }}></div>
                        <span>PV1 - Patient Visit</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(251, 191, 36, 0.1)' }}></div>
                        <span>OBR - Observation Request</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(96, 165, 250, 0.1)' }}></div>
                        <span>OBX - Observation Result</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'rgba(248, 113, 113, 0.1)' }}></div>
                        <span>NK1 - Next of Kin</span>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="panel">
                    <div className="panel-header">
                        <h2>Input Message</h2>
                        <button
                            className="btn btn-secondary"
                            onClick={handleLoadExample}
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                            Load Example
                        </button>
                    </div>
                    <div className="textarea-container">
                        <textarea
                            className="message-input"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Paste your HL7 v2 message here (ER7 format)..."
                        />
                        <div className="char-counter">{inputMessage.length} characters</div>
                    </div>
                    <div className="button-group">
                        <button
                            className="btn btn-primary"
                            onClick={handleAnonymize}
                            disabled={loading || !inputMessage.trim()}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Anonymizing...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔒</span>
                                    <span>Anonymize Message</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Anonymized Output</h2>
                    </div>
                    <HL7MessageDisplay
                        message={outputMessage}
                        onMessageChange={setOutputMessage}
                        editable={true}
                    />
                    <div className="button-group">
                        <button
                            className="btn btn-copy"
                            onClick={handleCopy}
                            disabled={!outputMessage}
                        >
                            <span>📋</span>
                            <span>Copy to Clipboard</span>
                        </button>
                        <button
                            className="btn btn-clear"
                            onClick={handleClear}
                            disabled={!inputMessage && !outputMessage}
                        >
                            <span>🗑️</span>
                            <span>Clear All</span>
                        </button>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>
                    &copy; 2025 HL7 Portugal - Nubilum v{version} |
                    <a href="https://hl7.pt" target="_blank" rel="noopener noreferrer"> HL7 Portugal Website</a>
                </p>
            </footer>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
