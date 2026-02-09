document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Patterns Database (Most Popular Operators Only) ---
    const MOBILE_PATTERNS = {
        // Bangladesh - Grameenphone (17), Robi (18), Banglalink (19), Airtel (16), Teletalk (13, 15)
        'BD': { prefixes: ['13', '15', '16', '17', '18', '19'], length: 10 },

        // India - Jio, Airtel, Vi (6, 7, 8, 9 series)
        'IN': { prefixes: ['62', '63', '70', '81', '82', '90', '91', '93', '95', '96', '97', '98', '99'], length: 10 },

        // Pakistan - Jazz (30, 31, 32, 33), Telenor (34), Zong (31), Ufone (33)
        'PK': { prefixes: ['300', '301', '302', '303', '304', '310', '311', '312', '320', '321', '330', '331', '333', '340', '341', '345'], length: 10 },

        // Sri Lanka - Dialog (77, 76), Mobitel (71, 70), Hutch (78)
        'LK': { prefixes: ['70', '71', '76', '77', '78'], length: 9 },

        // Nepal - Ncell (98), NTC (97)
        'NP': { prefixes: ['970', '971', '980', '981', '982', '984', '985'], length: 10 },

        // Saudi Arabia - STC (50, 53, 54, 55, 56, 58, 59), Mobily (50, 54, 56), Zain (50, 55, 58, 59)
        'SA': { prefixes: ['50', '53', '54', '55', '56', '58', '59'], length: 9 },

        // UAE - Etisalat (50, 52, 54, 56), du (55, 56, 58)
        'AE': { prefixes: ['50', '52', '54', '55', '56', '58'], length: 9 },

        // Qatar - Ooredoo (3, 5, 6), Vodafone (3, 5, 6, 7)
        'QA': { prefixes: ['3', '5', '6', '7'], length: 8 },

        // Kuwait - Zain (5, 9), Ooredoo (5, 6), Viva (5, 6)
        'KW': { prefixes: ['5', '6', '9'], length: 8 },

        // United Kingdom - All networks (7)
        'GB': { prefixes: ['7'], length: 10 },

        // Germany - Telekom (15, 16, 17), Vodafone (15, 16, 17), O2 (15, 16, 17)
        'DE': { prefixes: ['150', '151', '160', '170', '171', '175'], length: 11 },

        // France - Orange (6, 7), SFR (6, 7), Bouygues (6, 7)
        'FR': { prefixes: ['6', '7'], length: 9 },

        // Italy - TIM (3), Vodafone (3), Wind Tre (3)
        'IT': { prefixes: ['32', '33', '34', '35', '36', '38', '39'], length: 10 },

        // Spain - Movistar (6, 7), Vodafone (6, 7), Orange (6, 7)
        'ES': { prefixes: ['6', '7'], length: 9 },

        // United States - Major area codes
        'US': { prefixes: ['201', '202', '212', '213', '214', '267', '305', '310', '312', '323', '404', '415', '469', '510', '512', '562', '619', '626', '646', '702', '703', '714', '718', '720', '773', '786', '813', '818', '917'], length: 10 },

        // Canada - Major area codes
        'CA': { prefixes: ['204', '226', '289', '403', '416', '418', '438', '450', '514', '604', '647', '705', '778', '780', '819', '902', '905'], length: 10 },

        // Mexico - Telcel (1)
        'MX': { prefixes: ['1'], length: 10 },

        // Brazil - São Paulo (11), Rio (21), Major cities
        'BR': { prefixes: ['11', '12', '13', '14', '15', '21', '22', '31', '41', '47', '48', '51', '61', '71', '81', '85'], length: 11 },

        // China - China Mobile (13, 15, 18), China Unicom (13, 15, 17), China Telecom (13, 18)
        'CN': { prefixes: ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '170', '186', '187', '188', '189'], length: 11 },

        // Japan - NTT DoCoMo (70, 80, 90), au (80, 90), SoftBank (70, 80, 90)
        'JP': { prefixes: ['70', '80', '90'], length: 10 },

        // Australia - Telstra (4), Optus (4), Vodafone (4)
        'AU': { prefixes: ['4'], length: 9 },

        // Nigeria - MTN (70, 80, 90), Glo (70, 80, 90), Airtel (70, 80, 90), 9mobile (90, 91)
        'NG': { prefixes: ['70', '80', '81', '90', '91'], length: 10 },

        // South Africa - Vodacom (60-68, 71, 72, 82, 83), MTN (71, 76, 78, 81, 82, 83), Cell C (74, 84)
        'ZA': { prefixes: ['60', '63', '64', '65', '71', '72', '74', '76', '78', '81', '82', '83', '84'], length: 9 },

        // Egypt - Vodafone (10, 11, 12), Orange (10, 11, 12), Etisalat (11, 15), WE (15)
        'EG': { prefixes: ['10', '11', '12', '15'], length: 10 },

        // Turkey - Turkcell (53, 54), Vodafone (54, 55), Turk Telekom (50)
        'TR': { prefixes: ['50', '53', '54', '55'], length: 10 },

        // Russia - MTS (91, 98), MegaFon (92, 93), Beeline (90, 96), Tele2 (95, 99)
        'RU': { prefixes: ['900', '901', '902', '903', '905', '910', '915', '916', '917', '918', '919', '920', '922', '925', '926', '928', '929'], length: 10 },

        // Thailand - AIS (6, 8, 9), dtac (8, 9), TrueMove (6, 8, 9)
        'TH': { prefixes: ['6', '8', '9'], length: 9 },

        // Malaysia - Maxis (11, 12, 13, 14, 17, 18, 19), Celcom (10, 11, 13, 14, 19), Digi (10, 11, 14, 16, 17, 18)
        'MY': { prefixes: ['10', '11', '12', '13', '14', '16', '17', '18', '19'], length: 9 },

        // Indonesia - Telkomsel (811, 812, 813, 821, 822, 823, 852), Indosat (814, 815, 816, 855, 856, 857, 858), XL (817, 818, 819, 859, 877, 878)
        'ID': { prefixes: ['811', '812', '813', '821', '822', '852', '853', '855', '856'], length: 10 },

        // Philippines - Smart (90, 91, 92, 93, 94, 98, 99), Globe (90, 91, 92, 93, 94, 95, 96, 97), Sun (92, 93)
        'PH': { prefixes: ['900', '905', '906', '915', '916', '917', '926', '927', '935', '936', '945', '955', '965', '975', '995', '996', '997'], length: 10 },

        // Vietnam - Viettel (32, 33, 34, 35, 36, 37, 38, 39), Vinaphone (81, 82, 83, 84, 85), MobiFone (70, 76, 77, 78, 79, 89, 90, 93)
        'VN': { prefixes: ['32', '33', '34', '35', '36', '37', '38', '39', '70', '76', '77', '78', '79', '81', '82', '83', '84', '85', '89', '90', '93'], length: 9 },

        // Poland - Orange (50, 51, 53, 57, 60, 66, 69, 78, 88), Play (50, 51, 53, 73, 78, 79, 88), Plus (60, 66, 69, 78, 79, 88), T-Mobile (72, 73, 78, 79, 88)
        'PL': { prefixes: ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'], length: 9 },

        // DEFAULT - Generic pattern for unlisted countries
        'DEFAULT': { prefixes: ['5', '6', '7', '8', '9'], length: 10 }
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
    const fileInfo = document.getElementById('fileInfo');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- State ---
    let generatedNumbers = [];
    let currentFilter = 'all';
    let referencePattern = null;

    // --- LibPhoneNumber Instance ---
    // The library is loaded globally as 'libphonenumber'
    // We will use it to populate countries and generate examples.

    // --- Initialization ---
    populateCountries();

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateNumbers);
    validateBtn.addEventListener('click', validateNumbersStrict);
    exportBtn.addEventListener('click', exportToExcel);

    fileUpload.addEventListener('change', handleFileUpload);

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

        // Comprehensive list of all countries (A-Z)
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

        // Already sorted A-Z by name
        const fragment = document.createDocumentFragment();
        countries.forEach(c => {
            // Get dial code using libphonenumber if possible, else just show name
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

    function generateNumbers() {
        const qty = parseInt(quantityInput.value);
        if (qty > 1000000) {
            showToast("Max limit is 1,000,000 numbers.");
            return;
        }

        generatedNumbers = [];
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Generating...';

        setTimeout(async () => {
            if (referencePattern) {
                generateFromReference(qty);
            } else {
                await generateFromLibPhoneNumber(qty);
            }

            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="ph ph-lightning"></i> Generate Numbers';

            updateUI();
            showToast(`${qty} numbers generated successfully!`);
        }, 100);
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
            generateFromReference(qty);
            return;
        }

        // Get the pattern for this country from MOBILE_PATTERNS
        const pattern = MOBILE_PATTERNS[countryCode] || MOBILE_PATTERNS['DEFAULT'];
        const totalLength = pattern.length;

        // If user provided a custom prefix, use it directly
        if (customPrefix && /^\d+$/.test(customPrefix)) {
            generateBatch(qty, { dialCode, length: totalLength, prefix: customPrefix });
            return;
        }

        // No custom prefix - use MOBILE_PATTERNS database to select random valid prefixes
        // Generate numbers using random prefixes from the pattern database
        generateBatchWithRandomPrefixes(qty, { dialCode, length: totalLength, prefixes: pattern.prefixes });
    }

    function generateBatchWithRandomPrefixes(qty, params) {
        const { dialCode, length, prefixes } = params;

        let attempts = 0;
        const maxAttempts = qty * 10; // Safety limit to prevent infinite loops

        while (generatedNumbers.length < qty && attempts < maxAttempts) {
            attempts++;

            // Randomly select a prefix from the available prefixes
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const randomLen = length - prefix.length;

            // Generate random number
            let randomPart = '';
            for (let j = 0; j < randomLen; j++) {
                randomPart += Math.floor(Math.random() * 10);
            }
            const fullNumber = `${dialCode}${prefix}${randomPart}`;

            // Validate immediately
            let isValid = false;
            try {
                const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                isValid = parsed.isValid();
            } catch (e) {
                isValid = false;
            }

            // Only add if valid
            if (isValid) {
                generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
            }
        }

        if (generatedNumbers.length < qty) {
            showToast(`Generated ${generatedNumbers.length} valid numbers (some patterns failed validation)`);
        }
    }

    function generateBatch(qty, params) {
        const { dialCode, length, prefix } = params;
        const randomLen = length - prefix.length;

        let attempts = 0;
        const maxAttempts = qty * 10; // Safety limit to prevent infinite loops

        while (generatedNumbers.length < qty && attempts < maxAttempts) {
            attempts++;

            // Generate random number
            let randomPart = '';
            for (let j = 0; j < randomLen; j++) {
                randomPart += Math.floor(Math.random() * 10);
            }
            const fullNumber = `${dialCode}${prefix}${randomPart}`;

            // Validate immediately
            let isValid = false;
            try {
                const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                isValid = parsed.isValid();
            } catch (e) {
                isValid = false;
            }

            // Only add if valid
            if (isValid) {
                generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
            }
        }

        if (generatedNumbers.length < qty) {
            showToast(`Generated ${generatedNumbers.length} valid numbers (some patterns failed validation)`);
        }
    }

    function generateFromReference(qty) {
        // Check if user provided a custom prefix
        const customPrefix = prefixInput.value.trim();

        // Simple logic: Keep the first few digits (country code + maybe area code) 
        // and randomize the last 5-7 digits.
        const ex = referencePattern.fullExample;
        const length = ex.length;

        let prefix, randomLen;

        // If custom prefix is provided, extract dial code and use custom prefix
        if (customPrefix && /^\d+$/.test(customPrefix)) {
            // Extract dial code from reference (e.g., +880 from +8801712345678)
            const dialCodeMatch = ex.match(/^(\+\d{1,4})/);
            const dialCode = dialCodeMatch ? dialCodeMatch[1] : ex.substring(0, Math.min(length - 6, 5));
            prefix = dialCode + customPrefix;
            randomLen = length - prefix.length;
        } else {
            // Traditional approach: Preservation heuristic: Keep first 4-5 chars (e.g. +121, +447)
            const preserveLen = Math.min(length - 6, 5);
            prefix = ex.substring(0, preserveLen);
            randomLen = length - preserveLen;
        }

        let attempts = 0;
        const maxAttempts = qty * 10;

        while (generatedNumbers.length < qty && attempts < maxAttempts) {
            attempts++;

            let randomPart = '';
            for (let j = 0; j < randomLen; j++) {
                randomPart += Math.floor(Math.random() * 10);
            }
            const fullNumber = `${prefix}${randomPart}`;

            // Validate
            let isValid = false;
            try {
                const parsed = libphonenumber.parsePhoneNumber(fullNumber);
                isValid = parsed.isValid();
            } catch (e) {
                isValid = false;
            }

            if (isValid) {
                generatedNumbers.push(createNumberObj(generatedNumbers.length + 1, fullNumber, 'Valid'));
            }
        }

        if (generatedNumbers.length < qty) {
            showToast(`Generated ${generatedNumbers.length} valid numbers from reference pattern`);
        }
    }

    function createNumberObj(id, number, status = 'Valid') {
        return {
            id: id,
            number: number,
            status: status,
            isEven: parseInt(number.slice(-1)) % 2 === 0
        };
    }

    function validateNumbersStrict() {
        validateBtn.disabled = true;
        validateBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Validating Format...';

        setTimeout(() => {
            let validCount = 0;
            generatedNumbers.forEach(item => {
                // strict check using libphonenumber
                let isValid = false;
                try {
                    const parsed = libphonenumber.parsePhoneNumber(item.number);
                    isValid = parsed.isValid(); // Checks length, prefix, etc.
                } catch (e) {
                    isValid = false;
                }

                item.status = isValid ? 'Valid' : 'Invalid';
                if (isValid) validCount++;
            });

            validateBtn.disabled = false;
            validateBtn.innerHTML = '<i class="ph ph-check-circle"></i> Check Validity';

            // Auto-switch to 'valid' filter
            currentFilter = 'valid';
            filterBtns.forEach(b => b.classList.remove('active'));
            const validBtn = Array.from(filterBtns).find(b => b.dataset.filter === 'valid');
            if (validBtn) validBtn.classList.add('active');

            renderTable();
            showToast(`Strict Validation: ${validCount} valid numbers found.`);
        }, 1000);
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
            filtered = generatedNumbers.filter(n => n.status === 'Valid');
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
            if (item.status === 'Valid') statusClass = 'status-valid';
            if (item.status === 'Invalid') statusClass = 'status-invalid';

            // Clean number for links (remove + for wa.me sometimes, but usually required. WA needs pure digits)
            const cleanNum = item.number.replace(/\D/g, '');

            tr.innerHTML = `
                <td>${item.id}</td>
                <td style="font-family: monospace; font-size: 1.1em;">${item.number}</td>
                <td class="${statusClass}">${item.status}</td>
                <td class="action-cell">
                    <a href="https://wa.me/${cleanNum}" target="_blank" class="action-btn wa" title="Check WhatsApp">
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
