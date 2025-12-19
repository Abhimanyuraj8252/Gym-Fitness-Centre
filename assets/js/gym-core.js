// DARK MODE LOGIC
const html = document.documentElement;

// Check Local Storage or System Preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

/**
 * IRON LEGACY - Core Logic
 * Handles global interactions, BMI Calculator, and URL Parsing.
 */

// 1. BMI CALCULATOR
const BMICalculator = {
    calculate: (weight, heightCm) => {
        if (!weight || !heightCm) return 0;
        const heightM = heightCm / 100;
        return (weight / (heightM * heightM)).toFixed(1);
    },
    getCategory: (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
        if (bmi < 24.9) return { label: 'Normal', color: 'text-green-500' };
        if (bmi < 29.9) return { label: 'Overweight', color: 'text-yellow-500' };
        return { label: 'Obese', color: 'text-red-500' };
    }
};

// 2. QUERY PARAM PARSER (For Member Card)
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || 'Member',
        plan: params.get('plan') || 'N/A',
        expiry: params.get('expiry') || '',
        song: params.get('song') || '',
        photo: params.get('photo') || ''
    };
}

// 3. ANIMATION UTILS
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
