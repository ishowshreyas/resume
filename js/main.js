const form = document.getElementById('resumeForm');
const nameInput = document.getElementById('name');
const summaryInput = document.getElementById('summary');
const skillInput = document.getElementById('skillInput');
const skillsContainer = document.getElementById('skillsContainer');
const experienceInput = document.getElementById('experience');
const previewContent = document.getElementById('previewContent');

let skills = [];

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

// Update live preview
function updatePreview() {
    const name = nameInput.value.trim();
    const summary = summaryInput.value.trim();
    const experience = experienceInput.value.trim();

    if (!name && !summary && skills.length === 0 && !experience) {
        previewContent.innerHTML = `
            <div class="empty-state">
                <p>Your resume will appear here as you fill in your details.</p>
                <p style="margin-top: 10px;">Start by sharing your name above! 👆</p>
            </div>
        `;
        return;
    }

    let html = '';

    if (name) {
        html += `<div class="preview-name">${name}</div>`;
    }

    if (summary) {
        html += `<div class="preview-summary">${summary}</div>`;
    }

    if (skills.length > 0) {
        html += `<div class="preview-section-title">Core Competencies</div>`;
        html += `<div class="preview-skills">`;
        skills.forEach(skill => {
            html += `<div class="preview-skill">${skill}</div>`;
        });
        html += `</div>`;
    }

    if (experience) {
        html += `<div class="preview-section-title">Professional Experience</div>`;
        html += `<div class="preview-experience">${experience}</div>`;
    }

    previewContent.innerHTML = html;
}

// Add skill function
function addSkill(skillText) {
    const skill = skillText.trim();
    if (skill && !skills.includes(skill)) {
        skills.push(skill);
        renderSkills();
        updatePreview();
        
        // Create sparkle effect
        const rect = skillInput.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    }
}

// Remove skill function
function removeSkill(index) {
    skills.splice(index, 1);
    renderSkills();
    updatePreview();
}

// Render skills as tags
function renderSkills() {
    skillsContainer.innerHTML = '';
    skills.forEach((skill, index) => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `
            ${skill}
            <button type="button" onclick="removeSkill(${index})">×</button>
        `;
        skillsContainer.appendChild(tag);
    });
}

// Generate PDF function
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = 20;

    // Name (Large, centered, gradient color)
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(231, 60, 126);
    const name = nameInput.value.trim();
    const nameWidth = doc.getTextWidth(name);
    doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 12;

    // Decorative line under name
    doc.setDrawColor(231, 60, 126);
    doc.setLineWidth(0.8);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 12;

    // Professional Summary section
    if (summaryInput.value.trim()) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(35, 166, 213);
        doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(85, 85, 85);
        const summaryLines = doc.splitTextToSize(summaryInput.value.trim(), maxWidth);
        doc.text(summaryLines, margin, yPosition);
        yPosition += (summaryLines.length * 5) + 10;
    }

    // Core Competencies section
    if (skills.length > 0) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(35, 166, 213);
        doc.text('CORE COMPETENCIES', margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(85, 85, 85);
        const skillsText = '• ' + skills.join('  •  ');
        const skillsLines = doc.splitTextToSize(skillsText, maxWidth);
        doc.text(skillsLines, margin, yPosition);
        yPosition += (skillsLines.length * 5) + 10;
    }

    // Professional Experience section
    if (experienceInput.value.trim()) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(35, 166, 213);
        doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(85, 85, 85);
        const experienceLines = doc.splitTextToSize(experienceInput.value.trim(), maxWidth);
        
        const experienceHeight = experienceLines.length * 5;
        if (yPosition + experienceHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.text(experienceLines, margin, yPosition);
    }

    // Add footer with date
    const footerY = pageHeight - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const footerText = `Generated on ${date}`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerWidth) / 2, footerY);

    // Save the PDF with sanitized filename
    const filename = `${name.replace(/[^a-z0-9]/gi, '_')}_Resume.pdf`;
    doc.save(filename);
}

// Event listeners
skillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addSkill(skillInput.value);
        skillInput.value = '';
    }
});

nameInput.addEventListener('input', updatePreview);
summaryInput.addEventListener('input', updatePreview);
experienceInput.addEventListener('input', updatePreview);

// Make removeSkill function globally accessible
window.removeSkill = removeSkill;

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (skills.length === 0) {
        alert('Please add at least one skill before generating your resume!');
        skillInput.focus();
        return;
    }

    if (!nameInput.value.trim()) {
        alert('Please enter your name!');
        nameInput.focus();
        return;
    }

    if (!summaryInput.value.trim()) {
        alert('Please enter your professional summary!');
        summaryInput.focus();
        return;
    }

    if (!experienceInput.value.trim()) {
        alert('Please enter your professional experience!');
        experienceInput.focus();
        return;
    }

    // Create celebration sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }

    // Generate and download PDF after a short delay
    setTimeout(() => {
        try {
            generatePDF();
            alert('✨ Success! Your resume has been generated and downloaded!');
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('There was an error generating your PDF. Please try again.');
        }
    }, 1000);
});

// Initialize preview on page load
updatePreview();
