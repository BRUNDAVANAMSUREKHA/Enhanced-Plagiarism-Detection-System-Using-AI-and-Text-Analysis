# Enhanced Plagiarism Detection System Using AI and Text Analysis

## Overview
The **Enhanced Plagiarism Detection System** is an AI-powered application designed to analyze and detect plagiarism in text documents. This system combines advanced transformer-based models with traditional statistical methods to deliver high-accuracy plagiarism detection. It supports multiple document formats, including `.txt`, `.docx`, and `.pdf`, ensuring compatibility and convenience for a wide range of users.

This project aims to provide a robust, real-time solution for identifying copied or paraphrased content while offering additional insights into text structure and style. It is ideal for academic, professional, and creative domains where originality is paramount.

---

### Video Example

Here is a demonstration video showing how the project works:

<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Features
- **Hybrid Detection Framework**: Utilizes both AI-based semantic analysis and statistical algorithms for enhanced detection.
- **Multi-Format Support**: Compatible with `.txt`, `.docx`, and `.pdf` files.
- **Real-Time Feedback**: Provides immediate analysis with visual progress indicators.
- **Advanced Metrics**:
  - Plagiarism percentage and source matching confidence.
  - Writing style analysis (tone, formality, and consistency).
  - Readability scores such as Flesch Reading Ease and Gunning Fog Index.
  - Vocabulary diversity and word frequency analysis.
- **Interactive Visualization**: Highlights plagiarized sections and matches them with sources for easy review.
- **Cross-Device Compatibility**: Fully responsive design for desktops, tablets, and mobile devices.

---

## System Architecture
The system comprises three key components:

1. **Frontend**:
   - Built with HTML5, CSS3, and JavaScript for a modern and interactive interface.
   - Features include drag-and-drop uploads, dynamic progress circles, and color-coded results.

2. **Backend**:
   - Leverages TensorFlow.js and Transformers.js for real-time AI computations.
   - Ensures data privacy by performing all processing directly in the browser.

3. **Integration Layer**:
   - Parses and extracts content from `.txt`, `.docx`, and `.pdf` files for seamless analysis.

---

## Acknowledgments
This project leverages the following tools and technologies:
- **Hugging Face Transformers.js**: For implementing transformer-based semantic text analysis.
- **Mammoth.js**: For processing `.docx` files.
- **TensorFlow.js**: For enabling in-browser machine learning computations.

---

## Installation and Setup

### Prerequisites
- **Node.js**: Required to run the local development server.
- **Modern Browser**: Chrome, Firefox, or Edge recommended for optimal performance.

---

## Purpose
The system is designed to:
1. **Detect Plagiarism Accurately**: Identify both exact matches and paraphrased content.
2. **Enhance Originality Assessment**: Offer insights into text quality, readability, and style.
3. **Improve Workflow**: Deliver real-time analysis and actionable feedback to support document revision.
