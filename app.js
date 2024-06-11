document.addEventListener('DOMContentLoaded', () => {
    const fermerForm = document.getElementById('fermerForm');
    
    if (fermerForm) {
        fermerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let carNumber = document.getElementById('carNumber').value;
            let farmerName = document.getElementById('farmerName').value;
            let type1 = document.getElementById('type1').value;
            let type2 = document.getElementById('type2').value;
            let type3 = document.getElementById('type3').value;
            let date = new Date().toISOString().split('T')[0];

            let template = {
                carNumber,
                farmerName,
                type1,
                type2,
                type3,
                date
            };

            saveTemplate(template);
        });
    }

    function saveTemplate(template) {
        // JSONBin API istifadə ediləcək
        let apiKey = 'YOUR_JSONBIN_API_KEY';
        let binId = 'YOUR_JSONBIN_BIN_ID';

        fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey
            },
            body: JSON.stringify(template)
        })
        .then(response => response.json())
        .then(data => {
            alert('Şablon yadda saxlanıldı');
        })
        .catch(error => console.error('Error:', error));
    }

    window.searchTemplates = function searchTemplates() {
        let searchDate = document.getElementById('searchDate').value;
        let apiKey = 'YOUR_JSONBIN_API_KEY';
        let binId = 'YOUR_JSONBIN_BIN_ID';

        fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            headers: {
                'X-Master-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            let templates = data.record;
            if (templates) {
                templates = templates.filter(template => template.date === searchDate);
                displayTemplates(templates);
            } else {
                console.error('Data format is not as expected.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function displayTemplates(templates) {
        let templatesList = document.getElementById('templatesList');
        templatesList.innerHTML = '';

        templates.forEach(template => {
            let templateDiv = document.createElement('div');
            templateDiv.classList.add('template');

            templateDiv.innerHTML = `
                <p>Maşın Nömrəsi: ${template.carNumber}</p>
                <p>Fermer Adı: ${template.farmerName}</p>
                <p>1-ci Növ (%): ${template.type1}</p>
                <p>2-ci Növ (%): ${template.type2}</p>
                <p>3-cü Növ (%): ${template.type3}</p>
            `;

            templatesList.appendChild(templateDiv);
        });
    }
});
