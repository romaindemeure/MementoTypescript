"use strict";
/*----------------------------------------------------- INTRODUCTION FICHIER TSCONFIG.JSON -----------------------------------------------------*/
/*
    Le ficher "tsconfig.json" :

    Le "outDir" renvoie le code js dans un fichier dist
    Le "target" est en ES6 pour avoir un code JS récent (Tous les navigateurs modernes prennent en charge ES6)
    Le "noEmitOnError" est réglé à "true" pour ne pas convertire le code en JS s'il y a une erreur
    Le "strict" est à "true" pour devoir être obligé de tout Typé
*/
/*----------------------------------------------------- LES BASES DE TYPESCRIPT -----------------------------------------------------*/
const a = "Hello World"; // Typage d'une chaine de caractère
const n = 3; // Typage d'un nombre
const b = true; // Typage d'un boolean
const d = null; // Typage d'un null
const c = ""; // any peut-être n'importe quel élément
const arr = ['Patrick', 'Robert']; // Typage d'un tableau | Possibilité d'aller beaucoup plus loin
const user = { firstname: "Patrick", lastname: "Robert" }; // Typage d'un user
const date = new Date(); // Typage d'un objet Date
const cb = (e) => {
    return 3;
};
/* Buttun incrémentation et reset */
const compteur = document.querySelector("#compteur");
const buttunReset = document.querySelector("#reset");
const span = compteur === null || compteur === void 0 ? void 0 : compteur.querySelector('span');
let i = 0;
/*----------------------------------------------------- TYPE NARROWING -----------------------------------------------------*/
/* Permet a typescript d'éliminer des cas et de reduire les types possible pour les variables */
const increment = () => {
    i++;
    // span est par défault de type HTMLSpanElement ou null ou indefined
    if (span) { // Nous vérifions si la span existe si la condition renvoie vrai => elle ne peut être que de HTMLSpanElement. Car elle ne peut pas être null ou indefined
        span.innerText = i.toString();
    }
};
function printId(id) {
    if (typeof id == "number") { // Si l'id est de type number nous allons pouvoir utiliser des methodes pour les nombres 
        console.log((id * 3).toString()); // Il est donc possible de multiplier l'id par 3 sans avoir d'erreurs
    }
    else { // Sinon si l'id n'est pas un nombre c'est forcement une chaine de caractère car nous avons défini cela a notre première ligne de notre fonction
        console.log(id.toUpperCase()); // Nous pouvons donc utiliser des méthodes pour les chaines de caractères sans avoir d'erreurs
    }
}
function exemple(a, b) {
    if (a == b) { // Si a et b sont égale alors a et b sont forcement des objets "Date"
        a; // mettre la souris sur a pour vérifier qu'il sagit bien d'un objet "Date"
    }
}
const reset = () => {
    i = 0;
    if (span) {
        span.innerText = i.toString();
    }
};
buttunReset === null || buttunReset === void 0 ? void 0 : buttunReset.addEventListener('click', reset);
compteur === null || compteur === void 0 ? void 0 : compteur.addEventListener('click', increment);
const userWithAlias = { firstname: "Robert", lastname: "Patrick" }; // Nous réutilison le type User pour vérifier que notre firstname et lastname soit bien des string
const userWithoutAlias = { firstname: "Robert", lastname: "Patrick" }; // Sans notre Alias le code deviens plus compliquer et long a lire
/*----------------------------------------------------- GENERICS -----------------------------------------------------*/
function identity(arg) {
    return arg;
}
const aa = identity(3); // Ici la fonction renvoie any alors que nous lui passons comme paramètre un nombre
/* Pour résoudre cela nous allons utiliser les Generics */
function identityWithGenerics(arg) {
    return arg;
}
const aWithGenerics = identityWithGenerics(3); // Nous appelons la fonction identityWithGenerics et on lui précise que nous lui envoyons un nombre comme paramètres grace au <number>
// Si nous lui envoyons autre chose qu'un nombre en paramètre typescript nous renvoie une erreur
/* Autre exemple avec une fonction */
function first(arg) {
    return arg[0];
}
const aaa = first(["Robert", "Patrick", "Bernard"]); // Typescript comprends que dans le tableau il n'y a que des chaine de caractères et donc change le <Type> de la fonction en "string"
const aaaa = first(["Robert", "Patrick", "Bernard"]); // Il est possible de forcer Typescript à utiliser ce que l'on souhaite. Ici j'oblige Typescript à utiliser uniquement des chaines de caractères
/*----------------------------------------------------- LES CLASSES -----------------------------------------------------*/
class LesClassesAvecTS {
    constructor() {
        this.a = 1; // La propriété "a" est privée et est uniquement accessible dans la classe 
        this.b = 2; // La propriété "b" est protégée et est uniquement accessible par la classe ou les enfants de la classe
        this.c = 3; // La propriété "c" est public ce qui est le comportement par défaut d'une propriété il n'est donc pas forcément nécessaire  le le préciser 
    }
    log() {
        console.log(this.a); // Nous pouvons utiliser "a" qui est privé si nous créons une methode et appellons cette dernière
    }
}
const aInstance = new LesClassesAvecTS();
aInstance.log();
/* Création d'un classe enfant qui hérite de notre classe avec nos fonction privé, protégé et public */
class Enfant extends LesClassesAvecTS {
    log() {
        console.log(this.b); // Nous pouvons appeler la fonction public et protégé mais pas la fonciton privé
    }
}
/* Utilisation du constructor avec Typescript */
class ExempleConstructor {
    constructor(prenom, nom, email) {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.prenom = prenom; // Nos propriétés sont du type que nous avons défini dans le constructor, comme nous avons utilisé des générics nous devons les définir pendant la création de notre objet
        this.nom = nom;
        this.email = email;
    }
    prenomClient() {
        return this.prenom || null;
    }
    infoClient() {
        return "Vous êtes " + this.prenom + " " + this.nom + " Et votre Email est :  " + this.email;
    }
}
const client1 = new ExempleConstructor("Robert", "Patrick", "Robert.Patrick@gmail.com"); // Nous définitions notre objet de Type chaine de caractères 
const client2 = new ExempleConstructor(123456, 123456, 123456); // Nous définitions notre objet de Type nombre (ce qui n'a pas de logique mais c'est un exemple)
client1.infoClient(); // infoClient renvoie forcement une chaine de caractère
client1.prenomClient(); // prenomClient peut renvoyer une chaine de caractère ou null
// Il n'est pas possible de rajouter quelques-choses à l'intérieur d'un type une fois qu'il est créé. Avec une interface c'est possible
/* Maintenant c'est exactement comme si notre interface resemblais a ça :
interface Exemple {
    x: number,
    y: number,
}
*/
// Il y a énormément d'interface déjà implémenter dans typescript il est donc possible d'ajouter des propriétés à l'intérieur 
