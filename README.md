# JAVA-events
// Data des événements (Facile à mettre à jour au fil des mois)
const eventsData = {
    title: "Les rendez-vous de septembre",
    events: [
        {
            date: "9 sept. 2026",
            title: "Messe de rentrée",
            location: "SICHEM - 21, bd Alexandre Martin - ORLEANS",
            description: "Célébrée par notre aumônier <strong>Fr. Jean-Syméon</strong>, à qui vous pouvez <strong>confier vos intentions</strong> par message privé.<br>Pensez à <strong>prévoir de la monnaie</strong>, si vous souhaitez contribuer à la <strong>quête</strong>.",
            flyer: null
        },
        {
            date: "16 sept. 2026",
            title: "Dîner de rentrée",
            location: "SICHEM - 21, bd Alexandre Martin - ORLEANS",
            description: "",
            flyer: null
        },
        {
            date: "23 sept. 2026",
            title: "Prière",
            location: "SICHEM - 21, bd Alexandre Martin - ORLEANS",
            description: "Prions avec notre saint patron <strong>St Pier Giorgio Frassati</strong>",
            flyer: null
        },
        {
            date: "30 septembre 2026",
            title: "Enseignement",
            location: "SICHEM - 21, bd Alexandre Martin - ORLEANS",
            description: "<strong>Magnifica Humanitas :</strong> L'encyclique du pape Léon XIV expliquée par le Fr. Jean-Syméon.",
            flyer: null
        },
        {
            date: "10 & 11 octobre 2026",
            title: "30 ans de JAVA",
            location: "Château de Charbonnière",
            description: "",
            flyer: "https://drive.google.com/thumbnail?id=1kwl5gcMKFJgSsuJD_RMgsTfYGE-HkZT1&sz=w1920"
        }
    ]
};

// Injection automatique dans la page au chargement
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mise à jour automatique du BADGE sur le calendrier dans la navbar
    const badgeEl = document.querySelector('#calendar-trigger .badge');
    if (badgeEl) {
        badgeEl.textContent = eventsData.events.length; // Compte auto du nombre d'événements
    }

    // 2. Génération dynamique du HTML de la modale
    let eventsHTML = eventsData.events.map(event => `
        <div class="event-item">
            <div class="event-left">
                <span class="event-badge">${event.date}</span>
                <h3>${event.title}</h3>
                <p>${event.location}</p>
                ${event.description ? `<p>${event.description}</p>` : ''}
            </div>
            ${event.flyer ? `<button class="btn-more" data-flyer="${event.flyer}">En savoir plus</button>` : ''}
        </div>
    `).join('');

    const modalHTML = `
        <div id="events-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${eventsData.title}</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <hr>
                ${eventsHTML}
            </div>
            <div id="flyer-viewer" class="flyer-viewer" style="display: none;">
                <span class="close-flyer">&times;</span>
                <img id="flyer-display" src="" alt="Flyer">
            </div>
        </div>
    `;

    // Ajout de la modale au bas du <body>
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 3. Gestion des interactions / événements (Ouverture, Fermeture, Flyer)
    const trigger = document.getElementById('calendar-trigger');
    const modal = document.getElementById('events-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const menuToggle = document.getElementById('menu-toggle');

    if (trigger && modal) {
        // Ouverture
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            if (menuToggle && menuToggle.checked) menuToggle.checked = false; // Ferme le menu mobile si ouvert
        });

        // Fermeture via la croix
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Fermeture au clic à l'extérieur
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Gestion de la visionneuse de Flyer
    const flyerViewer = document.getElementById('flyer-viewer');
    const flyerImage = document.getElementById('flyer-display');
    const closeFlyer = modal.querySelector('.close-flyer');
    const btnsMore = modal.querySelectorAll('.btn-more');

    btnsMore.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = btn.getAttribute('data-flyer');
            flyerImage.src = url;
            flyerViewer.style.display = 'flex';
        });
    });

    closeFlyer.addEventListener('click', () => {
        flyerViewer.style.display = 'none';
    });

    flyerViewer.addEventListener('click', (e) => {
        if (e.target === flyerViewer) {
            flyerViewer.style.display = 'none';
        }
    });
});