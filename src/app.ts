/*----------------------------------------------------- INTRODUCTION FICHIER TSCONFIG.JSON -----------------------------------------------------*/
/* 
    Le ficher "tsconfig.json" :

    Le "outDir" renvoie le code js dans un fichier dist
    Le "target" est en ES6 pour avoir un code JS récent (Tous les navigateurs modernes prennent en charge ES6)
    Le "noEmitOnError" est réglé à "true" pour ne pas convertire le code en JS s'il y a une erreur
    Le "strict" est à "true" pour devoir être obligé de tout Typé
*/

/*----------------------------------------------------- LES BASES DE TYPESCRIPT -----------------------------------------------------*/

const a: string     = "Hello World"; // Typage d'une chaine de caractère
const n: number     = 3; // Typage d'un nombre
const b: boolean    = true; // Typage d'un boolean
const d: null       = null; // Typage d'un null
const c: any        = ""; // any peut-être n'importe quel élément

const arr: string[] = ['Patrick', 'Robert']; // Typage d'un tableau | Possibilité d'aller beaucoup plus loin
const user: {firstname: string, [key:string]:string} = {firstname:"Patrick", lastname:"Robert"}; // Typage d'un user
const date: Date = new Date(); // Typage d'un objet Date
const cb: (e: MouseEvent) => void = (e: MouseEvent):number => {  // Typage d'une fonciton flécher avec comme paramètre un MouseEnvent, la fonction doit renvoyer un nombre
    return 3;
}


/* Buttun incrémentation et reset */
const compteur = document.querySelector("#compteur");
const buttunReset = document.querySelector("#reset");
const span = compteur?.querySelector('span'); 
let i:number = 0;

/*----------------------------------------------------- TYPE NARROWING -----------------------------------------------------*/

/* Permet a typescript d'éliminer des cas et de reduire les types possible pour les variables */
const increment = () => {
    i++;
    // span est par défault de type HTMLSpanElement ou null ou indefined
    if (span) { // Nous vérifions si la span existe si la condition renvoie vrai => elle ne peut être que de HTMLSpanElement. Car elle ne peut pas être null ou indefined
        span.innerText = i.toString();
    }
}

function printId(id: number | string){ // Typage d'une fonction qui doit renvoyer un nombre OU une chaine de caractère
    if (typeof id == "number") { // Si l'id est de type number nous allons pouvoir utiliser des methodes pour les nombres 
        console.log((id * 3).toString()); // Il est donc possible de multiplier l'id par 3 sans avoir d'erreurs
    } else { // Sinon si l'id n'est pas un nombre c'est forcement une chaine de caractère car nous avons défini cela a notre première ligne de notre fonction
        console.log(id.toUpperCase()); // Nous pouvons donc utiliser des méthodes pour les chaines de caractères sans avoir d'erreurs
    }
}

function exemple (a:Date | boolean, b:Date | number){ // Notre fonction exemple a comme paramètre "a" qui peut être une Date ou un boolean et "b" qui peut être une Date ou un nombre
    if (a == b) { // Si a et b sont égale alors a et b sont forcement des objets "Date"
        a // mettre la souris sur a pour vérifier qu'il sagit bien d'un objet "Date"
    }
}

const reset = () => {
    i = 0;
    if (span) {
        span.innerText = i.toString();
    }
}

buttunReset?.addEventListener('click', reset);
compteur?.addEventListener('click', increment);


/*----------------------------------------------------- ALIAS ou (type)  -----------------------------------------------------*/

/* Pour éviter de ce repeter par exemple pour un User qui a une clé firstname et lastname nous pouvons créer un Alias */

type User = {firstname: string, lastname: string} // On créer un type User qui permet d'être réutilisable
const userWithAlias: User = {firstname: "Robert", lastname: "Patrick"} // Nous réutilison le type User pour vérifier que notre firstname et lastname soit bien des string
const userWithoutAlias: {firstname: string, lastname: string} = {firstname: "Robert", lastname: "Patrick"} // Sans notre Alias le code deviens plus compliquer et long a lire

/*----------------------------------------------------- GENERICS -----------------------------------------------------*/

function identity(arg:any): any { // Nous avons défini que la fonction doit renvoyer "any" ce que n'est pas pratique dans certains cas
    return arg;
}

const aa = identity(3); // Ici la fonction renvoie any alors que nous lui passons comme paramètre un nombre

/* Pour résoudre cela nous allons utiliser les Generics */

function identityWithGenerics<ArgType>(arg:ArgType): ArgType { // Nous allons créent des paramètres à nos fonctions pour pouvoir les remplacer pendant l'appel de cette dernière
    return arg;
}

const aWithGenerics = identityWithGenerics<number>(3); // Nous appelons la fonction identityWithGenerics et on lui précise que nous lui envoyons un nombre comme paramètres grace au <number>
// Si nous lui envoyons autre chose qu'un nombre en paramètre typescript nous renvoie une erreur

/* Autre exemple avec une fonction */

function first<Type>(arg: Type[]): Type{ // Création du paramètre <Type> pour la fonction first 
    return arg[0];
}

const aaa = first(["Robert", "Patrick", "Bernard"]); // Typescript comprends que dans le tableau il n'y a que des chaine de caractères et donc change le <Type> de la fonction en "string"
const aaaa = first<string>(["Robert", "Patrick", "Bernard"]); // Il est possible de forcer Typescript à utiliser ce que l'on souhaite. Ici j'oblige Typescript à utiliser uniquement des chaines de caractères

/*----------------------------------------------------- LES CLASSES -----------------------------------------------------*/

class LesClassesAvecTS { // Classes "lesClassesAvecTS" qui à trois propriétés a, b et c
    private a   = 1; // La propriété "a" est privée et est uniquement accessible dans la classe 
    protected b = 2; // La propriété "b" est protégée et est uniquement accessible par la classe ou les enfants de la classe
    public c    = 3; // La propriété "c" est public ce qui est le comportement par défaut d'une propriété il n'est donc pas forcément nécessaire  le le préciser 

    log () {
        console.log(this.a); // Nous pouvons utiliser "a" qui est privé si nous créons une methode et appellons cette dernière
    }
}

const aInstance = new LesClassesAvecTS();
aInstance.log();

/* Création d'un classe enfant qui hérite de notre classe avec nos fonction privé, protégé et public */
class Enfant extends LesClassesAvecTS { 
    log() {
        console.log(this.b) // Nous pouvons appeler la fonction public et protégé mais pas la fonciton privé
    }
}

/* Utilisation du constructor avec Typescript */
class ExempleConstructor<Type> { // Il est possible d'utiliser les générics sur les class 
    constructor(public prenom: Type, public nom: Type, private email: Type,){ // Il est aussi possible d'utiliser public, protégé et privé dans un construtor et de typer nos propriétés 
        this.prenom = prenom; // Nos propriétés sont du type que nous avons défini dans le constructor, comme nous avons utilisé des générics nous devons les définir pendant la création de notre objet
        this.nom = nom;
        this.email = email;
    }

    prenomClient(): Type | null { // prenomClient peut renvoyer le Type du prenom ou null si le client n'a pas renseigner sont prenom
        return this.prenom || null
    }

    infoClient(): string {
        return "Vous êtes " + this.prenom + " " + this.nom + " Et votre Email est :  " + this.email
    }
}

const client1 = new ExempleConstructor<string>("Robert", "Patrick", "Robert.Patrick@gmail.com") // Nous définitions notre objet de Type chaine de caractères 
const client2 = new ExempleConstructor<number>(123456, 123456, 123456) // Nous définitions notre objet de Type nombre (ce qui n'a pas de logique mais c'est un exemple)
client1.infoClient() // infoClient renvoie forcement une chaine de caractère
client1.prenomClient() // prenomClient peut renvoyer une chaine de caractère ou null


/*----------------------------------------------------- INTERFACES -----------------------------------------------------*/

/* Les interfaces fonctionnent presque comme les types la grosse différence c'est quel reste ouvert il est possible de rajouter quelques-choses dans une interface déjà créer */

interface Exemple { // Création d'une interface Exemple avec qui a une propriété "x" qui est un nombre
    x: number
}

interface Exemple { // On rajoute dans cette interface Exemple une propriété "y" qui est aussi un nombre 
    y: number
}

// Il n'est pas possible de rajouter quelques-choses à l'intérieur d'un type une fois qu'il est créé. Avec une interface c'est possible

/* Maintenant c'est exactement comme si notre interface resemblais a ça : 
interface Exemple { 
    x: number,
    y: number,
}
*/

// Il y a énormément d'interface déjà implémenter dans typescript il est donc possible d'ajouter des propriétés à l'intérieur 


