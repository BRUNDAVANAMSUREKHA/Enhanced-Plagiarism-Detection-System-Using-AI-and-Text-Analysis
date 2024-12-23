let detector;

async function initializeDetector() {
    detector = new EnhancedPlagiarismDetector();
    try {
        await detector.initialize();
        console.log('Detector initialized successfully');
        enableAnalysisButtons();
    } catch (error) {
        console.error('Failed to initialize detector:', error);
        disableAnalysisButtons();
    }
}

function enableAnalysisButtons() {
    document.getElementById('analyze-text-btn').disabled = false;
    document.getElementById('analyze-file-btn').disabled = false;
}

function disableAnalysisButtons() {
    document.getElementById('analyze-text-btn').disabled = true;
    document.getElementById('analyze-file-btn').disabled = true;
}

async function handleAnalysis() {
    if (!detector || !detector.initialized) {
        alert('Detector not initialized. Please wait...');
        return;
    }

    const textArea = document.querySelector('.text-area');
    const fileContent = document.getElementById('file-content');
    const textToAnalyze = textArea.value || fileContent.textContent;

    if (!textToAnalyze.trim()) {
        alert('Please enter or upload some text to analyze');
        return;
    }

    try {
        const results = await detector.analyzePlagiarism(textToAnalyze, { detailed: true });
        updateUI(results);
    } catch (error) {
        console.error('Analysis failed:', error);
        alert('Analysis failed: ' + error.message);
    }
}

function updateUI(results) {
    // Progress circle update
    const progressCircle = document.getElementById('plagiarism-progress');
    const percentageText = document.getElementById('plagiarism-percentage');
    const score = results.score;
    
    progressCircle.style.background = `conic-gradient(
        var(--plagiarized-color) ${score}%, 
        var(--original-color) ${score}% 100%
    )`;
    percentageText.textContent = `${score}%`;

    // Source matching
    const potentialSourcesElement = document.getElementById('potential-sources');
    const sourceTypes = [
        {
            name: 'Academic Database',
            baseUrl: 'scholar.google.com',
            description: 'Academic publications and research papers',
            confidence: calculateConfidence(results.details.analysis.style.formality),
            matchScore: calculateMatchScore(results.details.similarity.matches, 'academic')
        },
        {
            name: 'Online Article',
            baseUrl: 'research-hub.org',
            description: 'Web-based research and reference articles',
            confidence: calculateConfidence(results.details.analysis.complexity.readability),
            matchScore: calculateMatchScore(results.details.similarity.matches, 'online')
        },
        {
            name: 'Professional Publication',
            baseUrl: 'industry-insights.com',
            description: 'Industry-specific publications',
            confidence: calculateConfidence(results.details.analysis.style.consistency),
            matchScore: calculateMatchScore(results.details.similarity.matches, 'professional')
        },
        {
            name: 'Educational Resource',
            baseUrl: 'learning-platform.edu',
            description: 'Educational websites and resources',
            confidence: calculateConfidence(results.details.analysis.complexity.vocabularyDiversity),
            matchScore: calculateMatchScore(results.details.similarity.matches, 'educational')
        }
    ];

    const matchedSources = sourceTypes.map(source => {
        const confidenceClass = source.confidence.toLowerCase();
        return `
            <div class="source-item">
                <div class="source-details">
                    <strong>${source.name}</strong>
                    <div class="source-meta">
                        <small>${source.baseUrl}</small>
                        <small class="description">${source.description}</small>
                    </div>
                    <div class="confidence-indicator ${confidenceClass}">
                        ${source.confidence} Confidence
                    </div>
                </div>
                <div class="match-details">
                    <span class="match-percentage">${source.matchScore}%</span>
                    <div class="match-bar" style="width: ${source.matchScore}%"></div>
                </div>
            </div>
        `;
    }).join('');

    potentialSourcesElement.innerHTML = matchedSources || 
        '<p class="no-matches">No significant matches found</p>';

    // Document statistics
    const statsContainer = document.getElementById('basic-details');
    const stats = results.details.analysis.statistics;
    const style = results.details.analysis.style;
    const complexity = results.details.analysis.complexity;
    
    statsContainer.innerHTML = `
        <h3>Content Analysis</h3>
        <p>AI Content Probability: <span>${(results.details.aiDetection.probability * 100).toFixed(1)}%</span></p>
        <p>AI Detection Confidence: <span>${results.details.aiDetection.confidence}</span></p>
        <p>Writing Style: <span>${style.tone}</span></p>
        <p>Style Consistency: <span>${(style.consistency * 100).toFixed(1)}%</span></p>

        <h3>Text Metrics</h3>
        <p>Word Count: <span>${stats.wordCount}</span></p>
        <p>Character Count: <span>${stats.characterCount}</span></p>
        <p>Unique Words: <span>${stats.uniqueWords}</span></p>
        <p>Average Word Length: <span>${stats.averageWordLength.toFixed(2)}</span></p>
    
        <h3>Readability</h3>
        <p>Complexity Score: <span>${complexity.readability.toFixed(1)}</span></p>
        <p>Vocabulary Diversity: <span>${(complexity.vocabularyDiversity * 100).toFixed(1)}%</span></p>
    `;
}

function calculateConfidence(metric) {
    const score = metric * 100;
    if (score > 80) return 'High';
    if (score > 50) return 'Medium';
    return 'Low';
}

function calculateMatchScore(matches, type) {
    const baseScore = matches.find(m => m.source.toLowerCase().includes(type))?.score || 0;
    return Math.round(baseScore * 100);
}

document.addEventListener('DOMContentLoaded', initializeDetector);
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic
    const tabs = document.querySelectorAll('.input-tab');
    const sections = document.querySelectorAll('.text-section, .upload-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update section visibility
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.classList.contains(`${targetTab}-section`)) {
                    section.classList.add('active');
                }
            });
        });
    });

    // File upload handling
    const dropZone = document.getElementById('drop-zone');
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.querySelector('.file-info');
    const fileName = document.getElementById('file-name');
    const fileContent = document.getElementById('file-content');
    const clearFileBtn = document.getElementById('clear-file');

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary-color)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // Click to upload
    dropZone.addEventListener('click', () => {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    // Clear file
    clearFileBtn.addEventListener('click', () => {
        fileUpload.value = '';
        fileInfo.classList.remove('active');
        fileContent.style.display = 'none';
        fileContent.textContent = '';
    });

    // File handling function
    function handleFile(file) {
        if (!file) return;

        // Check file type
        const validTypes = ['.txt', '.doc', '.docx', '.pdf'];
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!validTypes.includes(extension)) {
            alert('Please upload a valid document file (.txt, .doc, .docx, .pdf)');
            return;
        }

        // Update UI
        fileName.textContent = file.name;
        fileInfo.classList.add('active');

        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
            fileContent.textContent = e.target.result;
            fileContent.style.display = 'block';
        };
        reader.readAsText(file);
    }

    // Initialize the plagiarism detector
    initializeDetector().catch(error => {
        console.error('Detector initialization failed:', error);
        alert('Failed to initialize plagiarism detector. Please refresh the page.');
    });

    // Analysis button handlers
    const analyzeTextBtn = document.getElementById('analyze-text-btn');
    const analyzeFileBtn = document.getElementById('analyze-file-btn');

    analyzeTextBtn.addEventListener('click', () => handleAnalysis());
    analyzeFileBtn.addEventListener('click', () => handleAnalysis());
});