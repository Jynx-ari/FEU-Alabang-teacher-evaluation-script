// ==UserScript==
// @name         Evaluation Auto-Rater
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to set all evaluation scores to a specific value
// @author       Jay
// @match        https://solar.feualabang.edu.ph/online/faculty/evaluation*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Create the UI
    const container = document.createElement('div');
    container.style = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        background: white;
        border: 2px solid #007bff;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: sans-serif;
    `;

    container.innerHTML = `
        <h4 style="margin: 0 0 10px 0; font-size: 14px;">Set Evaluation Scores</h4>
        <div style="display: flex; gap: 5px; margin-bottom: 10px;">
            <button class="rate-btn" data-score="1">1</button>
            <button class="rate-btn" data-score="2">2</button>
            <button class="rate-btn" data-score="3">3</button>
            <button class="rate-btn" data-score="4">4</button>
            <button class="rate-btn" data-score="5">5</button>
        </div>
        <button id="start-rating" style="width: 100%; padding: 5px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px;">Apply to All</button>
    `;

    document.body.appendChild(container);

    let selectedScore = "3"; // Default

    // 2. Handle score selection highlighting
    container.querySelectorAll('.rate-btn').forEach(btn => {
        btn.onclick = () => {
            container.querySelectorAll('.rate-btn').forEach(b => b.style.background = '');
            btn.style.background = '#ffc107';
            selectedScore = btn.getAttribute('data-score');
        };
    });

    // 3. Logic to change the dropdowns
    document.getElementById('start-rating').onclick = () => {
        // This selects all dropdowns that look like the questionnaire selects
        const selects = document.querySelectorAll('select[id*="questionnaire"]');

        selects.forEach(select => {
            // Find the option that matches the score value
            // Based on your page: 1=Poor, 2=Below Average, 3=Average, 4=Above Average, 5=Outstanding
            select.value = selectedScore;

            // Trigger 'change' event so the website knows you changed it
            select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        alert(`Set ${selects.length} evaluations to score ${selectedScore}`);
    };
})();
