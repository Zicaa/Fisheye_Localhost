// Fonction asynchrone qui récupère mes données avec fetch()
export async function fetchJson() {
    try {
        // Je récupère mes données du fichier json
        const json = "data/photographers.json"
        // J'attend la promesse de ma requête
        const response = await fetch(json);
        // Je stocke ma réponse dans une constante
        const data = await response.json();
        console.log(data);
        // Je retourne les données
        return data;

    } catch (error) {
        // En cas d'erreur, j'affiche une erreur dans la console
        console.error(error);
    }
    
}