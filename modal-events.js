// Data des événements (Facile à mettre à jour au fil des mois)
const css = `
.modal-overlay { display: none; position: fixed; ... }
.modal-overlay.active { display: flex; }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            color: #333;
            background-color: #fff;
            overflow-x: hidden;
        }

       /* --- 1. BARRE DE NAVIGATION (Transparente sur l'image) --- */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 8%;
            box-sizing: border-box;
            -webkit-backdrop-filter: blur(5px); /* Correction pour Apple / Safari */
            backdrop-filter: blur(5px);
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            z-index: 20000 !important; 
            background: linear-gradient(to bottom, #5b7486, transparent);
        }

        .navbar.hidden {
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
        }

        .nav-logo img {
            height: 25px;
            width: auto;
            transition: transform 0.3s ease;
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 25px;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .dropdown-trigger {
            background: none;
            border: none;
            color: white;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1px;
            cursor: pointer;
            padding: 0;
            font-family: 'Roboto', sans-serif;
        }

        /* --- SYSTEME DE MENU DEROULANT --- */
        .dropdown {
            position: relative;
            display: inline-block;
        }

        .arrow {
            font-size: 10px;
            margin-left: 5px;
            vertical-align: middle;
        }

        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #4a5568;
            min-width: 200px;
            box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
            z-index: 2000;
            border-radius: 4px;
            overflow: hidden;
        }

        .dropdown-menu a {
            color: white;
            font-variant: small-caps;
            text-align: justify;
            text-align-last: center; /* Pour centrer le texte justifié */
            padding: 12px 20px;
            text-decoration: none;
            display: block;
            text-transform: none;
            font-weight: normal;
            font-size: 14px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: background-color 0.2s ease;
        }

        .dropdown-menu a:last-child { border-bottom: none; }
        .dropdown-menu a:hover { background-color: rgba(255, 255, 255, 0.15); }
        .dropdown:hover .dropdown-menu { display: block; }


        /* --- MODAL --- */
        /* Badge rouge */
.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ef7709;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: bold;
}

.modal-overlay {
    position: fixed; /* Fixe l'élément au viewport */
    top: 0;
    left: 0;
    width: 100vw;    /* 100% de la largeur de la fenêtre */
    height: 100vh;   /* 100% de la hauteur de la fenêtre (Viewport Height) */
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    padding-bottom : 50px;
}

.modal-overlay.active {
    z-index: 9999;
    opacity: 1;
    pointer-events: all;
}

.modal-content {
    background: white;
    width: 80%; 
    max-width: 600px;
    max-height: 80vh; /* Limite la hauteur à 80% de l'écran */
    overflow-y: auto;  /* Ajoute une barre de défilement verticale si le contenu dépasse */
    padding: 40px;
    border-radius: 8px;
    position: relative;
    pointer-events: auto;
}

.close-modal { 
    font-size: 2rem; 
    cursor: pointer; 
    line-height: 1;
}

.modal-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    font-family: 'Oswald', sans-serif;
    color: #5b7486;
    font-size: 35px;
    font-weight: 700;
}
.modal-header h2 { 
    font-family: 'Oswald', sans-serif; font-weight: bold; font-size: 35px; color: #5b7486;}

.event-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; /* Aligne le texte et le bouton verticalement */
    padding: 30px 0; 
    border-bottom: 1px solid #eee; 
    gap: 15px; /* Ajoute un espace entre le texte et le bouton */
}

.event-left {
    flex: 1; /* Le texte prend tout l'espace disponible à gauche */
}
.event-badge { 
    background: #ef7709; color: white; padding: 5px 10px; 
    font-size: 0.8rem; display: inline-block; margin-bottom: 10px; 
}

.event-item h3 { margin: 0; font-family: 'Oswald', sans-serif; font-weight: bold; font-size: 20px; color: #5b7486;}
.event-item p { font-style: italic; color: #555; margin-top: 5px; }



.btn-more { 
    flex-shrink: 0; /* Empêche le bouton de rétrécir */
    width: 110px;   /* Définit une largeur fixe identique pour tous */
    padding: 10px 5px; 
    background: #5b7486; 
    color: #fff; 
    border: none;
    border-radius: 4px;
    cursor: pointer; 
    text-align: center;
    font-size: 13px;
    line-height: 1.2;
}

.btn-more:hover {
    background: #465a69;
}

.close-modal { font-size: 2rem; cursor: pointer; }

.flyer-viewer {
    position: fixed; /* Fixe pour couvrir tout l'écran */
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(91, 116, 134, 0.95); /* Bleu du site avec transparence */
    display: flex;
    justify-content: center;
    align-items: center;
}

.flyer-viewer img {
    max-width: 85%;
    max-height: 85%;
    border: 3px solid white;
}

.close-flyer {
    position: absolute;
    top: 20px; right: 20px;
    color: white; font-size: 40px; cursor: pointer;
}

        /* --- HERO SECTION --- */
        .hero {
            position: relative;
            height: 75vh;
            min-height: 500px;
            background-image: linear-gradient(135deg, rgba(40, 53, 64, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%), url('https://drive.google.com/thumbnail?id=181h6-KHwMSMnlW27iIc0bdYYu04iWTw_&sz=w1920');
            background-size: cover;
            background-position: center 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: 8%;
            color: white;
        }

        .hero h1 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 80px;
            text-transform: uppercase;
            line-height: 1.1;
            margin: 0;
            letter-spacing: -2px;
        }

        .hero-subtitle {
            font-size: 18px;
            max-width: 800px;
            margin-top: 30px;
        }

                /* --- SYSTEME DE MENU DEROULANT --- */

/* Conteneur du dropdown */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Style de la petite flèche (optionnel) */
.arrow {
    font-size: 10px;
    margin-left: 5px;
    vertical-align: middle;
}

/* Le menu en lui-même (caché par défaut) */
.dropdown-menu {
    display: none; /* Cache le menu */
    position: absolute;
    top: 100%; /* Se place juste en dessous du texte parent */
    left: 0;
    background-color: #4a5568; 
    min-width: 200px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
    z-index: 2000; /* Passe au-dessus du Hero et de tout le reste */
    border-radius: 4px;
    margin-top: 0px; /* supprimé car perte de lien de la souris */
    overflow: hidden;
}

/* Style des liens à l'intérieur du menu déroulant */
.dropdown-menu a {
    color: white;
    padding: 12px 20px;
    text-decoration: none;
    display: block;
    text-transform: none; /* Garde le texte en minuscule/majuscule normal */
    font-weight: normal;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Ligne de séparation subtile */
    transition: background-color 0.2s ease;
}

/* Supprime la bordure sur le dernier élément */
.dropdown-menu a:last-child {
    border-bottom: none;
}

/* Effet au survol des liens du menu interne */
.dropdown-menu a:hover {
    background-color: rgba(255, 255, 255, 0.15); /* Légère surbrillance */
}

/* ACTION : Afficher le menu au survol de la souris */
.dropdown:hover .dropdown-menu {
    display: block;
}

/* --- CONTENEUR PRINCIPAL --- */
        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0px 20px;
        }

        .section-title {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            font-size: 32px;
            text-transform: uppercase;
            margin-bottom: 10px;
            border-bottom: 2px solid #5b7486;
            padding-bottom: 8px;
            display: inline-block;
        }

        .section-subtitle {
            color: #666;
            font-size: 15px;
            margin-bottom: 30px;
        }

        /* --- SECTION NOUTÉ : MESSE & ADORATION (2 COLONNES) --- */
        .new-feature-section {
            background: #fdfdfd;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 60px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .two-columns {
            display: flex;
            gap: 40px;
            align-items: center;
        }

        .col-text {
            flex: 1.2;
            text-align: justify;
        }

        .col-text h3 {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            font-size: 28px;
            margin-top: 10px;
            margin-bottom: 15px;
        }

        .badge-new {
            background-color: #ef7709;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .info-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }

        .info-list li {
            position: relative;
            padding-left: 25px;
            margin-bottom: 10px;
            font-size: 15px;
        }

        .info-list li::before {
            content: "➔";
            color: #ef7709;
            position: absolute;
            left: 0;
            font-weight: bold;
        }

        .col-visual {
            flex: 0.8;
            text-align: center;
        }

        .col-visual img {
            height: 100%;
            max-width: 275px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
        }

        .col-visual img:hover {
            transform: scale(1.05);
        }

        /* --- SECTION ACTIVITÉS EN ATTENTE (PAUSE / ÉTINCELLE) --- */
        .standby-section {
            background-color: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 16px;
            padding: 40px;
            margin-top: -150px;
            margin-bottom: 60px;
        }
        

        .standby-header {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 40px auto;
        }

        .standby-header h3 {
            font-family: 'Oswald', sans-serif;
            color: #475569;
            font-size: 26px;
            margin-bottom: 10px;
        }

        .standby-header p {
            color: #64748b;
            font-size: 15px;
            line-height: 1.6;
        }

        .spark-badge {
            display: inline-block;
            background-color: #fef3c7;
            color: #d97706;
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 15px;
        }

        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            text-align: justify;
        }

        .standby-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            border: 1px solid #e2e8f0;
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }

        .standby-icon {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            background: #5b7486;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .standby-icon img {
            width: 35px;
            height: 35px;
            object-fit: contain;
        }

        .standby-content h4 {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            font-size: 20px;
            margin: 0 0 8px 0;
        }

        .standby-content p {
            font-size: 14px;
            color: #555;
            margin: 0 0 12px 0;
            line-height: 1.4;
        }

        .quote {
            font-style: italic;
            color: #777;
            font-size: 13px;
            display: block;
            margin-bottom: 10px;
        }

        /* --- SECTION PROPOSITIONS --- */
        .calendar-overlap {
            position: relative;
            max-width: 900px;
            margin: -30px auto 10px;
            background: white;
            padding: 40px;
            border-radius: 15px;
            z-index: 10;
            }

        .calendar-title {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            font-size: 28px;
            margin: 0;
        }

        .propositions-container {
            background: #ffffff;
            padding: 0px 40px 8%;
            margin-bottom: 0px;
            width: 100%;
            box-sizing: border-box;
        }

        /* GRILLE DE CARTES */
        .prop-grid-cards {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;         /* Autorise le passage à la ligne */
            gap: 25px;
            max-width: 800px;        /* Limite la largeur pour forcer le 2+1 */
            margin: 0 auto;          /* Centre le bloc complet dans la page */
            transition: all 0.4s ease;
        }

        .prop-card {
            background: #f8f9fa;
            border-radius: 16px;
            display: flex;
            width: 340px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .prop-card:hover { transform: translateY(-5px); }

        /* ICON WRAPPER (Petit mode) */
        .prop-icon-wrapper {
            width: 90px;
            background-color: #5a6f80;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .prop-icon-wrapper img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        /* MODE SELECTIONNÉ (Agrandissement à gauche) */
        .propositions-container.active-mode .prop-grid-cards {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 30px;
        }

        .prop-card.selected {
            grid-column: 1;
            width: 100%;
            flex-direction: column;
            cursor: default;
        }

        /* FIX : LE BANDEAU IMAGE SÉLECTIONNÉ */
        .prop-card.selected .prop-icon-wrapper {
            width: 100% !important;
            height: 180px !important; /* Hauteur fixe pour le bandeau */
            display: block !important;
            overflow: hidden !important;
        }

        /* FIX : L'IMAGE DANS LE BANDEAU (Anti-zoom) */
        .prop-card.selected .prop-icon-wrapper img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important; /* Affiche l'image entière sans zoomer */
            object-position: center !important;
            padding: 15px; /* Espace autour de l'icône */
            box-sizing: border-box;
        }

        .prop-card-body {
            padding: 20px;
            flex: 1;
            text-align: justify;
        }

        .prop-card-body h3 {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            margin: 0 0 10px 0;
        }

        .full-text { display: none; margin-top: 15px; }
        .prop-card.selected .full-text { display: block; }

        .btn-toggle {
            display: inline-block;
            margin-top: 10px;
            font-weight: bold;
            color: #111;
            text-decoration: underline;
        }



        /* LISTE LATÉRALE */
        .side-list { display: flex; flex-direction: column; gap: 15px; }
        .side-list .prop-card { width: 100%; transform: scale(0.95); opacity: 0.8; }

        .custom-list { list-style: none; padding: 0; }
        .custom-list li { position: relative; padding-left: 25px; margin-bottom: 8px; }
        .custom-list li::before { content: "⁃"; color: #5b7486; position: absolute; left: 10px; font-weight: bold;  }

/*Separator*/
hr.elegant {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(91, 116, 134, 0), rgba(91, 116, 134, 0.75), rgba(91, 116, 134, 0));
    margin: 20px 0;
    }

       /* Footer */
.footer {
    background-color: #5b7486;
    color: white;
    padding: 60px 8%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

/* Titre CONTACT : Aligné à gauche par défaut */
.label-contact { 
    font-family: 'Oswald', sans-serif; 
    text-transform: uppercase; 
    font-size: 22px; 
    letter-spacing: 4px; 
    font-weight: 700; 
    display: block;
    text-align: left; /* Aligné à gauche comme demandé */
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 15px;
}

/* Grille des 3 colonnes */
.footer-grid {
    display: flex;
    justify-content: center; /* Centre les colonnes horizontalement */
    align-items: stretch;    /* Aligne la hauteur des colonnes */
    gap: 40px;               /* Espace constant entre les colonnes */
}

/* Colonnes identiques et centrées */
.footer-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;     /* Centre le contenu à l'intérieur de chaque colonne */
    text-align: center;      /* Centre le texte pour chaque colonne */
}

/* On force l'alignement à gauche uniquement pour l'adresse si vous préférez */
.footer-address {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    text-align: center; /* L'adresse est maintenant centrée sur ses 3 lignes */
}

/* 2. Réduction de l'écart dans la troisième colonne */
.footer-links p {
    margin: 0; /* Supprime la marge par défaut du paragraphe "S'inscrire" */
    line-height: 1.6;
}

.footer-links a {
    color: white;
    transition: opacity 0.3s;
}
        
.footer-links a:hover {
    opacity: 0.8;
}

/* 3. Optionnel : Pour être sûr que tout est bien aligné verticalement au milieu */
.footer-grid {
    display: flex;
    justify-content: center;
    align-items: center; /* Aligne les blocs sur le même axe horizontal */
    gap: 60px; /* Augmenste un peu l'espace entre les colonnes pour aérer */
}
/* Ajustement pour les icônes sociales pour qu'elles soient centrées */
.social-icons {
    margin-top: 5px;
    display: flex;
    justify-content: center; /* Centre les icônes dans la 3ème colonne */
    gap: 20px;
}

/* Styles textes */

.rejoignez { 
    font-size: 16px; 
    font-family: 'Oswald'; 
    line-height: 1.8;
    text-transform: uppercase;
    font-weight: bold;
}

.mercredi { 
    font-family: 'Oswald';
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
}

.img-switch { width: 35px; height: 35px; position: relative; display: inline-block; }
.img-switch img { width: 100%; position: absolute; top: 0; left: 0; transition: 0.3s; }
.img-switch .img-hover {opacity: 0;}
.img-switch:hover .img-main {opacity: 0;}
.img-switch:hover .img-hover {opacity: 1;}

/* --- STYLE DU BURGER (Caché par défaut sur ordi) --- */
.menu-toggle, .mobile-menu-logo  {
    display: none;
}

/*  cacher temporairement les liens sans casser la navbar */
.nav-links a:not(#calendar-trigger),
.nav-links .dropdown {
    display: none !important;
}

.hamburger {
    display: none; /* Caché sur PC */
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
    z-index: 10000;
}

.hamburger span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    border-radius: 3px;
    transition: 0.3s;
}

    /* --- SECTION AUTRES PROPOSITIONS --- */
.propositions-diocese-section {
    padding: 40px 8% 80px 8%;
    text-align: center;
}

.propositions-diocese-section h2 {
    font-family: 'Oswald', sans-serif;
    color: #5b7486;
    font-size: 26px;
    margin-bottom: 10px;
}

/* --- BANDEAU RECTANGULAIRE DIOCÈSE --- */
        .diocese-banner-container {
            max-width: 800px;
            margin: 15px auto 0; /* Écart réduit de 40px à 15px avec le titre du dessus */
            margin-top: -30px;
            margin-bottom: 70px;
            padding: 0 10px;
            box-sizing: border-box;
        }

        .diocese-rect-banner {
            background: #f8f9fa;
            border: 2px dashed #5b7486;
            border-radius: 16px;
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .diocese-rect-banner:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            background-color: #fcfdfe;
        }

        .diocese-banner-content {
            flex: 2;
            text-align: justify;

        }

        .diocese-banner-content h3 {
            font-family: 'Oswald', sans-serif;
            color: #5b7486;
            margin: 10px 0;
            font-size: 22px;
        }

        .diocese-banner-content p {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
            color: #555;
        }

        .diocese-banner-action {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center; /* Centre le logo ET le bouton horizontalement sur l'axe de droite */
            text-align: center;
        }

        .badge-jp {
            display: inline-block;
            background-color: #e2e8f0;
            color: #4a5568;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 20px;
            letter-spacing: 0.5px;
        }

        .btn-diocese {
            display: inline-block;
            background-color: #5b7486;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 13px;
            white-space: nowrap;
            transition: background-color 0.2s ease;
        }

        .diocese-rect-banner:hover .btn-diocese {
            background-color: #4a5568;
        }

        /* --- STYLE LOGO DIOCÈSE --- */
        .diocese-logo-wrapper {
            margin-bottom: 15px; /* Crée l'espace au-dessus du bouton Explorer */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px; /* Limite la hauteur pour éviter que ça déforme le bandeau */
        }

        .diocese-logo-wrapper img {
            max-height: 100%;
            width: auto;
            object-fit: contain;
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
            .navbar { flex-direction: column; gap: 15px; }
            .intro-flex-container {
                display: flex;
                flex-direction: column-reverse; /* Le carrousel, qui est après le texte dans le HTML, passe en bas */
                align-items: center;
                gap: 30px;
            }
            .intro-text-side h2 {text-align: center;}
            .two-columns-info {flex-direction: column;gap: 20px;text-align: center;}
            .prop-grid { flex-direction: column; align-items: center; }
            .prop-grid-cards {flex-direction: column;align-items: center;}
            .hero {
                align-items: center; 
                padding-left: 5%; 
                padding-right: 5%;
                height: 60dvh;
                min-height: 400px;
                background-position: 65% 100% !important; 
                background-size: cover;
            }
            .hero p {text-align: center;}
            .hero h1 { font-size: 40px; letter-spacing: -1px; text-align: center; }
            .hero-content {text-align: center; padding-left: 0;}
            .hero-subtitle {font-size: 14px;}
            .calendar-overlap { margin: -50px 20px 40px; padding: 20px; }
            .calendar-grid { grid-template-columns: 1fr; }
            .prop-grid-cards {
                flex-direction: column !important;
                align-items: center;
                width: 100%;
                max-width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
            }

            /* 2. Forcer chaque carte à prendre toute la largeur disponible */
            .prop-card {
                width: 100% !important;
                max-width: 400px; /* Optionnel : empêche la carte d'être trop large sur très grand téléphone */
                flex-direction: column; /* Le texte passe sous l'image */
            }

            /* 3. Ajuster l'image pour qu'elle prenne toute la largeur du haut de la carte */
            .prop-icon-wrapper {
                width: 100% !important;
                height: 200px; /* Hauteur fixe pour que l'image soit bien visible */
            }
/* On annule la grille complexe sur mobile pour rester sur une simple colonne */
    .propositions-container.active-mode .prop-grid-cards {
        display: flex !important;
        flex-direction: column !important;
        grid-template-columns: none !important; /* Annule la grille 1.5fr / 1fr */
    }

    /* On s'assure que la carte sélectionnée reste propre */
    .prop-card.selected {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        grid-column: auto !important; /* Annule le placement en grille */
    }

    /* On force le contenu de la carte sélectionnée à s'afficher correctement */
    .prop-card.selected .prop-icon-wrapper {
        width: 100% !important;
        height: 200px !important; /* Hauteur cohérente sur mobile */
    }
            .prop-card-body h3 {margin-top: 25px;}
            .footer-grid { flex-direction: column; gap: 40px; }
            .navbar { flex-direction: column; gap: 15px; }
            .calendar-flex {flex-direction: column;}
            .dates-columns {grid-template-columns: 1fr; /* Une seule colonne sur mobile */}
            .calendar-image-container {width: 100%;}
            details.event-row:nth-of-type(even) .acc-content, .acc-content {
                flex-direction: column !important; /* Force la colonne sur mobile */
                gap: 30px;}

            .hamburger {
                display: flex;
                flex-direction: column;
                gap: 6px;
                cursor: pointer;
                z-index: 10001;
            }

            .nav-links {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background-color: #5b7486;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 25px;
                transform: translateY(-100%);
                transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
                z-index: 10000;
                padding: 0;
            }
            .dropdown-trigger {
            font-size: 20px;
            letter-spacing: 2px;}

            .menu-toggle:checked ~ .nav-links { transform: translateY(0); }
            .menu-toggle:checked ~ .hamburger span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
            .menu-toggle:checked ~ .hamburger span:nth-child(2) { opacity: 0; }
            .menu-toggle:checked ~ .hamburger span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
            .mobile-menu-logo { display: block; margin-bottom: 20px; }
            .mobile-menu-logo img { height: 90px; width: auto; }
            .nav-links a { font-size: 20px; letter-spacing: 2px; }
            .hamburger span { width: 30px; height: 3px; background-color: white; border-radius: 2px; transition: 0.3s ease; }
            .dropdown-menu { position: static; background: rgba(0,0,0,0.1); box-shadow: none; width: 100vw; text-align: center; }
       .modal-content {
        padding: 20px;
        width: 90%;
        max-height: 85vh; /* Légèrement plus grand sur mobile pour maximiser l'espace */
    }

            .modal-content h2 {
                font-size: 1.2rem;       /* Titre plus petit pour éviter les retours à la ligne inutiles */
                word-break: break-word;  /* Force la coupure des mots longs */
                margin-bottom: 10px;
            }

            .modal-content p {
                font-size: 0.85rem;      /* Texte plus léger */
            }

            .modal-buttons {
                gap: 5px;                /* Réduit l'espace entre les boutons */
            }

            .modal-buttons button {
                padding: 8px 5px;        /* Boutons plus compacts en hauteur */
                font-size: 0.8rem;       /* Texte du bouton plus petit */
            }

    /* Ajustement du bandeau diocèse sur mobile */
            .diocese-banner-container {
                margin-top: 10px; /* Réduction de l'espace aussi sur mobile */
            }
            .diocese-rect-banner {
                flex-direction: column;
                text-align: center;
                gap: 20px;
                padding: 25px 20px;
            }
            .diocese-banner-content {
                text-align: center;
            }
            .diocese-banner-action {
                width: 100%;
            }
            .diocese-logo-wrapper {
                margin-bottom: 15px;
                height: 50px;
            }
            .btn-diocese {
                display: block;
                width: 100%;
                box-sizing: border-box;
            }

            /* --- ADAPTATION DU BLOC "MESSE & ADORATION" (Nouveauté) --- */
    .new-feature-section {
        padding: 25px 15px !important; /* On réduit les marges internes pour gagner de la place */
        margin-bottom: 20px !important;
    }

    .two-columns {
        flex-direction: column !important; /* Passe les 2 colonnes l'une sous l'autre */
        gap: 25px !important;
    }

    .col-text {
        text-align: left !important; /* Le texte justifié crée de trop gros espaces sur mobile */
    }

    .col-text h3 {
        font-size: 22px !important; /* Taille de titre plus adaptée au smartphone */
    }

    .col-visual {
        width: 100%;
    }

    .col-visual img {
        max-width: 100% !important; /* Permet à l'image/flyer de s'adapter sans dépasser */
        height: auto !important;
    }


    /* --- ADAPTATION DU BLOC "ACTIVITÉS EN ATTENTE / PAUSE" --- */
    .standby-section {
        margin-top: 0 !important; /* FIX CRITIQUE: Annule le -150px qui faisait chevaucher le bloc sur mobile ! */
        padding: 25px 15px !important;
        margin-bottom: 40px !important;
    }

    .standby-header {
        margin-bottom: 25px !important;
    }

    .standby-header h3 {
        font-size: 20px !important;
    }

    /* Passer les cartes d'activités sur 1 seule colonne propre */
    .cards-grid {
        grid-template-columns: 1fr !important; 
        gap: 15px !important;
    }

    .standby-card {
        padding: 15px !important;
        flex-direction: row !important; /* Garde l'icône à côté ou la passe au-dessus selon le confort */
        align-items: flex-start;
    }

    .standby-icon {
        width: 45px !important;
        height: 45px !important;
    }

    .standby-icon img {
        width: 25px !important;
        height: 25px !important;
    }


    /* --- FIX DU RESPONSIVE GÉNÉRAL SUR PETIT ÉCRAN --- */
    .container {
        padding-left: 10px !important;
        padding-right: 10px !important;
    }

    .section-title {
        font-size: 24px !important;
    }
        }


const styleEl = document.createElement('style');
styleEl.innerHTML = css;
document.head.appendChild(styleEl);
`;

document.addEventListener("DOMContentLoaded", function () {
    // 1. Définition du HTML de la modale
    const modalHTML = `
    <div id="events-modal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Les rendez-vous de septembre</h2>
                <span class="close-modal">&times;</span>
            </div>
            <hr>
            <div class="event-item">
                <div class="event-left">
                    <span class="event-badge"><time datetime="2026-09-09">9 sept. 2026</time></span>
                    <h3>Messe de rentrée</h3>
                    <p>SICHEM - 21, bd Alexandre Martin - ORLEANS</p>
                    <p>Célébrée par notre aumônier <strong>Fr. Jean-Syméon</strong>, à qui vous pouvez <strong>confier vos intentions</strong> par message privé.<br>
                    Pensez à <strong>prévoir de la monnaie</strong>, si vous souhaitez contribuer à la <strong>quête</strong>.</p>
                </div>
            </div>
            <div class="event-item">
                <div class="event-left">
                    <span class="event-badge"><time datetime="2026-09-16">16 sept. 2026</time></span>
                    <h3>Dîner de rentrée</h3>
                    <p>SICHEM - 21, bd Alexandre Martin - ORLEANS</p>
                </div>
            </div>
            <div class="event-item">
                <div class="event-left">
                    <span class="event-badge"><time datetime="2026-09-23">23 sept. 2026</time></span>
                    <h3>Prière</h3>
                    <p>SICHEM - 21, bd Alexandre Martin - ORLEANS</p>
                    <p>Prions avec notre saint patron <strong>St Pier Giorgio Frassati</strong></p>
                </div>
            </div>
            <div class="event-item">
                <div class="event-left">
                    <span class="event-badge"><time datetime="2026-09-30">30 sept. 2026</time></span>
                    <h3>Enseignement</h3>
                    <p>SICHEM - 21, bd Alexandre Martin - ORLEANS</p>
                    <p><strong>Magnifica Humanitas :</strong> L'encyclique du pape Léon XIV expliquée par le Fr. Jean-Syméon.</p>
                </div>
            </div>

            <div class="event-item">
                <div class="event-left">
                    <span class="event-badge"><time datetime="2026-10-10">10 & 11 octobre 2026</time></span>
                    <h3>30 ans de JAVA</h3>
                    <p>Château de Charbonnière</p>
                </div>
                <button class="btn-more" data-flyer="https://drive.google.com/thumbnail?id=1kwl5gcMKFJgSsuJD_RMgsTfYGE-HkZT1&sz=w1000">
                    En savoir plus
                </button>
            </div>
        </div>

        <div id="flyer-viewer" class="flyer-viewer" style="display: none;">
            <span class="close-flyer">&times;</span>
            <img id="flyer-display" src="" alt="Flyer">
        </div>
    </div>
    `;

    // 2. Injection dans le DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 3. Gestion des événements
    const modal = document.getElementById("events-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const flyerViewer = document.getElementById("flyer-viewer");
    const flyerDisplay = document.getElementById("flyer-display");
    const closeFlyerBtn = document.querySelector(".close-flyer");

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    document.querySelectorAll(".btn-more").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const flyerUrl = this.getAttribute("data-flyer");
            if (flyerUrl) {
                flyerDisplay.src = flyerUrl;
                flyerViewer.style.display = "flex";
            }
        });
    });

    if (closeFlyerBtn) {
        closeFlyerBtn.addEventListener("click", function () {
            flyerViewer.style.display = "none";
            flyerDisplay.src = "";
        });
    }
});