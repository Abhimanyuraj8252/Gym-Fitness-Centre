/**
 * IRON LEGACY - Admin Core
 * Handles Authentication, Asset Uploads (Cloudinary), and Link Generation.
 */

// CONFIGURATION - DO NOT CHANGE WITHOUT AUTHORIZATION
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dtmasxucb/auto/upload";
const UPLOAD_PRESET = "Database"; 

// STATE
let uploadedMusicUrl = "";
let uploadedPhotoUrl = "";

// 1. AUTHENTICATION SYSTEM (Mock SHA-256)
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyAdmin(username, password) {
    // Hardcoded hashes for 'admin' and 'Power@2025'
    // admin -> 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    // Power@2025 -> 8be3c943b1609fffbfc51aad666d0a04adf83c9d2e97b71c27c394c9b8537656
    
    // NOTE: For demo purposes, we will just check string equality on the hash to simulated "checking DB".
    // In a real app, these hashes would come from a server.
    
    const userHash = await hashString(username);
    const passHash = await hashString(password);
    
    // Pre-calculated hashes to match User Request requirements exactly
    // We will simple compare against known values for the requested credentials
    // For simplicity in this static environment, we verify against the known correct inputs.
    
    return (username === 'admin' && password === 'Power@2025');
}

// 2. CLOUDINARY UPLOADER
async function uploadToCloudinary(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'client_upload'); // As per user config

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if(data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error("Cloudinary Error:", error);
        alert("Upload Failed! Check console.");
        return null;
    }
}

// EXPORT (if module) or attach to window
window.AdminCore = {
    verifyAdmin,
    uploadToCloudinary
};
