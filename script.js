document.addEventListener("DOMContentLoaded", function () {

const champNom = document.getElementById("rechercheNom");
const champCodePostal = document.getElementById("rechercheCodePostal");
const boutonRecherche = document.getElementById("boutonRecherche");
const tableau = document.getElementById("resultatsArchitectes");

const resultatsParPage = 50;

let resultatsActuels = [];
let pageActuelle = 1;


function afficherPage() {

    tableau.innerHTML = "";

    const debut = (pageActuelle - 1) * resultatsParPage;
    const fin = debut + resultatsParPage;

    const resultatsPage = resultatsActuels.slice(debut, fin);


    if (resultatsPage.length === 0) {

        const ligne = document.createElement("tr");

        ligne.innerHTML =
            '<td colspan="5">Aucun architecte trouvé.</td>';

        tableau.appendChild(ligne);

        afficherInformations();

        afficherPagination();

        return;
    }


    resultatsPage.forEach(function (architecte) {

        const ligne = document.createElement("tr");

        let lien = "N/A";

        if (architecte.lien !== "") {

            lien =
                '<a href="' +
                architecte.lien +
                '" target="_blank">Voir</a>';

        }


        ligne.innerHTML =
            "<td>" + architecte.nom + "</td>" +
            "<td>" + architecte.codePostal + "</td>" +
            "<td>" + architecte.type + "</td>" +
            "<td>" + architecte.personnes + "</td>" +
            "<td>" + lien + "</td>";


        tableau.appendChild(ligne);

    });


    afficherInformations();

    afficherPagination();

}


function afficherInformations() {

    let ancienneInformation =
        document.getElementById("informationsResultats");

    if (ancienneInformation !== null) {
        ancienneInformation.remove();
    }


    const information =
        document.createElement("div");

    information.id = "informationsResultats";

    information.style.marginTop = "15px";
    information.style.marginBottom = "10px";
    information.style.fontWeight = "bold";


    if (resultatsActuels.length === 0) {

        information.textContent =
            "Aucun architecte trouvé.";

    } else {

        const totalPages =
            Math.ceil(
                resultatsActuels.length /
                resultatsParPage
            );

        information.textContent =
            resultatsActuels.length +
            " architecte(s) trouvé(s) — Page " +
            pageActuelle +
            " / " +
            totalPages;

    }


    tableau.parentElement.insertBefore(
        information,
        tableau
    );

}


function afficherPagination() {

    let anciennePagination =
        document.getElementById("pagination");

    if (anciennePagination !== null) {
        anciennePagination.remove();
    }


    const totalPages =
        Math.ceil(
            resultatsActuels.length /
            resultatsParPage
        );


    if (totalPages <= 1) {
        return;
    }


    const pagination =
        document.createElement("div");

    pagination.id = "pagination";

    pagination.style.marginTop = "20px";
    pagination.style.textAlign = "center";


    const boutonPrecedent =
        document.createElement("button");

    boutonPrecedent.textContent =
        "← Précédent";

    boutonPrecedent.disabled =
        pageActuelle === 1;


    boutonPrecedent.onclick = function () {

        if (pageActuelle > 1) {

            pageActuelle--;

            afficherPage();

        }

    };


    const boutonSuivant =
        document.createElement("button");

    boutonSuivant.textContent =
        "Suivant →";

    boutonSuivant.disabled =
        pageActuelle === totalPages;


    boutonSuivant.onclick = function () {

        if (pageActuelle < totalPages) {

            pageActuelle++;

            afficherPage();

        }

    };


    pagination.appendChild(
        boutonPrecedent
    );


    const espace =
        document.createTextNode("   ");

    pagination.appendChild(espace);


    pagination.appendChild(
        boutonSuivant
    );


    tableau.parentElement.appendChild(
        pagination
    );

}


function rechercher() {

    const nom =
        champNom.value.toLowerCase().trim();

    const codePostal =
        champCodePostal.value.trim();


    resultatsActuels =
        architectes.filter(function (architecte) {

            const nomArchitecte =
                architecte.nom.toLowerCase();

            const codePostalArchitecte =
                architecte.codePostal.toString();


            return (

                (nom === "" ||
                    nomArchitecte.includes(nom))

                &&

                (codePostal === "" ||
                    codePostalArchitecte.includes(codePostal))

            );

        });


    pageActuelle = 1;

    afficherPage();

}


boutonRecherche.addEventListener(
    "click",
    rechercher
);


champNom.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            rechercher();
        }

    }
);


champCodePostal.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            rechercher();
        }

    }
);


// Aucun résultat affiché au démarrage
resultatsActuels = [];

afficherPage();

});