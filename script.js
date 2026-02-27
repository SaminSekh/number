document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Patterns Database (Most Popular Operators Only) ---
    // --- Mobile Patterns Database (Expanded & Optimized) ---
    const MOBILE_PATTERNS = {
        // --- ASIA & PACIFIC ---
        'BD': { prefixes: ['13', '14', '15', '16', '17', '18', '19'], length: 10 },
        'IN': { prefixes: ['6', '7', '8', '9'], length: 10 },
        'PK': { prefixes: ['30', '31', '32', '33', '34', '35'], length: 10 },
        'LK': { prefixes: ['70', '71', '72', '75', '76', '77', '78'], length: 9 },
        'NP': { prefixes: ['97', '98'], length: 10 },
        'MY': { prefixes: ['10', '11', '12', '13', '14', '16', '17', '18', '19'], length: 9 },
        'ID': { prefixes: ['81', '82', '83', '85', '87', '88', '89'], length: 10 },
        'PH': { prefixes: ['9', '8'], length: 10 },
        'VN': { prefixes: ['3', '5', '7', '8', '9'], length: 9 },
        'TH': { prefixes: ['6', '8', '9'], length: 9 },
        'CN': { prefixes: ['13', '15', '17', '18', '19'], length: 11 },
        'JP': { prefixes: ['70', '80', '90'], length: 10 },
        'AU': { prefixes: ['4'], length: 9 },
        'NZ': { prefixes: ['21', '22', '27', '28'], length: 9 },
        'SG': { prefixes: ['8', '9'], length: 8 },
        'HK': { prefixes: ['5', '6', '9'], length: 8 },
        'TW': { prefixes: ['9'], length: 9 },
        'KR': { prefixes: ['10'], length: 10 }, // Corrected: 10 is the mobile prefix for KR

        // --- MIDDLE EAST & AFRICA ---
        'SA': { prefixes: ['50', '53', '54', '55', '56', '58', '59'], length: 9 },
        'AE': { prefixes: ['50', '52', '54', '55', '56', '58'], length: 9 },
        'QA': { prefixes: ['3', '5', '6', '7'], length: 8 },
        'KW': { prefixes: ['5', '6', '9'], length: 8 },
        'OM': { prefixes: ['7', '9'], length: 8 },
        'BH': { prefixes: ['3', '6'], length: 8 },
        'JO': { prefixes: ['77', '78', '79'], length: 9 },
        'EG': { prefixes: ['10', '11', '12', '15'], length: 10 },
        'TR': { prefixes: ['50', '53', '54', '55'], length: 10 },
        'NG': { prefixes: ['70', '80', '81', '90', '91'], length: 10 },
        'ZA': { prefixes: ['6', '7', '8'], length: 9 },
        'IL': { prefixes: ['50', '51', '52', '53', '54', '55', '58'], length: 9 },
        'MA': { prefixes: ['6', '7'], length: 9 },
        'DZ': { prefixes: ['5', '6', '7'], length: 9 },

        // --- EUROPE ---
        'GB': { prefixes: ['7'], length: 10 },
        'DE': { prefixes: ['15', '16', '17'], length: 11 },
        'FR': { prefixes: ['6', '7'], length: 9 },
        'IT': { prefixes: ['3'], length: 10 },
        'ES': { prefixes: ['6', '7'], length: 9 },
        'RU': { prefixes: ['9'], length: 10 },
        'PL': { prefixes: ['5', '6', '7', '8'], length: 9 },
        'NL': { prefixes: ['6'], length: 9 },
        'BE': { prefixes: ['4'], length: 9 },
        'CH': { prefixes: ['7'], length: 9 },
        'SE': { prefixes: ['7'], length: 9 },
        'NO': { prefixes: ['4', '9'], length: 8 },
        'DK': { prefixes: ['2', '3', '4', '5', '6', '7', '8', '9'], length: 8 },
        'FI': { prefixes: ['4', '5'], length: 9 },
        'IE': { prefixes: ['8'], length: 9 },
        'PT': { prefixes: ['9'], length: 9 },
        'GR': { prefixes: ['6'], length: 10 },
        'AT': { prefixes: ['6'], length: 10 },
        'HU': { prefixes: ['20', '30', '31', '70'], length: 9 },
        'RO': { prefixes: ['7'], length: 9 },
        'CZ': { prefixes: ['6', '7'], length: 9 },
        'AL': { prefixes: ['67', '68', '69'], length: 9 },

        // --- AMERICAS ---
        'US': { prefixes: ['2', '3', '4', '5', '6', '7', '8', '9'], length: 10 },
        'CA': { prefixes: ['2', '3', '4', '5', '6', '7', '8', '9'], length: 10 },
        'MX': { prefixes: ['1'], length: 10 },
        'BR': { prefixes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], length: 11 },
        'AR': { prefixes: ['9'], length: 10 },
        'CL': { prefixes: ['9'], length: 9 },
        'CO': { prefixes: ['3'], length: 10 },
        'PE': { prefixes: ['9'], length: 9 },

        // DEFAULT - Generic pattern for unlisted countries
        'DEFAULT': { prefixes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], length: 10 }
    };

    // --- Elements ---
    const countrySelect = document.getElementById('countrySelect');
    const prefixInput = document.getElementById('prefixInput');
    const quantityInput = document.getElementById('quantityInput');
    const generateBtn = document.getElementById('generateBtn');
    const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
    const resultCount = document.getElementById('resultCount');
    const validateBtn = document.getElementById('validateBtn');
    const exportBtn = document.getElementById('exportBtn');
    const fileUpload = document.getElementById('referenceFile');
    const referenceInput = document.getElementById('referenceInput');
    const fileInfo = document.getElementById('fileInfo');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const purposeSelect = document.getElementById('purposeSelect');
    const mainTitle = document.getElementById('mainTitle');
    const mainDesc = document.getElementById('mainDesc');
    const statsModal = document.getElementById('statsModal');
    const closeStats = document.getElementById('closeStats');
    const prefixList = document.getElementById('prefixList');
    const statTotal = document.getElementById('statTotal');
    const statDupes = document.getElementById('statDupes');
    const toggleAdvanced = document.getElementById('toggleAdvanced');
    const advancedOptions = document.getElementById('advancedOptions');
    let currentMode = 'general';

    // --- State ---
    let generatedNumbers = [];
    let currentFilter = 'all';
    let referencePattern = null;

    // --- Initialization ---
    populateCountries();

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateNumbers);
    validateBtn.addEventListener('click', validateNumbersStrict);
    exportBtn.addEventListener('click', exportToExcel);

    fileUpload.addEventListener('change', handleFileUpload);
    referenceInput.addEventListener('input', handleManualReference);

    toggleAdvanced.addEventListener('click', () => {
        toggleAdvanced.classList.toggle('active');
        advancedOptions.classList.toggle('collapsed');
    });
    closeStats.addEventListener('click', () => statsModal.classList.add('hidden'));
    window.addEventListener('click', (e) => { if (e.target === statsModal) statsModal.classList.add('hidden'); });

    purposeSelect.addEventListener('change', () => {
        currentMode = purposeSelect.value;
        if (currentMode === 'general') {
            mainTitle.textContent = 'Number Generator';
            mainDesc.textContent = 'Generate valid mobile numbers for any country.';
        } else if (currentMode === 'whatsapp') {
            mainTitle.textContent = 'WhatsApp Generator';
            mainDesc.textContent = 'Generate STRICTLY MOBILE numbers for WhatsApp.';
        } else if (currentMode === 'telegram') {
            mainTitle.textContent = 'Telegram Generator';
            mainDesc.textContent = 'Generate numbers optimized for Telegram.';
        } else if (currentMode === 'call') {
            mainTitle.textContent = 'Call Lead Generator';
            mainDesc.textContent = 'Generate Mobile & Landline numbers for calls.';
        } else if (currentMode === 'facebook') {
            mainTitle.textContent = 'Facebook Lead Generator';
            mainDesc.textContent = 'Generate social-ready mobile numbers.';
        }
        generatedNumbers = [];
        updateUI();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTable();
        });
    });

    // --- Functions ---

    function populateCountries() {
        countrySelect.innerHTML = '';
        const countries = [
            { code: 'AF', name: 'Afghanistan' }, { code: 'AL', name: 'Albania' }, { code: 'DZ', name: 'Algeria' },
            { code: 'AD', name: 'Andorra' }, { code: 'AO', name: 'Angola' }, { code: 'AR', name: 'Argentina' },
            { code: 'AM', name: 'Armenia' }, { code: 'AU', name: 'Australia' }, { code: 'AT', name: 'Austria' },
            { code: 'AZ', name: 'Azerbaijan' }, { code: 'BS', name: 'Bahamas' }, { code: 'BH', name: 'Bahrain' },
            { code: 'BD', name: 'Bangladesh' }, { code: 'BY', name: 'Belarus' }, { code: 'BE', name: 'Belgium' },
            { code: 'BZ', name: 'Belize' }, { code: 'BJ', name: 'Benin' }, { code: 'BT', name: 'Bhutan' },
            { code: 'BO', name: 'Bolivia' }, { code: 'BA', name: 'Bosnia' }, { code: 'BW', name: 'Botswana' },
            { code: 'BR', name: 'Brazil' }, { code: 'BN', name: 'Brunei' }, { code: 'BG', name: 'Bulgaria' },
            { code: 'BF', name: 'Burkina Faso' }, { code: 'BI', name: 'Burundi' }, { code: 'KH', name: 'Cambodia' },
            { code: 'CM', name: 'Cameroon' }, { code: 'CA', name: 'Canada' }, { code: 'CV', name: 'Cape Verde' },
            { code: 'CF', name: 'Central African Republic' }, { code: 'TD', name: 'Chad' }, { code: 'CL', name: 'Chile' },
            { code: 'CN', name: 'China' }, { code: 'CO', name: 'Colombia' }, { code: 'KM', name: 'Comoros' },
            { code: 'CG', name: 'Congo' }, { code: 'CR', name: 'Costa Rica' }, { code: 'HR', name: 'Croatia' },
            { code: 'CU', name: 'Cuba' }, { code: 'CY', name: 'Cyprus' }, { code: 'CZ', name: 'Czech Republic' },
            { code: 'DK', name: 'Denmark' }, { code: 'DJ', name: 'Djibouti' }, { code: 'DO', name: 'Dominican Republic' },
            { code: 'EC', name: 'Ecuador' }, { code: 'EG', name: 'Egypt' }, { code: 'SV', name: 'El Salvador' },
            { code: 'GQ', name: 'Equatorial Guinea' }, { code: 'ER', name: 'Eritrea' }, { code: 'EE', name: 'Estonia' },
            { code: 'ET', name: 'Ethiopia' }, { code: 'FJ', name: 'Fiji' }, { code: 'FI', name: 'Finland' },
            { code: 'FR', name: 'France' }, { code: 'GA', name: 'Gabon' }, { code: 'GM', name: 'Gambia' },
            { code: 'GE', name: 'Georgia' }, { code: 'DE', name: 'Germany' }, { code: 'GH', name: 'Ghana' },
            { code: 'GR', name: 'Greece' }, { code: 'GT', name: 'Guatemala' }, { code: 'GN', name: 'Guinea' },
            { code: 'GW', name: 'Guinea-Bissau' }, { code: 'GY', name: 'Guyana' }, { code: 'HT', name: 'Haiti' },
            { code: 'HN', name: 'Honduras' }, { code: 'HK', name: 'Hong Kong' }, { code: 'HU', name: 'Hungary' },
            { code: 'IS', name: 'Iceland' }, { code: 'IN', name: 'India' }, { code: 'ID', name: 'Indonesia' },
            { code: 'IR', name: 'Iran' }, { code: 'IQ', name: 'Iraq' }, { code: 'IE', name: 'Ireland' },
            { code: 'IL', name: 'Israel' }, { code: 'IT', name: 'Italy' }, { code: 'JM', name: 'Jamaica' },
            { code: 'JP', name: 'Japan' }, { code: 'JO', name: 'Jordan' }, { code: 'KZ', name: 'Kazakhstan' },
            { code: 'KE', name: 'Kenya' }, { code: 'KI', name: 'Kiribati' }, { code: 'KP', name: 'North Korea' },
            { code: 'KR', name: 'South Korea' }, { code: 'KW', name: 'Kuwait' }, { code: 'KG', name: 'Kyrgyzstan' },
            { code: 'LA', name: 'Laos' }, { code: 'LV', name: 'Latvia' }, { code: 'LB', name: 'Lebanon' },
            { code: 'LS', name: 'Lesotho' }, { code: 'LR', name: 'Liberia' }, { code: 'LY', name: 'Libya' },
            { code: 'LI', name: 'Liechtenstein' }, { code: 'LT', name: 'Lithuania' }, { code: 'LU', name: 'Luxembourg' },
            { code: 'MO', name: 'Macau' }, { code: 'MK', name: 'Macedonia' }, { code: 'MG', name: 'Madagascar' },
            { code: 'MW', name: 'Malawi' }, { code: 'MY', name: 'Malaysia' }, { code: 'MV', name: 'Maldives' },
            { code: 'ML', name: 'Mali' }, { code: 'MT', name: 'Malta' }, { code: 'MR', name: 'Mauritania' },
            { code: 'MU', name: 'Mauritius' }, { code: 'MX', name: 'Mexico' }, { code: 'MD', name: 'Moldova' },
            { code: 'MC', name: 'Monaco' }, { code: 'MN', name: 'Mongolia' }, { code: 'ME', name: 'Montenegro' },
            { code: 'MA', name: 'Morocco' }, { code: 'MZ', name: 'Mozambique' }, { code: 'MM', name: 'Myanmar' },
            { code: 'NA', name: 'Namibia' }, { code: 'NP', name: 'Nepal' }, { code: 'NL', name: 'Netherlands' },
            { code: 'NZ', name: 'New Zealand' }, { code: 'NI', name: 'Nicaragua' }, { code: 'NE', name: 'Niger' },
            { code: 'NG', name: 'Nigeria' }, { code: 'NO', name: 'Norway' }, { code: 'OM', name: 'Oman' },
            { code: 'PK', name: 'Pakistan' }, { code: 'PS', name: 'Palestine' }, { code: 'PA', name: 'Panama' },
            { code: 'PG', name: 'Papua New Guinea' }, { code: 'PY', name: 'Paraguay' }, { code: 'PE', name: 'Peru' },
            { code: 'PH', name: 'Philippines' }, { code: 'PL', name: 'Poland' }, { code: 'PT', name: 'Portugal' },
            { code: 'QA', name: 'Qatar' }, { code: 'RO', name: 'Romania' }, { code: 'RU', name: 'Russia' },
            { code: 'RW', name: 'Rwanda' }, { code: 'SA', name: 'Saudi Arabia' }, { code: 'SN', name: 'Senegal' },
            { code: 'RS', name: 'Serbia' }, { code: 'SC', name: 'Seychelles' }, { code: 'SL', name: 'Sierra Leone' },
            { code: 'SG', name: 'Singapore' }, { code: 'SK', name: 'Slovakia' }, { code: 'SI', name: 'Slovenia' },
            { code: 'SO', name: 'Somalia' }, { code: 'ZA', name: 'South Africa' }, { code: 'SS', name: 'South Sudan' },
            { code: 'ES', name: 'Spain' }, { code: 'LK', name: 'Sri Lanka' }, { code: 'SD', name: 'Sudan' },
            { code: 'SR', name: 'Suriname' }, { code: 'SZ', name: 'Swaziland' }, { code: 'SE', name: 'Sweden' },
            { code: 'CH', name: 'Switzerland' }, { code: 'SY', name: 'Syria' }, { code: 'TW', name: 'Taiwan' },
            { code: 'TJ', name: 'Tajikistan' }, { code: 'TZ', name: 'Tanzania' }, { code: 'TH', name: 'Thailand' },
            { code: 'TL', name: 'Timor-Leste' }, { code: 'TG', name: 'Togo' }, { code: 'TO', name: 'Tonga' },
            { code: 'TT', name: 'Trinidad and Tobago' }, { code: 'TN', name: 'Tunisia' }, { code: 'TR', name: 'Turkey' },
            { code: 'TM', name: 'Turkmenistan' }, { code: 'UG', name: 'Uganda' }, { code: 'UA', name: 'Ukraine' },
            { code: 'AE', name: 'UAE' }, { code: 'GB', name: 'United Kingdom' }, { code: 'US', name: 'United States' },
            { code: 'UY', name: 'Uruguay' }, { code: 'UZ', name: 'Uzbekistan' }, { code: 'VU', name: 'Vanuatu' },
            { code: 'VE', name: 'Venezuela' }, { code: 'VN', name: 'Vietnam' }, { code: 'YE', name: 'Yemen' },
            { code: 'ZM', name: 'Zambia' }, { code: 'ZW', name: 'Zimbabwe' }
        ];

        const fragment = document.createDocumentFragment();
        countries.forEach(c => {
            let dialCode = '';
            try {
                dialCode = '+' + libphonenumber.getCountryCallingCode(c.code);
            } catch (e) { }

            const option = document.createElement('option');
            option.value = c.code;
            option.textContent = `${c.name} (${dialCode})`;
            if (c.code === 'US') option.selected = true;
            fragment.appendChild(option);
        });
        countrySelect.appendChild(fragment);
    }

    function handleManualReference() {
        const val = referenceInput.value.trim();
        if (!val) {
            if (!fileUpload.files.length) {
                referencePattern = null;
                fileInfo.classList.add('hidden');
            }
            return;
        }

        const parts = val.split(',').map(p => p.trim()).filter(p => p.length > 0);
        const detectedPatterns = [];

        parts.forEach(part => {
            let cleanVal = part.replace(/[\s\-\(\)]/g, '');
            const match = cleanVal.match(/^(\+|\d)\d{7,15}$/);

            if (match) {
                let rawNum = cleanVal.replace(/^00/, '+');
                if (!rawNum.startsWith('+') && !part.startsWith('+')) {
                    if (rawNum.length > 10) rawNum = '+' + rawNum;
                } else if (part.startsWith('+') && !rawNum.startsWith('+')) {
                    rawNum = '+' + rawNum;
                }
                detectedPatterns.push({
                    fullExample: rawNum,
                    length: rawNum.length
                });
            }
        });

        if (detectedPatterns.length > 0) {
            referencePattern = detectedPatterns;
            fileInfo.innerHTML = `Reference: <strong>${detectedPatterns.length} patterns</strong> detected.<br>Locked for mixed generation.`;
            fileInfo.classList.remove('hidden');
            fileInfo.style.color = 'var(--success)';
        } else {
            referencePattern = null;
            fileInfo.innerHTML = `No valid reference numbers found.`;
            fileInfo.classList.remove('hidden');
            fileInfo.style.color = 'var(--danger)';
        }
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        fileInfo.textContent = `Analyzing: ${file.name}...`;
        fileInfo.classList.remove('hidden');

        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            const match = content.match(/(\+|00)?\d{8,15}/);

            if (match) {
                let rawNum = match[0].replace(/^00/, '+');
                if (!rawNum.startsWith('+')) rawNum = '+' + rawNum;

                referencePattern = {
                    fullExample: rawNum,
                    length: rawNum.length
                };

                fileInfo.innerHTML = `Reference: <strong>${rawNum}</strong> detected.<br>Pattern locked for generation.`;
                fileInfo.style.color = 'var(--success)';
                showToast('Reference pattern detected!');
            } else {
                fileInfo.innerHTML = `No valid number found in file.<br>Using Country Selection instead.`;
                fileInfo.style.color = 'var(--danger)';
                referencePattern = null;
            }
        };
        reader.readAsText(file);
    }

    async function generateNumbers() {
        const qty = parseInt(quantityInput.value);
        if (qty > 1000000) {
            showToast("Max limit is 1,000,000 numbers.");
            return;
        }

        generatedNumbers = [];
        generateBtn.disabled = true;
        const originalBtnHtml = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Generating...';

        await new Promise(resolve => setTimeout(resolve, 50));

        try {
            if (referencePattern) {
                await generateFromReferenceAsync(qty);
            } else {
                await generateFromLibPhoneNumber(qty);
            }

            updateUI();
            showToast(`${generatedNumbers.length} numbers generated successfully!`);
        } catch (err) {
            console.error(err);
            showToast("An error occurred during generation.");
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = originalBtnHtml;
        }
    }

    async function generateFromLibPhoneNumber(qty) {
        const countryCode = countrySelect.value;
        const customPrefix = prefixInput.value.trim();
        let dialCode = '';

        try {
            dialCode = '+' + libphonenumber.getCountryCallingCode(countryCode);
        } catch (e) {
            console.error("Error getting dial code:", e);
            showToast("Error getting country code. Using generic.");
            if (referencePattern) {
                await generateFromReferenceAsync(qty);
            }
            return;
        }

        const pattern = await getEffectivePattern(countryCode);
        const totalLength = pattern.length;

        if (customPrefix && /^\d+$/.test(customPrefix)) {
            await generateBatch(qty, { dialCode, length: totalLength, prefix: customPrefix });
            return;
        }

        await generateBatchWithRandomPrefixes(qty, { dialCode, length: totalLength, prefixes: pattern.prefixes });
    }

    async function getEffectivePattern(countryCode) {
        const mobileOnlyModes = ['whatsapp', 'telegram', 'facebook'];
        const targetType = mobileOnlyModes.includes(currentMode) ? 'MOBILE' : (currentMode === 'call' ? 'FIXED_LINE' : 'MOBILE');

        if (targetType === 'MOBILE' && MOBILE_PATTERNS[countryCode]) {
            return MOBILE_PATTERNS[countryCode];
        }

        try {
            const getExample = libphonenumber.getExampleNumber;
            if (typeof getExample === 'function') {
                const example = getExample(countryCode, targetType);
                if (example && example.nationalNumber) {
                    const nat = example.nationalNumber;
                    return {
                        prefixes: [nat.substring(0, 1), nat.substring(0, 2)],
                        length: nat.length,
                        type: targetType
                    };
                }
            }
        } catch (e) { }

        return MOBILE_PATTERNS[countryCode] || MOBILE_PATTERNS['DEFAULT'];
    }

    async function generateBatchWithRandomPrefixes(qty, params) {
        const { dialCode, length, prefixes } = params;
        const chunkSize = 2000;
        let currentAttempts = 0;
        const maxTotalAttempts = qty * 20;

        while (generatedNumbers.length < qty && currentAttempts < maxTotalAttempts) {
            const batchLimit = Math.min(chunkSize, qty - generatedNumbers.length);
            for (let i = 0; i < batchLimit && currentAttempts < maxTotalAttempts; i++) {
                currentAttempts++;
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const randomLen = length - prefix.length;

                let randomPart = '';
                while (randomPart.length < randomLen) {
                    const needed = randomLen - randomPart.length;
                    if (needed >= 4) {
                        randomPart += Math.floor(1000 + Math.random() * 9000).toString();
                    } else {
                        randomPart += Math.floor(Math.random() * 10).toString();
                    }
                }
                if (randomPart.length > randomLen) randomPart = randomPart.substring(0, randomLen);

                const fullNumber = `${dialCode}${prefix}${randomPart}`;

                let isValid = false;
                try {
                    const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                    isValid = parsed.isValid();
                } catch (e) { }

                if (isValid) {
                    generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
                } else {
                    i--;
                }
            }
            generateBtn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${generatedNumbers.length} / ${qty}`;
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    async function generateBatch(qty, params) {
        const { dialCode, length, prefix } = params;
        const chunkSize = 2000;
        let currentAttempts = 0;
        const maxTotalAttempts = qty * 20;

        while (generatedNumbers.length < qty && currentAttempts < maxTotalAttempts) {
            const batchLimit = Math.min(chunkSize, qty - generatedNumbers.length);
            for (let i = 0; i < batchLimit && currentAttempts < maxTotalAttempts; i++) {
                currentAttempts++;
                const randomLen = length - prefix.length;
                let randomPart = '';
                while (randomPart.length < randomLen) {
                    const needed = randomLen - randomPart.length;
                    if (needed >= 4) {
                        randomPart += Math.floor(1000 + Math.random() * 9000).toString();
                    } else {
                        randomPart += Math.floor(Math.random() * 10).toString();
                    }
                }
                if (randomPart.length > randomLen) randomPart = randomPart.substring(0, randomLen);

                const fullNumber = `${dialCode}${prefix}${randomPart}`;

                let isValid = false;
                try {
                    const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                    isValid = parsed.isValid();
                } catch (e) { }

                if (isValid) {
                    generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
                } else {
                    i--;
                }
            }
            generateBtn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${generatedNumbers.length} / ${qty}`;
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    async function generateFromReferenceAsync(qty) {
        const customPrefix = prefixInput.value.trim();
        const patterns = Array.isArray(referencePattern) ? referencePattern : [referencePattern];
        const chunkSize = 2000;
        let currentAttempts = 0;
        const maxTotalAttempts = qty * 20;

        while (generatedNumbers.length < qty && currentAttempts < maxTotalAttempts) {
            const batchLimit = Math.min(chunkSize, qty - generatedNumbers.length);
            for (let i = 0; i < batchLimit && currentAttempts < maxTotalAttempts; i++) {
                currentAttempts++;
                const currentPattern = patterns[generatedNumbers.length % patterns.length];
                const ex = currentPattern.fullExample;
                const length = currentPattern.length;

                let prefix, randomLen;
                if (customPrefix && /^\d+$/.test(customPrefix)) {
                    const dialCodeMatch = ex.match(/^(\+\d{1,4})/);
                    const dialCode = dialCodeMatch ? dialCodeMatch[1] : ex.substring(0, Math.min(length - 6, 4));
                    prefix = dialCode + customPrefix;
                    randomLen = length - prefix.length;
                } else {
                    const preserveLen = Math.min(length - 4, 5);
                    prefix = ex.substring(0, preserveLen);
                    randomLen = length - preserveLen;
                }

                let randomPart = '';
                while (randomPart.length < randomLen) {
                    const needed = randomLen - randomPart.length;
                    if (needed >= 4) {
                        randomPart += Math.floor(1000 + Math.random() * 9000).toString();
                    } else {
                        randomPart += Math.floor(Math.random() * 10).toString();
                    }
                }
                if (randomPart.length > randomLen) randomPart = randomPart.substring(0, randomLen);

                const fullNumber = `${prefix}${randomPart}`;

                let isValid = false;
                try {
                    const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                    isValid = parsed.isValid();
                } catch (e) { }

                if (isValid) {
                    generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
                } else {
                    i--;
                }
            }
            generateBtn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${generatedNumbers.length} / ${qty}`;
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    function createNumberObj(id, number, status = 'Generated') {
        return {
            id: id,
            number: number,
            status: status,
            isEven: parseInt(number.slice(-1)) % 2 === 0
        };
    }

    function validateNumbersStrict() {
        validateBtn.disabled = true;
        validateBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Checking Batch...';

        setTimeout(() => {
            const originalCount = generatedNumbers.length;

            // 1. Remove Duplicates
            const seen = new Set();
            const uniqueNumbers = [];
            generatedNumbers.forEach(item => {
                if (!seen.has(item.number)) {
                    seen.add(item.number);
                    uniqueNumbers.push(item);
                }
            });
            const duplicatesFound = originalCount - uniqueNumbers.length;
            generatedNumbers = uniqueNumbers;

            // 2. Calculate Prefix Stats
            const prefixStats = {};
            generatedNumbers.forEach(item => {
                // Heuristic: Extract the prefix (first 3 digits after dial code)
                // Or use libphonenumber to get national number and first 2 digits
                try {
                    const parsed = libphonenumber.parsePhoneNumber(item.number);
                    const nat = parsed.nationalNumber;
                    const dial = '+' + parsed.countryCallingCode;
                    // We'll group by DialCode + first 2-3 digits
                    const pref = dial + ' ' + nat.substring(0, 2);
                    prefixStats[pref] = (prefixStats[pref] || 0) + 1;
                } catch (e) {
                    const short = item.number.substring(0, 6);
                    prefixStats[short] = (prefixStats[short] || 0) + 1;
                }
            });

            // 3. Update Modal UI
            statTotal.textContent = generatedNumbers.length;
            statDupes.textContent = duplicatesFound;

            prefixList.innerHTML = '';
            Object.entries(prefixStats)
                .sort((a, b) => b[1] - a[1]) // Sort by count
                .forEach(([pref, count]) => {
                    const row = document.createElement('div');
                    row.className = 'prefix-row';
                    row.innerHTML = `
                        <span class="prefix-tag">${pref}...</span>
                        <span class="prefix-count">${count}</span>
                    `;
                    prefixList.appendChild(row);
                });

            // 4. Cleanup UI
            validateBtn.disabled = false;
            validateBtn.innerHTML = '<i class="ph ph-chart-pie"></i> Run Check';

            statsModal.classList.remove('hidden');
            updateUI();

            if (duplicatesFound > 0) {
                showToast(`Removed ${duplicatesFound} duplicate numbers.`);
            }
        }, 800);
    }

    function updateUI() {
        resultCount.textContent = generatedNumbers.length;
        if (generatedNumbers.length > 0) {
            validateBtn.disabled = false;
            exportBtn.disabled = false;
        }
        renderTable();
    }

    function renderTable() {
        resultsTable.innerHTML = '';
        let filtered = generatedNumbers;
        if (currentFilter === 'valid') {
            filtered = generatedNumbers.filter(n => n.status === 'Valid' || n.status === 'Generated');
        } else if (currentFilter === 'odd') {
            filtered = generatedNumbers.filter(n => !n.isEven);
        } else if (currentFilter === 'even') {
            filtered = generatedNumbers.filter(n => n.isEven);
        }

        const displayLimit = 500;
        const toDisplay = filtered.slice(0, displayLimit);

        if (toDisplay.length === 0) {
            resultsTable.innerHTML = `
                <tr class="empty-state">
                    <td colspan="4">
                        <div class="empty-content">
                            <i class="ph ph-ghost"></i>
                            <p>No matching numbers found.</p>
                        </div>
                    </td>
                </tr>`;
            return;
        }

        const fragment = document.createDocumentFragment();
        toDisplay.forEach(item => {
            const tr = document.createElement('tr');
            let statusClass = '';
            if (item.status === 'Valid' || item.status === 'Generated') statusClass = 'status-valid';
            if (item.status === 'Invalid') statusClass = 'status-invalid';
            const cleanNum = item.number.replace(/\D/g, '');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td style="font-family: monospace; font-size: 1.1em;">${item.number}</td>
                <td class="${statusClass}">${item.status}</td>
                <td class="action-cell">
                    <a href="https://api.whatsapp.com/send?phone=${cleanNum}" target="_blank" class="action-btn wa" title="Check WhatsApp">
                        <i class="ph ph-whatsapp-logo"></i>
                    </a>
                    <a href="https://t.me/+${cleanNum}" target="_blank" class="action-btn tg" title="Check Telegram">
                        <i class="ph ph-telegram-logo"></i>
                    </a>
                </td>
            `;
            fragment.appendChild(tr);
        });
        resultsTable.appendChild(fragment);
        if (filtered.length > displayLimit) {
            const infoRow = document.createElement('tr');
            infoRow.innerHTML = `<td colspan="4" style="text-align: center; color: var(--text-muted);">...and ${filtered.length - displayLimit} more (export to see all)</td>`;
            resultsTable.appendChild(infoRow);
        }
    }

    function exportToExcel() {
        if (generatedNumbers.length === 0) return;
        const date = new Date().toISOString().slice(0, 10);
        const filename = `Numbers_${date}.xlsx`;
        const data = generatedNumbers.map(n => ({
            ID: n.id,
            Number: n.number,
            Type: n.isEven ? 'Even' : 'Odd',
            Status: n.status,
            WhatsApp_Link: `https://wa.me/${n.number.replace(/\D/g, '')}`,
            Telegram_Link: `https://t.me/+${n.number.replace(/\D/g, '')}`
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Numbers");
        XLSX.writeFile(wb, filename);
        showToast("Export downloaded!");
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.remove('hidden');
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        toast.timeoutId = setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
});
